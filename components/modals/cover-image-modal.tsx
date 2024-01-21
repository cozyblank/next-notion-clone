"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog";
import { useCoverImage } from "@/hooks/use-cover-image";

export const CoverImageModal = () => {
  const coverImage = useCoverImage();

  return (
    <Dialog
      open={coverImage.isOpen}
      onOpenChange={coverImage.onClose}>
      <DialogContent>
        <DialogHeader>
          <h2 className="text-lg font-semibold text-center">
            Cover Image
          </h2>
        </DialogHeader>
        <div>Todo: Upload Image</div>
      </DialogContent>
    </Dialog>
  );
};
