import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    userId: v.string(),
    email: v.string(),
    name: v.string(),
    profilePic: v.string(),
    proMode: v.boolean(),
    proModeDate: v.optional(v.string()),
    proModeCustomerId: v.optional(v.string()),
    proModeOrderId: v.optional(v.string()),
  }).index("by_userId", ["userId"]),

  codeExecution: defineTable({
    userId: v.string(),
    codingLanguage: v.string(),
    output: v.optional(v.string()),
    error: v.optional(v.string()),
  }).index("by_userId", ["userId"]),

  codeSnippets: defineTable({
    userId: v.string(),
    title: v.string(),
    language: v.string(),
    username: v.string(),
  }).index("by_userId", ["userId"]),

  codeSnippetsComments: defineTable({
    snippetId: v.id("codeSnippets"),
    userId: v.string(),
    username: v.string(),
    content: v.string(),
  }).index("by_snippetId", ["snippetId"]),

  stars: defineTable({
    userId: v.id("users"),
    snippetId: v.id("codeSnippets"),
  }).index("by_userId_and_snippetId", ["userId", "snippetId"]),
});
