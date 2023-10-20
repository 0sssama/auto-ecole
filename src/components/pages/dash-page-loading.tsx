import { Logo, Spinner } from "@/components/atoms";

export default function DashboardPageLoading() {
  return (
    <main className="relative flex flex-col items-center justify-center w-full h-screen lg:flex-row">
      <Spinner size="md" />
      <div className="absolute -translate-x-1/2 bottom-8 lg:bottom-12 left-1/2">
        <Logo size="sm" />
      </div>
    </main>
  );
}
