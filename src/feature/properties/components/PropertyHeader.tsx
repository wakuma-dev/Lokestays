import { ChevronRight } from "lucide-react";
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
    <div className="w-full flex items-start justify-between">
        <h1 className="text-[20px] leading-[24px] font-medium tracking-normal text-[#222222]">{title}</h1>
        <Button 
          type="button"
          variant="outline"
          onClick={handleShowAll}
          className="size-10 shrink-0 flex items-center justify-center">
            <ChevronRight size={16} />
          </Button>
    </div>
    );
}