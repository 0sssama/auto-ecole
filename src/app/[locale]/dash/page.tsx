"use client";

import { Button } from "@/components/ui/button";
import { SignOutButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { api } from "@/utils/api";

export default function Dashboard({
  params: { locale },
}: {
  params: {
    locale: string;
  };
}) {
  const router = useRouter();

  const { data, error, isLoading } = api.greeting.getGreeting.useQuery({
    name: "User",
  });

  return (
    <main className="flex items-center justify-center min-h-screen gap-4 p-24">
      <div className="flex flex-col items-center justify-center w-full max-w-screen-xl gap-4 m-auto">
        <h1 className="text-4xl font-semibold text-center">locale: {locale}</h1>
        <h1 className="text-4xl font-semibold text-center">
          {isLoading ? "Loading..." : error ? "Error" : data.greeting}
        </h1>
        <Button variant="destructive">
          <SignOutButton signOutCallback={() => router.push("/")} />
        </Button>
      </div>
    </main>
  );
}
