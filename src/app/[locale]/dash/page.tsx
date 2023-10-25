import { Spinner } from "@/components/atoms";
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/dash/clients");
  return (
    <main className="w-full h-full min-h-[300px]">
      <div className="flex items-center justify-center w-full h-full">
        <Spinner size="md" />
      </div>
    </main>
  );
}
