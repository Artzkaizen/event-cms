"use client";

import { CheckIcon, EyeIcon, EyeOffIcon, XIcon } from "lucide-react";
import { useId, useMemo, useState } from "react";
import { useTranslations } from "next-intl";

import { Input } from "@/components/ui/input";
import { Control, FieldValues, Path } from "react-hook-form";
import { FormControl, FormField, FormLabel, FormMessage } from "../ui/form";

export function PasswordInput<T extends FieldValues>({
  label,
  control,
  name,
  value,
  showIndicator = false,
}: {
  label?: string;
  value: string;
  control: Control<T>;
  name: Path<T>;
  showIndicator?: boolean;
}) {
  const t = useTranslations("Auth.PasswordInput");
  const id = useId();
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => setIsVisible((prevState) => !prevState);

  const checkStrength = (pass: string) => {
    const requirements = [
      {
        regex: /.{8,}/,
        text: t("strengthIndicator.requirements.atLeast8Characters"),
      },
      {
        regex: /[0-9]/,
        text: t("strengthIndicator.requirements.atLeast1Number"),
      },
      {
        regex: /[a-z]/,
        text: t("strengthIndicator.requirements.atLeast1Lowercase"),
      },
      {
        regex: /[A-Z]/,
        text: t("strengthIndicator.requirements.atLeast1Uppercase"),
      },
    ];

    return requirements.map((req) => ({
      met: req.regex.test(pass),
      text: req.text,
    }));
  };

  const strength = checkStrength(value);

  const strengthScore = useMemo(() => {
    return strength.filter((req) => req.met).length;
  }, [strength]);

  const getStrengthColor = (score: number) => {
    if (score === 0) return "bg-border";
    if (score <= 1) return "bg-red-500";
    if (score <= 2) return "bg-orange-500";
    if (score === 3) return "bg-amber-500";
    return "bg-emerald-500";
  };

  const getStrengthText = (score: number) => {
    if (score === 0) return t("strengthIndicator.enterPassword");
    if (score <= 2) return t("strengthIndicator.weakPassword");
    if (score === 3) return t("strengthIndicator.mediumPassword");
    return t("strengthIndicator.strongPassword");
  };

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <div>
          {/* Password input field with toggle visibility button */}
          <div className="*:not-first:mt-2">
            <div className="flex items-center justify-between">
              <FormLabel htmlFor={id}>{label || t("passwordLabel")}</FormLabel>
              <a
                href="#"
                className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
              >
                {t("forgotPassword")}
              </a>
            </div>
            <FormControl>
              <div>
                <div className="relative">
                  <Input
                    id={id}
                    className="pe-9"
                    placeholder={t("passwordPlaceholder")}
                    type={isVisible ? "text" : "password"}
                    aria-describedby={`${id}-description`}
                    {...field}
                  />
                  <button
                    className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                    type="button"
                    onClick={toggleVisibility}
                    aria-label={
                      isVisible ? t("hidePassword") : t("showPassword")
                    }
                    aria-pressed={isVisible}
                    aria-controls="password"
                  >
                    {isVisible ? (
                      <EyeOffIcon size={16} aria-hidden="true" />
                    ) : (
                      <EyeIcon size={16} aria-hidden="true" />
                    )}
                  </button>
                </div>

                <FormMessage />
              </div>
            </FormControl>
          </div>

          {showIndicator && (
            <>
              {/* Password strength indicator */}
              <div
                className="bg-border mt-3 mb-4 h-1 w-full overflow-hidden rounded-full"
                role="progressbar"
                aria-valuenow={strengthScore}
                aria-valuemin={0}
                aria-valuemax={4}
                aria-label="Password strength"
              >
                <div
                  className={`h-full ${getStrengthColor(strengthScore)} transition-all duration-500 ease-out`}
                  style={{ width: `${(strengthScore / 4) * 100}%` }}
                ></div>
              </div>

              {/* Password strength description */}
              <p
                id={`${id}-description`}
                className="text-foreground mb-2 text-sm font-medium"
              >
                {getStrengthText(strengthScore)}.{" "}
                {t("strengthIndicator.mustContain")}
              </p>

              {/* Password requirements list */}
              <ul className="space-y-1.5" aria-label="Password requirements">
                {strength.map((req, index) => (
                  <li key={index} className="flex items-center gap-2">
                    {req.met ? (
                      <CheckIcon
                        size={16}
                        className="text-emerald-500"
                        aria-hidden="true"
                      />
                    ) : (
                      <XIcon
                        size={16}
                        className="text-muted-foreground/80"
                        aria-hidden="true"
                      />
                    )}
                    <span
                      className={`text-xs ${req.met ? "text-emerald-600" : "text-muted-foreground"}`}
                    >
                      {req.text}
                      <span className="sr-only">
                        {req.met
                          ? ` - ${t("strengthIndicator.requirementMet")}`
                          : ` - ${t("strengthIndicator.requirementNotMet")}`}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    />
  );
}
