import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Menu } from "lucide-react"
import { Button } from "../ui/button"
export default function UserMenu(){
  return(
    <Popover>
      <PopoverTrigger
  render={
    <Button
      variant="ghost"
      size="icon"
      type="button"
      className="flex size-10 shrink-0
       cursor-pointer items-center justify-center rounded-full"
      aria-label="Open user menu"
    >
      <Menu aria-hidden="true" className="size-5" />
    </Button>
  }
/>
      <PopoverContent align="end" sideOffset={8} className="w-54">
        <h1>abebe</h1>
      </PopoverContent>
    </Popover>
  )
}