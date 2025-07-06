import { z } from "zod";
import { TRPCError } from "@trpc/server";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";

interface StrapiUser {
  id: number;
  documentId: string;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  firstName: string | null;
  lastName: string | null;
  birthday: null;
  phoneNumber: null;
}

interface StrapiAuthResponse {
  jwt: string;
  user: StrapiUser;
}

export const authRouter = createTRPCRouter({
  // Login mutation
  login: publicProcedure
    .input(
      z.object({
        email: z.string().email("Invalid email address"),
        password: z.string().min(1, "Password is required"),
      })
    )
    .mutation(async ({ input }) => {
      const { email, password } = input;

      try {
        const response = await fetch("http://localhost:1337/api/auth/local", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            identifier: email,
            password: password,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: errorData.error?.message || "Invalid credentials",
          });
        }

        const data = (await response.json()) as StrapiAuthResponse;

        // Return user session data that can be stored client-side
        const userSession = {
          id: String(data.user.id),
          email: data.user.email,
          firstName: data.user.firstName,
          lastName: data.user.lastName,
          username: data.user.username,
          jwt: data.jwt,
        };

        return {
          success: true,
          user: userSession,
          jwt: data.jwt,
          message: "Login successful",
        };
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error;
        }
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error occurred during login",
        });
      }
    }),

  // Signup mutation
  signup: publicProcedure
    .input(
      z
        .object({
          firstName: z.string().min(1, "First name is required"),
          lastName: z.string().min(1, "Last name is required"),
          email: z.string().email("Invalid email address"),
          password: z
            .string()
            .min(8, "Password must be at least 8 characters long")
            .regex(/[0-9]/, "Password must contain at least 1 number")
            .regex(/[a-z]/, "Password must contain at least 1 lowercase letter")
            .regex(
              /[A-Z]/,
              "Password must contain at least 1 uppercase letter"
            ),
          confirmPassword: z.string().min(1, "Confirm password is required"),
          phoneNumber: z.string().optional(),
        })
        .refine((data) => data.password === data.confirmPassword, {
          message: "Passwords do not match",
          path: ["confirmPassword"],
        })
    )
    .mutation(async ({ input }) => {
      const { firstName, lastName, email, password, phoneNumber } = input;

      try {
        const response = await fetch(
          "http://localhost:1337/api/auth/local/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
              password,
              firstName,
              lastName,
              phoneNumber,
            }),
          }
        );

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: errorData.error?.message || "Registration failed",
          });
        }

        const data = (await response.json()) as StrapiAuthResponse;

        const userSession = {
          id: String(data.user.id),
          email: data.user.email,
          firstName: data.user.firstName,
          lastName: data.user.lastName,
          username: data.user.username,
          jwt: data.jwt,
        };

        return {
          success: true,
          user: userSession,
          jwt: data.jwt,
          message: "Registration successful",
        };
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error;
        }
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error occurred during registration",
        });
      }
    }),

  // Get current user session
  me: protectedProcedure.query(async ({ ctx }) => {
    // Return the user from the session context
    return ctx.session;
  }),

  // Logout mutation
  logout: publicProcedure.mutation(async () => {
    // Since we're using JWT tokens, logout is handled client-side
    // by removing the token from storage
    return {
      success: true,
      message: "Logged out successfully",
    };
  }),
});
