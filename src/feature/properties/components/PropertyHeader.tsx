import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
interface PropertyHeaderParams {
    title: string;
    city: string;
    neighborhood?: string;
}
export default function PropertyHeader({title, city, neighborhood}: PropertyHeaderParams){
    const navigate = useNavigate();
    const handleShowAll = () => {
        navigate({
            to: "/properties",
            search: {
                city,
                neighborhood
            }
        });
    }
    return(
    <div className="w-full flex items-center justify-between">
        <div className="w-full flex items-center justify-between md:justify-start gap-2.5">
        <h1 className="text-[20px] leading-[24px] font-semibold tracking-tight text-[#222222]">{title}</h1>
        <Button 
          type="button"
          variant="outline"
          onClick={handleShowAll}
          className="size-7 shrink-0 cursor-pointer rounded-full bg-[#EBEBEB] border-none ring-0 flex items-center justify-center">
            <ArrowRight className="h-4 w-4" />
          </Button>
          </div>
    </div>
    );
}