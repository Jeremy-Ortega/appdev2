import { mutation } from "./_generated/server";

export const seed = mutation({
  args: {},
  handler: async (ctx) => {
    const initialTasks = [
      "Buy groceries",
      "Finish React Native tutorial",
      "Clean the kitchen",
      "Call mom",
      "Schedule dentist appointment",
      "Fix bug in todo app",
      "Read 10 pages of a book",
      "Go for a 20-minute run",
      "Organize desk",
      "Meditate for 5 minutes"
    ];

    for (const taskText of initialTasks) {
      await ctx.db.insert("todos", {
        text: taskText,
        isCompleted: Math.random() > 0.7, // Randomly mark some as completed
      });
    }
    
    return "Successfully seeded 10 tasks!";
  },
});
