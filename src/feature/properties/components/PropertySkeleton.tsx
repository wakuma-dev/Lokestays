import { Skeleton } from "@/components/ui/skeleton"
export default function PropertySkeleton(){
    return(
        <div className="space-y-3">
            <div className="flex flex-col gap-2">
                <div className="w-full flex justify-between">
                <div className="w-full flex items-center md:justify-start justify-between gap-2.5">
                    <Skeleton className="w-full max-w-3/4 md:max-w-44 h-7" />
                    <Skeleton className="h-7 w-7 rounded-full" />
                </div>
                <div className="hidden items-center gap-2 lg:flex">
                    <Skeleton className="w-7 h-7 rounded-full" />
                    <Skeleton className="w-7 h-7 rounded-full" />
                </div>
              </div>
                <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    {Array.from({length: 7}).map((_, index) => (
                        <Skeleton
                           key={index}
                           className="aspect-square w-[calc(50%_-_0.375rem)] shrink-0 snap-start rounded-xl sm:w-48"
                           />
                    ))}
                 </div>
            </div>
              <div className="flex flex-col gap-2">
                <div className="w-full flex justify-between">
                <div className="w-full flex items-center md:justify-start justify-between gap-2.5">
                    <Skeleton className="w-full max-w-3/4 md:max-w-44 h-7" />
                    <Skeleton className="h-7 w-7 rounded-full" />
                </div>
                <div className="hidden items-center gap-2 lg:flex">
                    <Skeleton className="w-7 h-7 rounded-full" />
                    <Skeleton className="w-7 h-7 rounded-full" />
                </div>
                </div>
                  <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    {Array.from({length: 7}).map((_, index) => (
                        <Skeleton
                           key={index}
                           className="aspect-square w-[calc(50%_-_0.375rem)] shrink-0 snap-start rounded-xl sm:w-48"
                           />
                    ))}
                 </div>
            </div>
        </div>
    )
}