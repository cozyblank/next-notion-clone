"use client";

import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface BannerProps {
  documentId: Id<"documents">;
}

export const Banner = ({ documentId }: BannerProps) => {
  const router = useRouter();
  const remove = useMutation(api.documents.remove);
  const restore = useMutation(api.documents.restore);

  const onRemove = () => {
    const promise = remove({ id: documentId });

    toast.promise(promise, {
      loading: "Deleting document...",
      success: "Document deleted!!",
      error: "Failed to delete document...",
    });

    router.push("/documents");
  };

  const onRestore = () => {
    const promise = restore({ id: documentId });

    toast.promise(promise, {
      loading: "Restoring document...",
      success: "Document restored!!",
      error: "Failed to restore document...",
    });
  };

  return (
    <div
      className="w-full bg-rose-500 text-center text-sm p-2 text-white flex items-center
    gap-x-2 justify-center
    ">
      <p>This page is in the Trash Box...</p>
      <Button
        onClick={onRestore}
        variant="outline"
        size="sm"
        className="border-white bg-transparent hover:bg-primary/5 text-white">
        Restore Page
      </Button>
      <ConfirmModal onConfirm={onRemove}>
        <Button
          variant="outline"
          size="sm"
          className="border-white bg-transparent hover:bg-primary/5 text-white">
          Delete Forever
        </Button>
      </ConfirmModal>
    </div>
  );
};
