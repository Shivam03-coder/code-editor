import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const SyncUserToDb = mutation({
  args: {
    userId: v.string(),
    email: v.string(),
    name: v.string(),
    profilePic: v.string(),
  },
  handler: async (ctx, args) => {
    const IsUser = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .first()
      .then((user) => !!user);

    if (!IsUser) {
      await ctx.db.insert("users", {
        userId: args.userId,
        email: args.email,
        name: args.name,
        profilePic: args.profilePic,
        proMode: false,
      });
    }
  },
});
