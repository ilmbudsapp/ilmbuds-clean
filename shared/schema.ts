import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User roles enum
export enum UserRole {
  Child = 'child',
  Parent = 'parent',
}

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").default(UserRole.Child).notNull(),
  points: integer("points").default(0).notNull(),
  badgesEarned: jsonb("badges_earned").$type<string[]>().default([]),
  quizzesCompleted: integer("quizzes_completed").default(0).notNull(),
  displayName: text("display_name"),
  email: text("email"),
  profileImageUrl: text("profile_image_url"),
});

// Parent-Child relationship
export const parentChildRelationships = pgTable("parent_child_relationships", {
  id: serial("id").primaryKey(),
  parentId: integer("parent_id").notNull(),
  childId: integer("child_id").notNull(),
});

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  icon: text("icon").notNull(),
  iconColor: text("icon_color").notNull(),
  backgroundColor: text("background_color").notNull(),
  totalQuizzes: integer("total_quizzes").default(0).notNull(),
  difficulty: integer("difficulty").default(1).notNull(),
  folder: text("folder").default("QUIZ").notNull(), // Added folder field
});

export const quizzes = pgTable("quizzes", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  categoryId: integer("category_id").notNull(),
  difficulty: integer("difficulty").default(1).notNull(),
  totalQuestions: integer("total_questions").default(0).notNull(),
});

export const questions = pgTable("questions", {
  id: serial("id").primaryKey(),
  quizId: integer("quiz_id").notNull(),
  text: text("text").notNull(),
  imageUrl: text("image_url"),
  audioUrl: text("audio_url"),
  options: jsonb("options").$type<string[]>().notNull(),
  correctOption: integer("correct_option").notNull(),
  explanation: text("explanation").notNull(),
});

export const userProgress = pgTable("user_progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  quizId: integer("quiz_id").notNull(),
  score: integer("score").default(0).notNull(),
  completed: boolean("completed").default(false).notNull(),
  correctAnswers: integer("correct_answers").default(0).notNull(),
  incorrectAnswers: integer("incorrect_answers").default(0).notNull(),
  lastCompleted: text("last_completed"),
});

// Quran Surahs Tables
export const quranSurahs = pgTable("quran_surahs", {
  id: serial("id").primaryKey(),
  number: integer("number").notNull(), // Number in standard Quran order
  nameArabic: text("name_arabic").notNull(), // Arabic name
  nameTransliteration: text("name_transliteration").notNull(), // Transliterated name (e.g., "Al-Fatiha")
  totalVerses: integer("total_verses").notNull(), // Number of verses
  revelationPlace: text("revelation_place").notNull(), // Mecca or Medina
  difficulty: integer("difficulty").default(1).notNull(), // For children learning level
  memorizationRank: integer("memorization_rank").default(1).notNull(), // Priority for memorization
  audioUrl: text("audio_url"), // URL to recitation audio file
  thumbnailUrl: text("thumbnail_url"), // URL to thumbnail image
});

export const quranVerses = pgTable("quran_verses", {
  id: serial("id").primaryKey(),
  surahId: integer("surah_id").notNull(), // Foreign key to quranSurahs
  verseNumber: integer("verse_number").notNull(), // Number of verse within surah 
  arabicText: text("arabic_text").notNull(), // Arabic text with diacritics
  transliteration: text("transliteration").notNull(), // Latin script phonetic transliteration
  audioUrl: text("audio_url"), // URL to verse-specific audio
  orderInSurah: integer("order_in_surah").notNull(), // Order in the surah
});

export const quranTranslations = pgTable("quran_translations", {
  id: serial("id").primaryKey(),
  verseId: integer("verse_id").notNull(), // Foreign key to quranVerses
  language: text("language").notNull(), // Language code (en, sq, bs, de, it)
  translation: text("translation").notNull(), // Translated text
  explanation: text("explanation"), // Child-friendly explanation
});

