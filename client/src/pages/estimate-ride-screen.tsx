import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function EstimateRideScreen() {
  return (
    <section className="flex h-4/5 w-[55%] bg-zinc-100 rounded-2xl border border-zinc-300 shadow-[15px_15px_15px_-15px_rgba(0,0,0,0.3)] justify-center items-center font-bold">
      <div className="flex h-full w-3/5 rounded-s-2xl justify-center items-center">
        <EstimateRideForm />
      </div>
      <div className="flex h-full w-2/5 rounded-e-2xl justify-end">
        <img className="rounded-e-2xl" src="/hero-image.webp" alt="hero image" />
      </div>
    </section>
  );
}

function EstimateRideForm() {
  const formSchema = z.object({
    customer_id: z.string().min(1, {
      message: "ID do usuário não pode estar em branco.",
    }),
    origin: z.string().min(1, {
      message: "Origem não pode estar em branco.",
    }),
    destination: z.string().min(1, {
      message: "Destino não pode estar em branco.",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customer_id: "",
      origin: "",
      destination: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
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
                    <Input placeholder="Insira o id do usuário" {...field} />
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
                    <Input placeholder="Insira o endereço de origem" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="customer_id"
              render={({ field }) => (
                <FormItem className="flex flex-col justify-start">
                  <FormLabel className="w-fit">Endereço de Destino:</FormLabel>
                  <FormControl>
                    <Input placeholder="Insira o endereço de destino" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Estimar Valor</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
