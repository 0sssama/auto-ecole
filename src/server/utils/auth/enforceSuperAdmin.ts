import { auth } from "@clerk/nextjs";
import { notFound } from "next/navigation";
import { userIsSuperAdmin } from "./userIsSuperAdmin";

export const enforceSuperAdmin = async () => {
  const { orgId, userId } = auth();

  if (!orgId || !userId) notFound();

  const isSuperAdmin = await userIsSuperAdmin(userId, orgId);

  if (!isSuperAdmin) notFound();

  return true;
};
