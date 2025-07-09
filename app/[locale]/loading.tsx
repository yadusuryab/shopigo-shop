// import { Spinner } from "@/components/ui/spinner";
import { DotLoader } from "@/components/dot-loader";

const game = [
    [14, 7, 0, 8, 6, 13, 20],
    [14, 7, 13, 20, 16, 27, 21],
    [14, 20, 27, 21, 34, 24, 28],
    [27, 21, 34, 28, 41, 32, 35],
    [34, 28, 41, 35, 48, 40, 42],
    [34, 28, 41, 35, 48, 42, 46],
    [34, 28, 41, 35, 48, 42, 38],
    [34, 28, 41, 35, 48, 30, 21],
    [34, 28, 41, 48, 21, 22, 14],
    [34, 28, 41, 21, 14, 16, 27],
    [34, 28, 21, 14, 10, 20, 27],
    [28, 21, 14, 4, 13, 20, 27],
    [28, 21, 14, 12, 6, 13, 20],
    [28, 21, 14, 6, 13, 20, 11],
    [28, 21, 14, 6, 13, 20, 10],
    [14, 6, 13, 20, 9, 7, 21],
];


export default async function LoadingPage() {
  // const t = await getTranslations()
  
  return (
   <div className="flex flex-col items-center justify-center min-h-screen">
     <div className="flex items-center gap-5 rounded bg-background px-4 py-3 text-foreground">
    <div className="">
        <DotLoader
            frames={game}
            className="gap-0.5"
            dotClassName="bg-foreground/15 [&.active]:bg-foreground size-1.5"></DotLoader>
    </div>
   <div>
   <p className="font-bold">Loading Your Experience.</p>
   <span className="font-semibold text-muted-foreground">Powered By Shopigo.</span>
   </div>
</div>
   </div>
  );
}