export const userSurahProgress = pgTable("user_surah_progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  surahId: integer("surah_id").notNull(),
  completedVerses: integer("completed_verses").default(0).notNull(),
  memorizationLevel: integer("memorization_level").default(0).notNull(), // 0-5 scale of memorization
  lastPracticed: text("last_practiced"), // Timestamp of last practice
  verseProgress: text("verse_progress"), // JSON string of verse level progress
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  role: true,
  displayName: true,
  email: true,
  profileImageUrl: true,
});

export const insertParentChildSchema = createInsertSchema(parentChildRelationships).pick({
  parentId: true,
  childId: true,
});

export const insertCategorySchema = createInsertSchema(categories).pick({
  name: true,
  icon: true,
  iconColor: true,
  backgroundColor: true,
  difficulty: true,
  folder: true,
});

export const insertQuizSchema = createInsertSchema(quizzes).pick({
  title: true,
  categoryId: true,
  difficulty: true,
});

export const insertQuestionSchema = createInsertSchema(questions).pick({
  quizId: true,
  text: true,
  imageUrl: true,
  audioUrl: true,
  options: true,
  correctOption: true,
  explanation: true,
});

export const insertUserProgressSchema = createInsertSchema(userProgress).pick({
  userId: true,
  quizId: true,
  score: true,
  completed: true,
  correctAnswers: true,
  incorrectAnswers: true,
  lastCompleted: true,
});

// Quran insert schemas
export const insertQuranSurahSchema = createInsertSchema(quranSurahs).pick({
  number: true,
  nameArabic: true,
  nameTransliteration: true,
  totalVerses: true,
  revelationPlace: true,
  difficulty: true,
  memorizationRank: true,
  audioUrl: true,
  thumbnailUrl: true,
});

export const insertQuranVerseSchema = createInsertSchema(quranVerses).pick({
  surahId: true,
  verseNumber: true,
  arabicText: true,
  transliteration: true,
  audioUrl: true,
  orderInSurah: true,
});

export const insertQuranTranslationSchema = createInsertSchema(quranTranslations).pick({
  verseId: true,
  language: true,
  translation: true,
  explanation: true,
});

export const insertUserSurahProgressSchema = createInsertSchema(userSurahProgress).pick({
  userId: true,
  surahId: true,
  completedVerses: true,
  memorizationLevel: true,
  lastPracticed: true,
  verseProgress: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type ParentChildRelationship = typeof parentChildRelationships.$inferSelect;
export type InsertParentChildRelationship = z.infer<typeof insertParentChildSchema>;

export type Category = typeof categories.$inferSelect;
export type InsertCategory = z.infer<typeof insertCategorySchema>;

export type Quiz = typeof quizzes.$inferSelect;
export type InsertQuiz = z.infer<typeof insertQuizSchema>;

export type Question = typeof questions.$inferSelect;
export type InsertQuestion = z.infer<typeof insertQuestionSchema>;

export type UserProgress = typeof userProgress.$inferSelect;
export type InsertUserProgress = z.infer<typeof insertUserProgressSchema>;

// Quran types
export type QuranSurah = typeof quranSurahs.$inferSelect;
export type InsertQuranSurah = z.infer<typeof insertQuranSurahSchema>;

export type QuranVerse = typeof quranVerses.$inferSelect;
export type InsertQuranVerse = z.infer<typeof insertQuranVerseSchema>;

export type QuranTranslation = typeof quranTranslations.$inferSelect;
export type InsertQuranTranslation = z.infer<typeof insertQuranTranslationSchema>;

export type UserSurahProgress = typeof userSurahProgress.$inferSelect;
export type InsertUserSurahProgress = z.infer<typeof insertUserSurahProgressSchema>;

// Difficulty enum
export enum Difficulty {
  Beginner = 1,
  Intermediate = 2,
  Advanced = 3,
}

// Memorization level enum
export enum MemorizationLevel {
  NotStarted = 0,
  Familiar = 1,
  PartiallyMemorized = 2,
  MostlyMemorized = 3,
  FullyMemorized = 4,
  Mastered = 5,
}
