"use client";

import { useCoverImage } from "@/hooks/use-cover-image";
import ImageUpload from "../ImageUpload";
import { useState } from "react";
import { useParams } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

export const CoverImageModal = () => {
  const params = useParams();
  const [file, setFile] = useState<any>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const update = useMutation(api.documents.update);

  const coverImage = useCoverImage();

  const onClose = () => {
    setFile(undefined);
    setIsSubmitting(false);
    coverImage.onClose();
  };

  const onChange = async (file?: any) => {
    if (file) {
      setIsSubmitting(true);
      setFile(file);
    }

    await update({
      id: params.documentId as Id<"documents">,
      coverImage: file,
    });

    onClose();
  };

  return (
    <ImageUpload
      value={file}
      isOpen={coverImage.isOpen}
      onChange={onChange}
      onClose={coverImage.onClose}
    />
  );
};
