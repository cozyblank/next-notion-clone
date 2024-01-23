"use client";

import { cn } from "@/lib/utils";
import { CldImage } from "next-cloudinary";
import { Button } from "./ui/button";
import { ImageIcon, X } from "lucide-react";
import { useCoverImage } from "@/hooks/use-cover-image";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import axios from "axios";
import { Skeleton } from "./ui/skeleton";
import { useOrigin } from "@/hooks/use-origin";

interface CoverImageProps {
  url?: string;
  preview?: boolean;
}

export const Cover = ({ url, preview }: CoverImageProps) => {
  const origin = useOrigin();
  const params = useParams();
  const coverImage = useCoverImage();
  const removeCoverImage = useMutation(
    api.documents.removeCoverImage
  );

  const onRemove = async () => {
    try {
      let result = await axios.post(`${origin}/api/images/destroy`, {
        url,
      });

      console.log("result: ", result);

      await removeCoverImage({
        id: params.documentId as Id<"documents">,
      });
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <div
      className={cn(
        "relative w-full h-[35vh] group",
        !url && "h-[12vh]",
        url && "bg-muted"
      )}>
      {!!url && (
        <CldImage
          src={url}
          fill={true}
          crop="fill"
          alt="Cover Iamge"
        />
      )}

      {url && !preview && (
        <div className="absolute flex items-center opacity-0 group-hover:opacity-100 bottom-5 right-5 gap-x-2">
          <Button
            onClick={() => coverImage.onReplace(url)}
            className="text-xs text-muted-foreground"
            variant="outline"
            size="sm">
            <ImageIcon className="w-4 h-4 mr-2" />
            Change Cover
          </Button>

          <Button
            onClick={onRemove}
            className="text-xs text-muted-foreground"
            variant="outline"
            size="sm">
            <X className="w-4 h-4 mr-2" />
            Remove Cover
          </Button>
        </div>
      )}
    </div>
  );
};

Cover.Skeleton = function CoverSkeleton() {
  return <Skeleton className="w-full h-[12vh]" />;
};
