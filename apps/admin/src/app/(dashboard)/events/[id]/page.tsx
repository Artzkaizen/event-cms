import { Suspense } from "react";
import { EventDetails } from "./event-page";

async function EventDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    // @ts-expect-error weird-nextjs-issue
    <Suspense fallback={<div>Loading...</div>}>
      <EventDetails id={id} />
    </Suspense>
  );
}

export default EventDetailsPage;
