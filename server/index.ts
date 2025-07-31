import express, { type Request, Response, NextFunction } from "express";
import path from "path";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { fileURLToPath } from 'url';
import fs from 'fs';

// ES module compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Note: Icons are handled by specific route below to override Vite middleware

app.use('/images', express.static(path.join(process.cwd(), 'public/images')));
app.use('/audio', express.static(path.join(process.cwd(), 'public/audio')));

// High priority route for icons to override Vite middleware
app.get('/icons/:filename', (req, res, next) => {
  const filename = req.params.filename;
  if (filename.endsWith('.png')) {
    const iconPath = path.join(process.cwd(), 'public/icons', filename);
    if (fs.existsSync(iconPath)) {
      res.setHeader('Content-Type', 'image/png');
      res.setHeader('Cache-Control', 'public, max-age=31536000');
      return res.sendFile(iconPath);
    }
  }
  next();
});

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  const isProduction = process.env.NODE_ENV === "production";
  if (!isProduction) {
    await setupVite(app, server);
  } else {
    serveStatic(app);
    
    // Serve PWA files in production
    app.get('/manifest.json', (req, res) => {
      res.sendFile(path.join(__dirname, '../manifest.json'));
    });
    
    app.get('/sw.js', (req, res) => {
      res.setHeader('Content-Type', 'application/javascript');
      res.sendFile(path.join(__dirname, '../sw.js'));
    });
    
    // Serve icons in production with proper Content-Type
    app.use('/icons', express.static(path.join(__dirname, '../public/icons'), {
      setHeaders: (res) => {
        res.setHeader('Content-Type', 'image/png');
        res.setHeader('Cache-Control', 'public, max-age=31536000');
      }
    }));
  }

  // ALWAYS serve the app on port 5000
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = 5000;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
  });
})();
