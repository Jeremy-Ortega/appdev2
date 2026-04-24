import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

/**
 * Fetch all todos from the database.
 * The useQuery hook in React will automatically re-run 
 * whenever this data changes.
 */
export const get = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("todos").order("desc").collect();
    },
});

/**
 * Add a new todo item.
 */
export const add = mutation({
    args: { text: v.string() },
    handler: async (ctx, args) => {
        await ctx.db.insert("todos", {
            text: args.text,
            isCompleted: false,
        });
    },
});

/**
 * Toggle the completion status of a todo.
 */
export const toggle = mutation({
    args: {
        id: v.id("todos"),
        isCompleted: v.boolean()
    },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.id, {
            isCompleted: args.isCompleted,
        });
    },
});

/**
 * Delete a todo item.
 */
export const remove = mutation({
    args: { id: v.id("todos") },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id);
    },
});
