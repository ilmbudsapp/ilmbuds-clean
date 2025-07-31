import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { 
  insertUserSchema, 
  insertUserProgressSchema, 
  insertParentChildSchema,
  insertUserSurahProgressSchema,
  UserRole,
  MemorizationLevel
} from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import { sendEmail } from "./utils/email";
import fs from "fs";
import path from "path";

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);

  // Serve manifest.json from root directory for PWABuilder
  app.get("/manifest.json", (req, res) => {
    try {
      const manifestPath = path.join(process.cwd(), "manifest.json");
      if (fs.existsSync(manifestPath)) {
        res.setHeader("Content-Type", "application/json");
        res.sendFile(manifestPath);
      } else {
        // Fallback to public directory
        const publicManifestPath = path.join(process.cwd(), "public", "manifest.json");
        if (fs.existsSync(publicManifestPath)) {
          res.setHeader("Content-Type", "application/json");
          res.sendFile(publicManifestPath);
        } else {
          res.status(404).json({ error: "Manifest not found" });
        }
      }
    } catch (error) {
      console.error("Error serving manifest:", error);
      res.status(500).json({ error: "Failed to serve manifest" });
    }
  });

  // Serve root level icons for PWABuilder
  app.get("/icon-:size(192|512).png", (req, res) => {
    try {
      const size = req.params.size;
      const iconPath = path.join(process.cwd(), `icon-${size}.png`);
      
      if (fs.existsSync(iconPath)) {
        res.setHeader("Content-Type", "image/png");
        res.sendFile(iconPath);
      } else {
        // Fallback to public/icons directory
        const publicIconPath = path.join(process.cwd(), "public", "icons", `icon-${size}x${size}.png`);
        if (fs.existsSync(publicIconPath)) {
          res.setHeader("Content-Type", "image/png");
          res.sendFile(publicIconPath);
        } else {
          res.status(404).json({ error: `Icon ${size}x${size} not found` });
        }
      }
    } catch (error) {
      console.error("Error serving icon:", error);
      res.status(500).json({ error: "Failed to serve icon" });
    }
  });

  // Serve service worker for PWA functionality
  app.get("/service-worker.js", (req, res) => {
    try {
      const swPath = path.join(process.cwd(), "public", "service-worker.js");
      if (fs.existsSync(swPath)) {
        res.setHeader("Content-Type", "application/javascript");
        res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
        res.setHeader("Service-Worker-Allowed", "/");
        res.sendFile(swPath);
      } else {
        res.status(404).json({ error: "Service worker not found" });
      }
    } catch (error) {
      console.error("Error serving service worker:", error);
      res.status(500).json({ error: "Failed to serve service worker" });
    }
  });

  // Serve sw.js (alternative service worker path)
  app.get("/sw.js", (req, res) => {
    try {
      const swPath = path.join(process.cwd(), "public", "sw.js");
      if (fs.existsSync(swPath)) {
        res.setHeader("Content-Type", "application/javascript");
        res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
        res.setHeader("Service-Worker-Allowed", "/");
        res.sendFile(swPath);
      } else {
        res.status(404).json({ error: "Service worker not found" });
      }
    } catch (error) {
      console.error("Error serving service worker:", error);
      res.status(500).json({ error: "Failed to serve service worker" });
    }
  });

  // Icons are now handled by direct route in index.ts to override Vite middleware

  // Get all categories
  app.get("/api/categories", async (req, res) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  });

  // Get category by ID
  app.get("/api/categories/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid category ID" });
      }

      const category = await storage.getCategoryById(id);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }

      res.json(category);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch category" });
    }
  });

  // Get quizzes by category ID
  app.get("/api/categories/:id/quizzes", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid category ID" });
      }

      const quizzes = await storage.getQuizzesByCategoryId(id);
      res.json(quizzes);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch quizzes" });
    }
  });

  // Get quiz by ID
  app.get("/api/quizzes/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid quiz ID" });
      }

      const quiz = await storage.getQuizById(id);
      if (!quiz) {
        return res.status(404).json({ message: "Quiz not found" });
      }

      res.json(quiz);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch quiz" });
    }
  });

  // Get questions by quiz ID
  app.get("/api/quizzes/:id/questions", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid quiz ID" });
      }

      const questions = await storage.getQuestionsByQuizId(id);
      res.json(questions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch questions" });
    }
  });

  // Register user
  app.post("/api/users/register", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      // Check if username already exists
      const existingUser = await storage.getUserByUsername(userData.username);
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }
      
      const newUser = await storage.createUser(userData);
      
      // Don't return the password in the response
      const { password, ...userWithoutPassword } = newUser;
      
      res.status(201).json(userWithoutPassword);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      
      res.status(500).json({ message: "Failed to register user" });
    }
  });

  // Login user (simple login for demo purposes)
  app.post("/api/users/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
      }
      
      const user = await storage.getUserByUsername(username);
      
      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid username or password" });
      }
      
      // Don't return the password in the response
      const { password: _, ...userWithoutPassword } = user;
      
      res.json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ message: "Failed to login" });
    }
  });

  // Get user progress
  app.get("/api/users/:id/progress", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }

      const user = await storage.getUser(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const progress = await storage.getUserProgress(id);
      res.json(progress);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user progress" });
    }
  });

  // Submit quiz results
  app.post("/api/users/:id/progress", async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }

      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const progressData = insertUserProgressSchema.parse({
        ...req.body,
        userId,
        lastCompleted: new Date().toISOString()
      });

      // Check if progress already exists
      const existingProgress = await storage.getUserProgressByQuizId(userId, progressData.quizId);

      let userProgress;
      if (existingProgress) {
        // Update existing progress
        userProgress = await storage.updateUserProgress(existingProgress.id, progressData);
      } else {
        // Create new progress
        userProgress = await storage.createUserProgress(progressData);
      }

      // Award points to the user
      if (progressData.completed && progressData.score !== undefined) {
        const pointsEarned = progressData.score;
        await storage.updateUserPoints(userId, pointsEarned);
        
        // Award badges based on performance
        if (progressData.score >= 80) {
          const quiz = await storage.getQuizById(progressData.quizId);
          if (quiz) {
            const category = await storage.getCategoryById(quiz.categoryId);
            if (category) {
              const badgeName = `${category.name} Master`;
              await storage.addUserBadge(userId, badgeName);
            }
          }
        }
      }

      res.status(201).json(userProgress);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      
      res.status(500).json({ message: "Failed to submit quiz results" });
    }
  });

  // Get user
  app.get("/api/users/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }

      const user = await storage.getUser(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Don't return the password in the response
      const { password, ...userWithoutPassword } = user;
      
      res.json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Update user profile
  app.patch("/api/users/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }

      const user = await storage.getUser(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Allow updating only specific fields
      const allowedFields = ['displayName', 'email', 'profileImageUrl'];
      const updateData: Partial<typeof user> = {};
      
      for (const field of allowedFields) {
        if (field in req.body) {
          updateData[field as keyof typeof updateData] = req.body[field];
        }
      }
      
      const updatedUser = await storage.updateUserProfile(id, updateData);
      if (!updatedUser) {
        return res.status(500).json({ message: "Failed to update user profile" });
      }
      
      // Don't return the password in the response
      const { password, ...userWithoutPassword } = updatedUser;
      
      res.json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ message: "Failed to update user profile" });
    }
  });

  // Parent Dashboard Routes
  
  // Get all children for a parent
  app.get("/api/parents/:id/children", async (req, res) => {
    try {
      const parentId = parseInt(req.params.id);
      if (isNaN(parentId)) {
        return res.status(400).json({ message: "Invalid parent ID" });
      }

      const parent = await storage.getUser(parentId);
      if (!parent || parent.role !== UserRole.Parent) {
        return res.status(404).json({ message: "Parent not found" });
      }

      const children = await storage.getChildrenByParentId(parentId);
      
      // Remove password from children data
      const childrenWithoutPasswords = children.map(child => {
        const { password, ...childWithoutPassword } = child;
        return childWithoutPassword;
      });
      
      res.json(childrenWithoutPasswords);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch children" });
    }
  });

  // Get children progress summary
  app.get("/api/parents/:id/children/progress", async (req, res) => {
    try {
      const parentId = parseInt(req.params.id);
      if (isNaN(parentId)) {
        return res.status(400).json({ message: "Invalid parent ID" });
      }

      const parent = await storage.getUser(parentId);
      if (!parent || parent.role !== UserRole.Parent) {
        return res.status(404).json({ message: "Parent not found" });
      }

      const children = await storage.getChildrenByParentId(parentId);
      const childrenIds = children.map(child => child.id);
      
      const progressSummary = await storage.getChildrenProgressSummary(childrenIds);
      res.json(progressSummary);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch children progress" });
    }
  });

  // Link a child to a parent
  app.post("/api/parents/:parentId/children/:childId", async (req, res) => {
    try {
      const parentId = parseInt(req.params.parentId);
      const childId = parseInt(req.params.childId);
      
      if (isNaN(parentId) || isNaN(childId)) {
        return res.status(400).json({ message: "Invalid parent or child ID" });
      }

      // Validate that parent and child exist and have correct roles
      const parent = await storage.getUser(parentId);
      const child = await storage.getUser(childId);
      
      if (!parent || parent.role !== UserRole.Parent) {
        return res.status(404).json({ message: "Parent not found" });
      }
      
      if (!child || child.role !== UserRole.Child) {
        return res.status(404).json({ message: "Child not found" });
      }
      
      const relationship = await storage.linkParentToChild(parentId, childId);
      res.status(201).json(relationship);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Failed to link child to parent" });
      }
    }
  });

  // Unlink a child from a parent
  app.delete("/api/parents/:parentId/children/:childId", async (req, res) => {
    try {
      const parentId = parseInt(req.params.parentId);
      const childId = parseInt(req.params.childId);
      
      if (isNaN(parentId) || isNaN(childId)) {
        return res.status(400).json({ message: "Invalid parent or child ID" });
      }

      const success = await storage.unlinkParentFromChild(parentId, childId);
      
      if (!success) {
        return res.status(404).json({ message: "Relationship not found" });
      }
      
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: "Failed to unlink child from parent" });
    }
  });
  
  // Contact form route
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, subject, message, recipientEmail } = req.body;
      
      if (!name || !email || !subject || !message || !recipientEmail) {
        return res.status(400).json({ 
          message: "Missing required fields. Please provide name, email, subject, message, and recipientEmail." 
        });
      }
      
      // Create HTML content for the email
      const htmlContent = `
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> ${name} (${email})</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <h3>Message:</h3>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><small>This message was sent from the ILMBUDS app contact form.</small></p>
      `;
      
      // Send email using SendGrid
      const emailSent = await sendEmail({
        to: recipientEmail,
        from: 'agron6922@gmail.com', // Koristimo verifikovani e-mail adresu korisnika
        subject: `ILMBUDS Contact: ${subject}`,
        text: `New message from ${name} (${email}): ${message}`,
        html: htmlContent
      });
      
      if (!emailSent) {
        console.warn(`Email delivery failed, but we'll still acknowledge receipt to user.`);
        // Umjesto da bacimo grešku, vratit ćemo uspješni odgovor
        // ali s dodatnom zastavicom koja označava problem sa slanjem
        
        console.log(`Contact form submission RECEIVED from ${name} (${email}), but email delivery failed`);
        res.status(200).json({ 
          success: true,
          emailDelivered: false,
          message: "Your message has been received, but there was an issue with our email system. We'll still process your request.",
          formData: { name, email, subject, message } // Vraćamo podatke iz formulara za potrebe dijagnostike
        });
        return; // Prekidamo izvršavanje funkcije ovdje
      }
      
      console.log(`Contact form submission sent to ${recipientEmail} from ${name} (${email})`);
      
      res.status(200).json({ 
        success: true,
        emailDelivered: true, 
        message: "Your message has been sent successfully!"
      });
    } catch (error) {
      console.error("Error sending contact form:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to send your message. Please try again later."
      });
    }
  });
  
  // Quran Routes
  
  // Get all Quran surahs
  app.get("/api/quran/surahs", async (req, res) => {
    try {
      const surahs = await storage.getQuranSurahs();
      res.json(surahs);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch Quran surahs" });
    }
  });
  
  // Get Quran surah by ID
  app.get("/api/quran/surahs/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid surah ID" });
      }
      
      const surah = await storage.getQuranSurahById(id);
      if (!surah) {
        return res.status(404).json({ message: "Surah not found" });
      }
      
      res.json(surah);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch surah" });
    }
  });
  
  // Get verses by surah ID
  app.get("/api/quran/surahs/:id/verses", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid surah ID" });
      }
      
      const verses = await storage.getQuranVersesBySurahId(id);
      res.json(verses);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch verses" });
    }
  });
  
  // Get translations for a verse
  app.get("/api/quran/verses/:id/translations", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid verse ID" });
      }
      
      const language = req.query.language as string | undefined;
      
      const translations = await storage.getQuranTranslationsByVerseId(id, language);
      res.json(translations);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch translations" });
    }
  });
  
  // Get user surah progress
  app.get("/api/users/:userId/quran/progress", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      
      const progress = await storage.getUserSurahProgress(userId);
      res.json(progress);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user surah progress" });
    }
  });
  
  // Get specific user surah progress
  app.get("/api/users/:userId/quran/surahs/:surahId/progress", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const surahId = parseInt(req.params.surahId);
      
      if (isNaN(userId) || isNaN(surahId)) {
        return res.status(400).json({ message: "Invalid user ID or surah ID" });
      }
      
      const progress = await storage.getUserSurahProgressBySurahId(userId, surahId);
      if (!progress) {
        return res.status(404).json({ message: "Progress not found" });
      }
      
      res.json(progress);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user surah progress" });
    }
  });
  
  // Create or update user surah progress
  app.post("/api/users/:userId/quran/surahs/:surahId/progress", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const surahId = parseInt(req.params.surahId);
      
      if (isNaN(userId) || isNaN(surahId)) {
        return res.status(400).json({ message: "Invalid user ID or surah ID" });
      }
      
      // Check if user and surah exist
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      const surah = await storage.getQuranSurahById(surahId);
      if (!surah) {
        return res.status(404).json({ message: "Surah not found" });
      }
      
      // Check if progress already exists
      const existingProgress = await storage.getUserSurahProgressBySurahId(userId, surahId);
      
      if (existingProgress) {
        // Update existing progress
        const updatedProgress = await storage.updateUserSurahProgress(existingProgress.id, {
          ...req.body,
          lastPracticed: new Date().toISOString()
        });
        
        res.json(updatedProgress);
      } else {
        // Create new progress
        const newProgress = await storage.createUserSurahProgress({
          userId,
          surahId,
          completedVerses: req.body.completedVerses || 0,
          memorizationLevel: req.body.memorizationLevel || 0,
          lastPracticed: new Date().toISOString()
        });
        
        res.status(201).json(newProgress);
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to update user surah progress" });
    }
  });
  
  // Update verse memorization level
  app.post("/api/users/:userId/quran/verses/:verseId/memorization", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const verseId = parseInt(req.params.verseId);
      
      if (isNaN(userId) || isNaN(verseId)) {
        return res.status(400).json({ message: "Invalid user ID or verse ID" });
      }
      
      // Validate the memorization level
      const { level } = req.body;
      if (level === undefined || 
          !Object.values(MemorizationLevel).includes(level) || 
          isNaN(level) || 
          level < 0 || 
          level > 5) {
        return res.status(400).json({ message: "Invalid memorization level" });
      }
      
      // Check if user exists
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      // Check if verse exists
      const verse = await storage.getQuranVerseById(verseId);
      if (!verse) {
        return res.status(404).json({ message: "Verse not found" });
      }
      
      // Get the surah progress
      let surahProgress = await storage.getUserSurahProgressBySurahId(userId, verse.surahId);
      
      if (!surahProgress) {
        // Create new surah progress if it doesn't exist
        surahProgress = await storage.createUserSurahProgress({
          userId,
          surahId: verse.surahId,
          completedVerses: 0,
          memorizationLevel: 0,
          lastPracticed: new Date().toISOString(),
          verseProgress: JSON.stringify([{ verseId, level }])
        });
      } else {
        // Update existing surah progress
        let verseProgress = [];
        
        if (surahProgress.verseProgress) {
          try {
            verseProgress = JSON.parse(surahProgress.verseProgress);
          } catch (e) {
            verseProgress = [];
          }
        }
        
        // Find and update the verse progress
        const existingVerseIndex = verseProgress.findIndex((vp: any) => vp.verseId === verseId);
        
        if (existingVerseIndex >= 0) {
          verseProgress[existingVerseIndex].level = level;
        } else {
          verseProgress.push({ verseId, level });
        }
        
        // Count completed verses (level 5 = Mastered)
        const completedVerses = verseProgress.filter((vp: any) => vp.level === MemorizationLevel.Mastered).length;
        
        // Update the surah progress
        surahProgress = await storage.updateUserSurahProgress(surahProgress.id, {
          completedVerses,
          lastPracticed: new Date().toISOString(),
          verseProgress: JSON.stringify(verseProgress)
        });
      }
      
      res.json({ 
        userId, 
        verseId, 
        level, 
        surahProgress 
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to update verse memorization level" });
    }
  });

  return httpServer;
}
