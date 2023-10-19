import Link from "next/link";

export default function Home({
  params: { locale },
}: {
  params: {
    locale: string;
  };
}) {
  return (
    <main className="relative flex items-center justify-center min-h-screen gap-4 p-24">
      <Link className="absolute inset-0 z-[3]" href="/dash" />
      <div className="flex flex-col items-center justify-center w-full max-w-screen-xl gap-4 m-auto">
        <h1 className="text-4xl font-bold text-center">
          Landing Page Here, Locale: {locale}
        </h1>
        <p className="text-sm font-semibold text-slate-500">
          Click anywhere to continue to dashboard
        </p>
      </div>
    </main>
  );
}
