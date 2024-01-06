"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import { PlusCircle } from "lucide-react";
import Image from "next/image";

const DocumentsPage = () => {
  const { user } = useUser();

  return (
    <div className="flex flex-col items-center justify-center h-full space-y-4">
      <Image
        src="/document.png"
        height="300"
        width="300"
        alt="document-image"
        className="dark:hidden"
      />
      <Image
        src="/document-dark.png"
        height="300"
        width="300"
        alt="document-image"
        className="hidden dark:block"
      />
      <h2 className="text-lg font-medium">
        Welcome to {user?.firstName}&apos;s Notion
      </h2>
      <Button>
        <PlusCircle className="w-4 h-4 mr-2" />
        Create a document
      </Button>
    </div>
  );
};

export default DocumentsPage;
