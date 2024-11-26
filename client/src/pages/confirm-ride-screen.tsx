import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Driver, drivers } from "@/data/static-data";

export default function ConfirmRideScreen() {
  return (
    <section className="flex h-[43rem] w-[70rem] bg-zinc-100 rounded-2xl border border-zinc-300 shadow-[15px_15px_15px_-15px_rgba(0,0,0,0.3)] justify-center items-center font-bold">
      <div className="flex h-full w-1/2 rounded-s-2xl items-center">
        <div className="w-full h-[400px] bg-green-300 m-2 rounded-2xl">
          <img className="w-full h-full object-cover" src="/unnamed.png" alt="map" />
        </div>
      </div>
      <div className="flex flex-col h-full gap-2 w-1/2 rounded-e-2xl py-4">
        <ScrollArea>
          <div className="flex flex-col h-full w-full gap-2 rounded-e-2xl justify-center items-center">
            {drivers.map((driver: Driver) => (
              <DriversCard key={driver.id} driver={driver} />
            ))}
          </div>
        </ScrollArea>
      </div>
    </section>
  );
}

function DriversCard({ driver }: { driver: Driver }) {
  return (
    <Card className="flex flex-col w-[90%] h-[13.5rem] rounded-xl border">
      <CardHeader className="flex flex-row h-1/3 p-0 py-1 px-3 space-y-0 gap-2 items-start rounded-t-xl">
        <div className="flex h-[60px] w-[60px] bg-zinc-400 rounded-full">
          <img
            className="w-full h-full object-fit rounded-full"
            src={driver.pic_src}
            alt="driver profile"
          />
        </div>
        <div className="flex flex-col w-[87%] h-full items-start">
          <CardTitle className="text-sm">{driver.name}</CardTitle>
          <CardDescription className="text-xs font-light text-start text-zinc-700">
            {driver.description}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex h-1/3 p-0 justify-center items-center">
        <div className="flex flex-col h-[90%] w-[90%] p-1 bg-zinc-200 rounded-lg">
          <div className="flex gap-1">
            <img className="w-[14px]" src="/star.svg" alt="star" />
            <span className="text-xs">{driver.rating}</span>
          </div>
          <div className="flex text-sm text-start font-light line-clamp-2">{driver.review}</div>
        </div>
      </CardContent>
      <CardFooter className="flex h-1/3 rounded-b-xl p-0 px-3 justify-start items-center">
        <img className="w[50px] h-[35px]" src="/car.jpg" alt="car" />
        <div className="flex w-full">
          <span className="flex h-full w-1/3 px-2 text-xs text-start font-normal">
            {driver.car}
          </span>
          <div className="flex h-full w-2/3 justify-center">
            <Button className="w-[85%] bg-green-400 text-base text-black font-bold border border-green-600 hover:bg-green-500">
              {driver.value} - Escolher
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
