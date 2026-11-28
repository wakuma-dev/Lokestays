import { Skeleton } from "@/components/ui/skeleton";
export default function ProfileDetailsSkeleton(){
    return(
        <div className="mx-auto min-h-screen w-full max-w-6xl px-0 pt-28 sm:px-4 sm:pt-40">
            <div className="hidden md:block">
                <Skeleton className="h-8 w-96" />
            </div>
        </div>
    )
}