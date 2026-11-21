import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
export default function ProfileSkeleton() {
  return (
    <main className="mx-auto min-h-screen h-auto w-full max-w-4xl bg-white px-4 py-8 md:pt-36">
      <div aria-hidden="true" className="flex flex-col gap-4">
         <div className="flex flex-col gap-3">
          <div className="flex w-full flex-1 flex-col items-center gap-8 lg:flex-row lg:items-stretch">
            <div className="flex w-full flex-col items-center gap-4 lg:w-[400px] lg:items-start">
              <div className="flex items-center gap-2.5">
                <Skeleton className="h-9 w-36" />
                <Skeleton className="h-6 w-10" />
              </div>

              <Card className="w-full overflow-hidden border border-black/5 bg-white shadow-[0_0_16px_rgba(0,0,0,0.08)] lg:w-[400px]">
                <CardContent className="flex w-full flex-col items-center justify-center gap-2.5 p-4">
                  <Skeleton className="size-24 rounded-full" />

                  <div className="flex min-w-0 flex-1 flex-col items-center space-y-1">
                    <Skeleton className="h-9 w-48" />
                    <Skeleton className="h-4 w-10" />
                  </div>
                </CardContent>
              </Card>
            </div>

            
            <div className="hidden max-w-xs flex-col justify-center gap-2.5 lg:flex">
              <Skeleton className="h-[26px] w-48" />

              <div className="space-y-1.5">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-11/12" />
                <Skeleton className="h-4 w-3/4" />
              </div>

              <Skeleton className="h-9 w-28 rounded-md" />
            </div>
          </div>

          <div className="mt-4 hidden border border-b lg:block dark:border-[#CDC6B9]" />
        </div>


        <div className="flex flex-col gap-1.5 rounded-md border border-black/5 bg-white p-4 shadow-[0_0_16px_rgba(0,0,0,0.08)]">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-4 w-64 max-w-full" />
        </div>

        
        <section className="lg:py-2">
          <Card className="border-0 shadow-none ring-0">
            <CardHeader>
              <Skeleton className="h-[30px] w-52" />
            </CardHeader>

            <CardContent className="flex flex-col space-y-4">
              {/* Legal Name */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-[18px] w-40" />
                </div>

                <Skeleton className="h-5 w-8 shrink-0" />
              </div>

              <Separator />

              {/* Email */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Skeleton className="h-5 w-28" />
                  <Skeleton className="h-[18px] w-52" />
                </div>

                <Skeleton className="h-5 w-8 shrink-0" />
              </div>

              <Separator />

              {/* Phone Number */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Skeleton className="h-5 w-28" />
                  <Skeleton className="h-[18px] w-32" />
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}


