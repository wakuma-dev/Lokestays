import type { LucideIcon } from "lucide-react";

export interface TabBarItem {
  readonly icon: LucideIcon;
  readonly label: string;
  readonly path: string;
}
