import { Button } from "../ui/button";
import { CircleUserRound } from "lucide-react";
export default function ProfileMenu() {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="size-10 shrink-0 cursor-pointer rounded-full"
      aria-label="Personal information"
    >
      <CircleUserRound
        aria-hidden="true"
        className="size-5"
      />
    </Button>
  );
}
