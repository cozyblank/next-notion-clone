"use client";

import { Doc } from "@/convex/_generated/dataModel";
import { IconPicker } from "./icon-picker";
import { Button } from "./ui/button";
import { X } from "lucide-react";

interface ToolbarProps {
  initialData: Doc<"documents">;
  preview?: boolean;
}

const Toolbar = ({ initialData, preview }: ToolbarProps) => {
  return (
    <div className="pl-[54px] group relative">
      {!!initialData.icon && !preview && (
        <div className="flex items-center pt-6 gap-x-2 group/icon">
          <IconPicker onChange={() => {}}>
            <p className="text-6xl transition hover:opacity-75">
              {initialData.icon}
            </p>
            <Button
              className="text-xs transition rounded-full opacity-0 group-hover/icon:opacity-100 text-muted-foreground"
              onClick={() => {}}
              variant="outline"
              size="icon">
              <X className="w-4 h-4" />
            </Button>
          </IconPicker>
        </div>
      )}
    </div>
  );
};

export default Toolbar;
