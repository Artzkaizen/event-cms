import { env } from "@/env";
import { APIResponse, Event } from "@/lib/types";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod/v4";

const localeSchema = z.enum(["en", "fr", "es"]).default("en");
//const link = `${env.STRAPI_API_URL}/tickets?filters[user][id][$eq]=${ctx.session.id}&populate=*`;
export const eventsRouter = createTRPCRouter({
  all: protectedProcedure
    .input(
      z.object({
        page: z.number().min(1, "Page must be a positive integer").default(1),
        pageSize: z
          .number()
          .min(1, "Page size must be a positive integer")
          .default(10),
        locale: localeSchema,
      })
    )
    .query(async ({ input, ctx }) => {
      const link = `${env.STRAPI_API_URL}/events?populate=*&pagination[page]=${input.page}&pagination[pageSize]=${input.pageSize}${input.locale ? `&locale=${input.locale}` : ""}`;

      console.log(link);

      try {
        const response = await fetch(link, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${ctx.token}`,
          },
        });
        if (!response.ok) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message:
              (await response.json()).error?.message || "Something went wrong",
          });
        }
        const data = (await response.json()) as APIResponse<Event[]>;

        return data;
      } catch (error) {
        console.error("Error fetching events:", error);
        if (error instanceof TRPCError) {
          throw error;
        }
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error occurred during login",
        });
      }
    }),
  byId: protectedProcedure
    .input(
      z.object({
        id: z.string().min(1, "Event ID is required"),
        locale: localeSchema,
      })
    )
    .query(async ({ input, ctx }) => {
      const link = `${env.STRAPI_API_URL}/events/${input.id}?populate=*&locale=${input.locale}`;

      try {
        const response = await fetch(link, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${ctx.token}`,
          },
        });

        if (!response.ok) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message:
              (await response.json()).error?.message || "Invalid credentials",
          });
        }

        return response.json() as Promise<APIResponse<Event>>;
      } catch (error) {
        console.error("Error fetching event by ID:", error);
        if (error instanceof TRPCError) {
          throw error;
        }
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error occurred while fetching the event",
        });
      }
    }),
});
