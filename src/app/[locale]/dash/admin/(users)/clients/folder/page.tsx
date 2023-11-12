import { FolderNotFound } from "@/components/pages";
import { Dossier } from "@/components/sections";

export default function ClientFolder({
  searchParams: { clientId },
}: {
  searchParams: { clientId: string };
}) {
  if (!clientId || Number(clientId) <= 0) return <FolderNotFound />;

  return <Dossier studentId={Number(clientId)} />;
}
