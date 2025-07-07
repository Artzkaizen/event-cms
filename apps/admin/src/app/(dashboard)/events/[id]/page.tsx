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
    <Suspense fallback={<div>Loading...</div>}>
      <EventDetails id={id} locale={locale} />
    </Suspense>
  );
}

export default EventDetailsPage;
