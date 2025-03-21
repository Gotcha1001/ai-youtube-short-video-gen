import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const CreateVideoData = mutation({
  args: {
    title: v.string(),
    topic: v.string(),
    script: v.string(),
    videoStyle: v.string(),
    caption: v.any(),
    voice: v.string(),
    uid: v.id("users"),
    createdBy: v.string(),
    credits: v.number(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.insert("videoData", {
      title: args.title,
      topic: args.topic,
      script: args.script,
      videoStyle: args.videoStyle,
      caption: args.caption,
      voice: args.voice,
      uid: args.uid,
      createdBy: args.createdBy,
      status: "pending",
    });

    await ctx.db.patch(args.uid, {
      credits: args?.credits - 1,
    });

    return result;
  },
});

export const UpdateVideoRecord = mutation({
  args: {
    recordId: v.id("videoData"),
    audioUrl: v.string(),
    images: v.any(),
    captionJson: v.any(),
    downloadUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Create update object with base properties
    const updateData = {
      audioUrl: args.audioUrl,
      captionJson: args.captionJson,
      images: args.images,
      status: "completed",
    };

    // Add downloadUrl if it's provided
    if (args.downloadUrl) {
      updateData.downloadUrl = args.downloadUrl;
    }

    // Update the database with all fields
    const result = await ctx.db.patch(args.recordId, updateData);

    return result;
  },
});

export const GetUserVideos = query({
  args: {
    uid: v.id("users"),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db
      .query("videoData")
      .filter((q) => q.eq(q.field("uid"), args.uid))
      .order("desc")
      .collect();

    return result;
  },
});

export const GetVideoById = query({
  args: {
    videoId: v.id("videoData"),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.get(args.videoId);
    return result;
  },
});

// Add this to your videoData.js file in Convex

// Add this to your videoData.js file in Convex
// Add this to your videoData.js file in Convex
export const GetAllVideos = query({
  args: {
    skip: v.optional(v.number()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    try {
      // Use default values if not provided
      const skip = args.skip ?? 0;
      const limit = args.limit ?? 10;

      // Simple query without filters first to test
      const allVideos = await ctx.db.query("videoData").collect();

      // Manual pagination in memory (not ideal for large datasets but good for testing)
      const paginatedVideos = allVideos.slice(skip, skip + limit);

      return {
        videos: paginatedVideos,
        total: allVideos.length,
      };
    } catch (error) {
      // Log the error to help with debugging
      console.error("GetAllVideos error:", error);
      // Return an empty result rather than throwing
      return {
        videos: [],
        total: 0,
        error: error.message,
      };
    }
  },
});
