"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod/v4";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { PasswordInput } from "./password-input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { api } from "@/trpc/react";

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const t = useTranslations("Auth.SignUp");
  const tValidation = useTranslations("Validation");
  const router = useRouter();

  const SignUpSchema = z
    .object({
      firstName: z
        .string()
        .min(1, tValidation("firstName.required"))
        .max(50, tValidation("firstName.maxLength")),
      lastName: z
        .string()
        .min(1, tValidation("lastName.required"))
        .max(50, tValidation("lastName.maxLength")),
      email: z.email(tValidation("email.invalid")),
      password: z
        .string()
        .min(1, tValidation("password.required"))
        .min(8, tValidation("password.minLength"))
        .regex(/[0-9]/, tValidation("password.requireNumber"))
        .regex(/[a-z]/, tValidation("password.requireLowercase"))
        .regex(/[A-Z]/, tValidation("password.requireUppercase")),
      confirmPassword: z
        .string()
        .min(1, tValidation("confirmPassword.required")),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: tValidation("confirmPassword.noMatch"),
      path: ["confirmPassword"],
    });

  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const signupMutation = api.auth.signup.useMutation({
    onSuccess: () => router.push("/"),
    onError: (error) => {
      console.log(error);
    },
  });

  const handleSubmit: SubmitHandler<z.infer<typeof SignUpSchema>> = async (
    data
  ) => {
    await signupMutation.mutateAsync(data);
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>{t("title")}</CardTitle>
          <CardDescription>{t("description")}</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <div className="flex flex-col gap-6">
                {signupMutation.error && (
                  <div className="bg-destructive/15 text-destructive px-4 py-3 rounded-md text-sm">
                    {signupMutation.error.message}
                  </div>
                )}

                <div className="grid gap-3">
                  <FormField
                    name="firstName"
                    render={({ field }) => (
                      <FormControl>
                        <div className="grid gap-3">
                          <FormLabel htmlFor="firstName">
                            {t("firstNameLabel")}
                          </FormLabel>
                          <Input
                            id="firstName"
                            placeholder={t("firstNamePlaceholder")}
                            {...field}
                          />
                          <FormMessage />
                        </div>
                      </FormControl>
                    )}
                  />
                  <FormField
                    name="lastName"
                    render={({ field }) => (
                      <div className="grid gap-3">
                        <FormLabel htmlFor="lastName">
                          {t("lastNameLabel")}
                        </FormLabel>
                        <Input
                          id="lastName"
                          placeholder={t("lastNamePlaceholder")}
                          {...field}
                        />
                        <FormMessage />
                      </div>
                    )}
                  />
                  <FormField
                    name="email"
                    render={({ field }) => (
                      <div className="grid gap-3">
                        <FormLabel htmlFor="email">{t("emailLabel")}</FormLabel>
                        <Input
                          id="email"
                          placeholder={t("emailPlaceholder")}
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
                <PasswordInput
                  label={t("confirmPasswordLabel")}
                  name="confirmPassword"
                  control={form.control}
                  value={form.watch("confirmPassword")}
                />
                <div className="flex flex-col gap-3">
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={signupMutation.isPending}
                  >
                    {signupMutation.isPending
                      ? "Creating account..."
                      : t("signUpButton")}
                  </Button>
                </div>
                <div className="mt-4 text-center text-sm">
                  {t("haveAccount")}{" "}
                  <Link href="/login" className="underline underline-offset-4">
                    {t("loginLink")}
                  </Link>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
