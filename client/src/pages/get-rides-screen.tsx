import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScreenSwitcherContext } from "@/contexts/sreen-switcher-context";
import { drivers } from "@/data/static-data";
import { RidesOptions } from "@/lib/definitions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Componente principal da tela de histórico de viagens
export default function GetRidesScreen() {
  const [history, setHistory] = useState<RidesOptions[]>([]);
  const screen_context = useContext(ScreenSwitcherContext);

  useEffect(() => {
    try {
      const temp_history: RidesOptions[] = [];
      if (Array.isArray(screen_context.get_rides_response?.rides)) {
        screen_context.get_rides_response.rides.forEach((option) => {
          const ride: RidesOptions = {
            id: option.id,
            date: option.date,
            origin: option.origin,
            destination: option.destination,
            distance: option.distance,
            duration: option.duration,
            driver: {
              id: option.driver.id,
              name: option.driver.name,
            },
            value: option.value,
          };

          temp_history.push(ride);
        });

        setHistory(temp_history);
      }
    } catch (error) {
      console.log("Error fetching data", error);
    }
  }, [screen_context.get_rides_response]);

  return (
    <section className="flex h-[43rem] w-[70rem] bg-zinc-100 rounded-2xl border border-zinc-300 shadow-[15px_15px_15px_-15px_rgba(0,0,0,0.3)] justify-center items-center font-bold">
      <div className="flex h-full w-1/2 rounded-s-2xl justify-center items-center">
        <FilterRidesForm />
      </div>
      <div className="flex h-full w-1/2 py-2">
        {history.length === 0 ? (
          <div className="flex flex-col h-full w-full justify-center items-center">
            <h1 className="text-4xl">Nenhuma viagem encontrada!</h1>
            <h2 className="text-3xl text-zinc-500">
              Utilize o Formulário ao lado para buscar viagens.
            </h2>
          </div>
        ) : (
          <ScrollArea>
            <div className="flex flex-col h-fit w-full gap-2 ps-6 rounded-e-2xl justify-center items-center">
              {history.map((element: RidesOptions, index) => (
                <HistoryCard key={index} element={element} />
              ))}
            </div>
          </ScrollArea>
        )}
      </div>
    </section>
  );
}

// Componente de formulário de filtro de viagens
function FilterRidesForm() {
  const screen_context = useContext(ScreenSwitcherContext);
  const queryClient = useQueryClient();

  const formSchema = z.object({
    customer_id: z.string().min(1, {
      message: "ID do usuário não pode estar em branco.",
    }),
    driver_id: z.string().min(1, {
      message: "Nome do motorista não pode estar em branco.",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customer_id: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    screen_context.setShowScreen("loading");
    try {
      const response_data = await queryClient.fetchQuery({
        queryKey: ["get_rides"],
        queryFn: async () => {
          const url =
            values.driver_id !== "-1"
              ? `http://127.0.0.1:8080/ride/${values.customer_id}?driver_id=${values.driver_id}`
              : `http://127.0.0.1:8080/ride/${values.customer_id}`;

          const response = await fetch(url, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });

          return await response.json();
        },
      });

      screen_context.setGetRidesResponse(response_data);
      screen_context.setShowScreen("get");
    } catch (error) {
      screen_context.setShowScreen("error");
      console.error("Error fetching data:", error);
    }
  };

  return (
    <Card className="flex w-[90%] h-4/5 bg-white justify-center items-center">
      <CardContent className="flex h-fit w-full pt-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col w-full space-y-8 justify-start"
          >
            <FormField
              control={form.control}
              name="customer_id"
              render={({ field }) => (
                <FormItem className="flex flex-col justify-start">
                  <FormLabel className="w-fit">ID do Usuário:</FormLabel>
                  <FormControl>
                    <Input
                      className="placeholder:text-zinc-300 focus-visible:ring-emerald-400"
                      placeholder="Insira o id do usuário"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="driver_id"
              render={({ field }) => (
                <FormItem className="flex flex-col justify-start">
                  <FormLabel className="w-fit">Selecionar Motorista:</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="focus:ring-emerald-400">
                        <SelectValue placeholder="Selecione um motorista" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Escolha um Motorista</SelectLabel>
                        <SelectItem value={"-1"}>Todos os Motoristas</SelectItem>
                        {drivers.map((driver) => (
                          <SelectItem key={driver.id} value={driver.id.toString()}>
                            {driver.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="bg-green-400 text-lg text-black font-bold border border-green-600 hover:bg-green-500"
              type="submit"
            >
              Aplicar Filtros
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

function HistoryCard({ element }: { element: RidesOptions }) {
  return (
    <Card className="flex flex-col w-[31.4rem] h-[13.5rem] rounded-xl border">
      <CardHeader className="flex flex-row h-[30%] p-0 py-1 px-3 space-y-0 gap-2 items-start rounded-t-xl">
        <div className="flex h-[50px] w-[50px] bg-zinc-400 rounded-full">
          <img
            className="w-full h-full object-fit rounded-full"
            src={drivers.find((driver) => driver.id === element.driver.id)?.pic_src ?? ""}
            alt="driver profile"
          />
        </div>
        <div className="flex w-[87%] h-full items-center justify-between">
          <CardTitle className="text-base font-bold">{element.driver.name}</CardTitle>
          <div className="h-fit text-sm">
            {new Date(element.date.replace(" ", "T")).toLocaleString("pt-BR").replace(",", " -")}
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex h-[45%] p-0 justify-center items-center">
        <div className="flex flex-col h-full w-[90%] p-1 bg-zinc-200 rounded-lg justify-center items-start">
          <span className="h-fit font-bold text-xs">Origem:</span>
          <p className="w-full h-fit text-sm text-start font-light line-clamp-1">
            {element.origin}
          </p>
          <span className="h-fit font-bold text-xs">Destino:</span>
          <p className="w-full h-fit text-sm text-start font-light line-clamp-1">
            {element.destination}
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex h-1/4 rounded-b-xl p-0 px-3 text-sm justify-between items-center">
        <span>Distância: {new Intl.NumberFormat("pt-BR").format(element.distance / 1000)} KM</span>
        <span>Tempo: {Math.round(+element.duration.replace("s", "") / 60)} min</span>
        <span>
          Valor:{" "}
          {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
            element.value
          )}
        </span>
      </CardFooter>
    </Card>
  );
}
