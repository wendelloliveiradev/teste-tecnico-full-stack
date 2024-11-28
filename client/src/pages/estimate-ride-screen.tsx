import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScreenSwitcherContext } from "@/contexts/sreen-switcher-context";
import { EstimateRideFormValues } from "@/lib/definitions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Componente principal da tela de estimativa de viagem
export default function EstimateRideScreen() {
  return (
    <section className="flex h-[43rem] w-[70rem] bg-zinc-100 rounded-2xl border border-zinc-300 shadow-[15px_15px_15px_-15px_rgba(0,0,0,0.3)] justify-center items-center font-bold">
      <div className="flex h-full w-3/5 rounded-s-2xl justify-center items-center">
        <EstimateRideForm />
      </div>
      <div className="flex h-full w-2/5 rounded-e-2xl justify-end">
        <img className="rounded-e-2xl" src="/hero-image.webp" alt="hero image" />
      </div>
    </section>
  );
}

// Componente do formulário de estimativa de viagem
function EstimateRideForm() {
  const screen_context = useContext(ScreenSwitcherContext);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: EstimateRideFormValues) => {
      const response = await fetch(`http://127.0.0.1:8080/ride/estimate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      return await response.json();
    },
    onSuccess: (data) => {
      screen_context.setEstimateResponse(data);
      screen_context.setShowScreen("confirm");
    },
    onError: (error) => {
      screen_context.setShowScreen("error");
      console.error("An error occurred while estimating the ride", error);
    },
  });

  const formSchema = z
    .object({
      customer_id: z.string().min(1, {
        message: "ID do usuário não pode estar em branco.",
      }),
      origin: z.string().min(1, {
        message: "Endereço de origem não pode estar em branco.",
      }),
      destination: z.string().min(1, {
        message: "Endereço de destino não pode estar em branco.",
      }),
    })
    .refine((data) => data.origin !== data.destination, {
      message: "Um endereço de origem não pode ser igual ao endereço de destino.",
      path: ["destination"],
    });

  // Cria o formulário com base no schema
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customer_id: "",
      origin: "",
      destination: "",
    },
  });

  // Função de submissão do formulário
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response_data = await queryClient.fetchQuery({
        queryKey: ["api_config"],
        queryFn: async () => {
          const url = `http://127.0.0.1:8080/api/config`;

          const response = await fetch(url, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });

          return await response.json();
        },
      });

      screen_context.setApiConfig(response_data.googleApiKey);
    } catch (error) {
      screen_context.setShowScreen("error");
      console.error("Error fetching data:", error);
    }

    screen_context.setShowScreen("loading");
    screen_context.setEstimateRequest(values);
    mutation.mutate(values);
  }

  return (
    <Card className="flex w-4/5 h-4/5 bg-white justify-center items-center">
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
              name="origin"
              render={({ field }) => (
                <FormItem className="flex flex-col justify-start">
                  <FormLabel className="w-fit">Endereço de Origem:</FormLabel>
                  <FormControl>
                    <Input
                      className="placeholder:text-zinc-300 focus-visible:ring-emerald-400"
                      placeholder="Insira o endereço de origem"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="destination"
              render={({ field }) => (
                <FormItem className="flex flex-col justify-start">
                  <FormLabel className="w-fit">Endereço de Destino:</FormLabel>
                  <FormControl>
                    <Input
                      className="placeholder:text-zinc-300 focus-visible:ring-emerald-400"
                      placeholder="Insira o endereço de destino"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="bg-green-400 text-lg text-black font-bold border border-green-600 hover:bg-green-500"
              type="submit"
            >
              Estimar Valor
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
