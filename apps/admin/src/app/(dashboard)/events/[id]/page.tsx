import { Suspense } from "react";
import { EventDetails } from "./event-page";
import { getLocale } from "next-intl/server";

async function EventDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const locale = await getLocale();

  return (
    // @ts-expect-error weird-nextjs-issue
    <Suspense fallback={<Loading />}>
      <EventDetails id={id} locale={locale} />
    </Suspense>
  );
}

export default EventDetailsPage;

export function Loading() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <span className="loader"></span>
    </div>
  );
}
