"use client";
// import { api } from "@/trpc/server";
import { api as apiClient } from "@/trpc/react";

export default function Page() {
  // const auth = await api.auth.session();

  const auth = apiClient.auth.session.useQuery(undefined, {
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="bg-muted/50 aspect-video rounded-xl" />
        <div className="bg-muted/50 aspect-video rounded-xl" />
        <div className="bg-muted/50 aspect-video rounded-xl" />
      </div>
      {/* <div>{auth?.firstName}</div> */}
      <pre>{JSON.stringify(auth.data, null, 2)}</pre>
      <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
    </div>
  );
}
