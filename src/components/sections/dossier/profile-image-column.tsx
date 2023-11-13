import Image from "next/image";
import { UploadCloud, UserCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import type { ProfileImageColumnProps } from "./types";

export default function ProfileImageColumn({
  profilePictureUrl,
  studentName,
}: ProfileImageColumnProps) {
  return (
    <div className="flex flex-col w-full gap-4">
      <div className="flex items-center justify-center w-full overflow-hidden bg-gray-200 rounded-full aspect-square">
        {profilePictureUrl ? (
          <Image src={profilePictureUrl} alt={studentName} />
        ) : (
          <UserCircle2 className="text-gray-400" size={32} fontWeight={200} />
        )}
      </div>
      <Button className="w-full" variant="outline">
        <UploadCloud size={16} className="mr-2" />
        Upload New Picture
      </Button>
    </div>
  );
}
