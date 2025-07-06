"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { z } from "zod/v4";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { PasswordInput } from "./password-input";

const SignUpSchema = z.object({
  firstName: z
    .string({
      error: "First name is required",
    })
    .min(1, "First name must be at least 1 character long")
    .max(50, "First name must be at most 50 characters long"),
  lastName: z
    .string({
      error: "Last name is required",
    })
    .min(1, "Last name must be at least 1 character long")
    .max(50, "Last name must be at most 50 characters long"),
  email: z.email("Please enter a valid email address"),
  password: z
    .string({
      error: "Password is required",
    })
    .min(1, "Password is required")
    .regex(/.{8,}/, "Password must be at least 8 characters long")
    .regex(/[0-9]/, "Password must contain at least 1 number")
    .regex(/[a-z]/, "Password must contain at least 1 lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least 1 uppercase letter"),
});

export type SignUpFormValues = z.infer<typeof SignUpSchema>;

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const handleSubmit: SubmitHandler<SignUpFormValues> = (data) => {
    console.log("Form submitted with data:", data);
    // Handle login logic here, e.g., API call to authenticate user
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-3">
                  <FormField
                    name="firstName"
                    render={({ field }) => (
                      <FormControl>
                        <div className="grid gap-3">
                          <FormLabel htmlFor="firstName">First Name</FormLabel>
                          <Input id="firstName" placeholder="John" {...field} />
                          <FormMessage />
                        </div>
                      </FormControl>
                    )}
                  />
                  <FormField
                    name="lastName"
                    render={({ field }) => (
                      <div className="grid gap-3">
                        <FormLabel htmlFor="lastName">Last Name</FormLabel>
                        <Input id="lastName" placeholder="Doe" {...field} />
                        <FormMessage />
                      </div>
                    )}
                  />
                  <FormField
                    name="email"
                    render={({ field }) => (
                      <div className="grid gap-3">
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <Input
                          id="email"
                          placeholder="john@example.com"
                          {...field}
                        />
                        <FormMessage />
                      </div>
                    )}
                  />
                </div>

                <PasswordInput
                  name="password"
                  showIndicator
                  control={form.control}
                  value={form.watch("password")}
                />
                <div className="flex flex-col gap-3">
                  <Button type="submit" className="w-full">
                    Login
                  </Button>
                </div>
                <div className="mt-4 text-center text-sm">
                  Already have an account?{" "}
                  <a href="#" className="underline underline-offset-4">
                    Login
                  </a>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
