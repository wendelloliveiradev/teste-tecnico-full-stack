import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingScreen() {
  return (
    <section className="flex flex-row h-[43rem] w-[70rem] gap-5 bg-white rounded-2xl border border-zinc-300 shadow-[15px_15px_15px_-15px_rgba(0,0,0,0.3)] justify-center items-center font-bold">
      <div className="flex flex-col w-1/2 h-full space-y-3 justify-center items-center">
        <Skeleton className="bg-zinc-300 h-[200px] w-[350px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="bg-zinc-300 h-4 w-[350px]" />
          <Skeleton className="bg-zinc-300 h-4 w-[300px]" />
        </div>
      </div>
      <div className="flex flex-col w-1/2 gap-4 h-full justify-center items-center">
        <Skeleton className="bg-zinc-300 w-4/5 h-1/6" />
        <Skeleton className="bg-zinc-300 w-4/5 h-1/6" />
        <Skeleton className="bg-zinc-300 w-4/5 h-1/6" />
        <Skeleton className="bg-zinc-300 w-4/5 h-1/6" />
      </div>
    </section>
  );
}
