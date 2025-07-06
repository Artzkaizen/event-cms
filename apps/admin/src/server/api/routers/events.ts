import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const eventsRouter = createTRPCRouter({
  hello: publicProcedure.query(() => {
    return { message: "Hello from the events router!" };
  }),
});
