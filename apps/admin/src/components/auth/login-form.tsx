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
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod/v4";
import { Form, FormField, FormLabel, FormMessage } from "../ui/form";
import { PasswordInput } from "./password-input";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const t = useTranslations("Auth.Login");
  const tValidation = useTranslations("Validation");
  const router = useRouter();

  const LoginSchema = z.object({
    email: z.email(tValidation("email.invalid")),
    password: z.string().min(1, tValidation("password.required")),
  });

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginMutation = api.auth.login.useMutation({
    onSuccess: () => router.push("/"),
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit: SubmitHandler<z.infer<typeof LoginSchema>> = async (
    data
  ) => {
    await loginMutation.mutateAsync(data);
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>{t("title")}</CardTitle>
          <CardDescription>{t("description")}</CardDescription>
        </CardHeader>
        <CardContent className="">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <div className="flex flex-col gap-6">
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

                <PasswordInput
                  name="password"
                  control={form.control}
                  value={form.watch("password")}
                />
                <div className="flex flex-col gap-3">
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={loginMutation.isPending}
                  >
                    {loginMutation.isPending
                      ? "Signing in..."
                      : t("loginButton")}
                  </Button>
                </div>

                <div className="mt-4 text-center text-sm">
                  {t("noAccount")}{" "}
                  <Link
                    href="/sign-up"
                    className="underline underline-offset-4"
                  >
                    {t("signUpLink")}
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
