import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

export default getRequestConfig(async () => {
  // Get locale from cookies, URL, or default to 'en'
  const cookieStore = await cookies();
  const locale = cookieStore.get("locale")?.value || "de";

  console.log("Locale:", cookieStore.get("locale")?.value);

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
