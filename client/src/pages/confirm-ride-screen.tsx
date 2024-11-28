import StaticMap from "@/components/maps/static-map";
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
import { Skeleton } from "@/components/ui/skeleton";
import { ScreenSwitcherContext } from "@/contexts/sreen-switcher-context";
import { drivers } from "@/data/static-data";
import { AvailableRideDriver, ConfirmRideRequest } from "@/lib/definitions";
import { useMutation } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";

type MapType = {
  api_key: string;
  polyline: string;
  origin: { latitude: number; longitude: number };
  destination: { latitude: number; longitude: number };
};

// Componente principal da tela de confirmação de viagem
export default function ConfirmRideScreen() {
  const [available_drivers, setAvailableDrivers] = useState<AvailableRideDriver[]>([]);
  const [map_params, setMapParams] = useState<MapType | null>(null);
  const screen_context = useContext(ScreenSwitcherContext);

  useEffect(() => {
    const temp_drivers: AvailableRideDriver[] = [];

    if (!screen_context.estimate_response) return;
    screen_context.estimate_response?.options?.forEach((option) => {
      const driver: AvailableRideDriver = {
        id: option.id,
        name: option.name,
        description: option.description,
        rating: `${option.review.rating.toString()}/5`,
        review: option.review.comment,
        pic_src: drivers.find((driver) => driver.name === option.name)?.pic_src || "",
        car: option.vehicle,
        value: option.value,
      };

      temp_drivers.push(driver);
    });

    setMapParams({
      api_key: screen_context.api_config,
      polyline: screen_context.estimate_response.routeResponse.routes[0].polyline.encodedPolyline,
      origin: screen_context.estimate_response.origin,
      destination: screen_context.estimate_response.destination,
    });

    setAvailableDrivers(temp_drivers || []);
  }, [screen_context.estimate_response, screen_context.api_config]);

  return (
    <section className="flex h-[43rem] w-[70rem] bg-zinc-100 rounded-2xl border border-zinc-300 shadow-[15px_15px_15px_-15px_rgba(0,0,0,0.3)] justify-center items-center font-bold">
      <div className="flex h-full w-1/2 rounded-s-2xl items-center">
        <div className="w-full h-[400px] bg-green-300 m-2 rounded-2xl">
          {map_params ? (
            <StaticMap
              apiKey={map_params.api_key}
              polyline={map_params.polyline}
              origin={map_params.origin}
              destination={map_params.destination}
            />
          ) : (
            <Skeleton className="w-full h-full bg-zinc-300 rounded-2xl" />
          )}
        </div>
      </div>
      <div className="flex flex-col h-full gap-2 w-1/2 rounded-e-2xl py-4">
        {available_drivers.length === 0 ? (
          <div className="flex h-full w-full justify-center items-center">
            <h1 className="text-4xl">Nenhum Motorista disponível para esta viagem!</h1>
          </div>
        ) : (
          <ScrollArea>
            <div className="flex flex-col h-full w-full gap-2 rounded-e-2xl justify-center items-center">
              {available_drivers.map((driver: AvailableRideDriver) => (
                <DriversCard key={driver.id} driver={driver} />
              ))}
            </div>
          </ScrollArea>
        )}
      </div>
    </section>
  );
}

// Componente do cartão de motorista com viagens disponíveis
function DriversCard({ driver }: { driver: AvailableRideDriver }) {
  const screen_context = useContext(ScreenSwitcherContext);
  const mutation = useMutation({
    mutationFn: async (confirm_data: ConfirmRideRequest) => {
      const response = await fetch(`http://127.0.0.1:8080/ride/confirm`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(confirm_data),
      });

      return await response.json();
    },
    onSuccess: () => {
      screen_context.setShowScreen("get");
    },
    onError: (error) => {
      screen_context.setShowScreen("error");
      console.error("An error occurred while confirming the ride", error);
    },
  });

  const hadleConfimeRide = () => {
    screen_context.setShowScreen("loading");

    const data: ConfirmRideRequest = {
      customer_id: screen_context.estimate_request.customer_id,
      origin: screen_context.estimate_request.origin,
      destination: screen_context.estimate_request.destination,
      distance: screen_context.estimate_response?.distance || 0,
      duration: screen_context.estimate_response?.duration || "0",
      driver: {
        id: driver.id,
        name: driver.name,
      },
      value: driver.value ?? 0,
    };

    mutation.mutate(data);
  };

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
            <Button
              className="w-[85%] bg-green-400 text-base text-black font-bold border border-green-600 hover:bg-green-500"
              onClick={() => hadleConfimeRide()}
            >
              {new Intl.NumberFormat("pt-br", { style: "currency", currency: "BRL" }).format(
                driver.value
              )}{" "}
              - Escolher
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
