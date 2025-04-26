import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

import { MAX_HEARTS } from "@/constants";

export const medicalCategories = pgTable("medical_categories", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  imageSrc: text("image_src").notNull(),
  description: text("description").notNull(),
});

export const medicalCategoriesRelations = relations(medicalCategories, ({ many }) => ({
  userProgress: many(userProgress),
  subcategories: many(subcategories),
}));

export const subcategories = pgTable("subcategories", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  categoryId: integer("category_id")
    .references(() => medicalCategories.id, {
      onDelete: "cascade",
    })
    .notNull(),
  order: integer("order").notNull(),
});

export const subcategoriesRelations = relations(subcategories, ({ many, one }) => ({
  category: one(medicalCategories, {
    fields: [subcategories.categoryId],
    references: [medicalCategories.id],
  }),
  learningModules: many(learningModules),
}));

export const learningModules = pgTable("learning_modules", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  subcategoryId: integer("subcategory_id")
    .references(() => subcategories.id, {
      onDelete: "cascade",
    })
    .notNull(),
  moduleType: text("module_type").notNull(),
  order: integer("order").notNull(),
});

export const learningModulesRelations = relations(learningModules, ({ one, many }) => ({
  subcategory: one(subcategories, {
    fields: [learningModules.subcategoryId],
    references: [subcategories.id],
  }),
  challenges: many(challenges),
}));

export const challengesEnum = pgEnum("type", ["SELECT", "ASSIST", "MATCH", "TRUE_FALSE"]);

export const challenges = pgTable("challenges", {
  id: serial("id").primaryKey(),
  moduleId: integer("module_id")
    .references(() => learningModules.id, {
      onDelete: "cascade",
    })
    .notNull(),
  type: challengesEnum("type").notNull(),
  question: text("question").notNull(),
  order: integer("order").notNull(),
});

export const challengesRelations = relations(challenges, ({ one, many }) => ({
  learningModule: one(learningModules, {
    fields: [challenges.moduleId],
    references: [learningModules.id],
  }),
  challengeOptions: many(challengeOptions),
  challengeProgress: many(challengeProgress),
}));

export const challengeOptions = pgTable("challenge_options", {
  id: serial("id").primaryKey(),
  challengeId: integer("challenge_id")
    .references(() => challenges.id, {
      onDelete: "cascade",
    })
    .notNull(),
  text: text("text").notNull(),
  correct: boolean("correct").notNull(),
  imageSrc: text("image_src"),
  audioSrc: text("audio_src"),
});

export const challengeOptionsRelations = relations(
  challengeOptions,
  ({ one }) => ({
    challenge: one(challenges, {
      fields: [challengeOptions.challengeId],
      references: [challenges.id],
    }),
  })
);

export const challengeProgress = pgTable("challenge_progress", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  challengeId: integer("challenge_id")
    .references(() => challenges.id, {
      onDelete: "cascade",
    })
    .notNull(),
  completed: boolean("completed").notNull().default(false),
});

export const challengeProgressRelations = relations(
  challengeProgress,
  ({ one }) => ({
    challenge: one(challenges, {
      fields: [challengeProgress.challengeId],
      references: [challenges.id],
    }),
  })
);

export const userProgress = pgTable("user_progress", {
  userId: text("user_id").primaryKey(),
  userName: text("user_name").notNull().default("User"),
  userImageSrc: text("user_image_src").notNull().default("/mascot.svg"),
  activeCategoryId: integer("active_category_id").references(() => medicalCategories.id, {
    onDelete: "cascade",
  }),
  hearts: integer("hearts").notNull().default(MAX_HEARTS),
  points: integer("points").notNull().default(0),
  level: text("level").notNull().default("Student"),
  streak: integer("streak").notNull().default(0),
});

export const userProgressRelations = relations(userProgress, ({ one }) => ({
  activeCategory: one(medicalCategories, {
    fields: [userProgress.activeCategoryId],
    references: [medicalCategories.id],
  }),
}));

export const userSubscription = pgTable("user_subscription", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull().unique(),
  stripeCustomerId: text("stripe_customer_id").notNull().unique(),
  stripeSubscriptionId: text("stripe_subscription_id").notNull().unique(),
  stripePriceId: text("stripe_price_id").notNull(),
  stripeCurrentPeriodEnd: timestamp("stripe_current_period_end").notNull(),
});

export const userBadges = pgTable("user_badges", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  badgeId: integer("badge_id").notNull(),
  earnedAt: timestamp("earned_at").notNull(),
});

export const badges = pgTable("badges", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageSrc: text("image_src").notNull(),
  requirement: text("requirement").notNull(),
  requirementValue: integer("requirement_value").notNull(),
});
