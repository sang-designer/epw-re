"use client";

import { Info, MessageCircle, FileText, Grid3X3 } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  return (
    <header
      className={cn(
        "flex items-center justify-between px-4 h-[48px] border-b border-border bg-white",
        className
      )}
    >
      <div className="flex items-center gap-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="size-8 bg-[#171417] rounded-md flex items-center justify-center text-white text-[10px] font-bold leading-none">
            <span className="text-[8px]">F</span>
            <span className="text-[10px] ml-px">sq</span>
          </div>
          <span className="text-[16px] leading-[24px] font-semibold text-foreground">
            /placemaker
          </span>
          <span className="text-[12px] leading-[16px] font-medium text-muted-foreground border border-border rounded px-1.5 py-0.5">
            Beta
          </span>
        </div>

        {/* Nav links */}
        <nav className="flex items-center gap-4">
          <a
            href="#"
            className="text-[14px] leading-[20px] font-normal text-foreground hover:text-primary"
          >
            Home
          </a>
          <a
            href="#"
            className="text-[14px] leading-[20px] font-normal text-foreground hover:text-primary"
          >
            Contribute
          </a>
        </nav>
      </div>

      <div className="flex items-center gap-3">
        <button className="p-1.5 hover:bg-muted rounded-md">
          <Info className="size-5 text-muted-foreground" />
        </button>
        <button className="p-1.5 hover:bg-muted rounded-md">
          <MessageCircle className="size-5 text-muted-foreground" />
        </button>
        <button className="p-1.5 hover:bg-muted rounded-md">
          <FileText className="size-5 text-muted-foreground" />
        </button>
        <div className="flex items-center gap-1 px-2 py-1 hover:bg-muted rounded-md cursor-pointer">
          <Avatar className="size-6">
            <AvatarFallback className="text-xs">U</AvatarFallback>
          </Avatar>
        </div>
        <button className="p-1.5 hover:bg-muted rounded-md">
          <Grid3X3 className="size-5 text-muted-foreground" />
        </button>
      </div>
    </header>
  );
}
