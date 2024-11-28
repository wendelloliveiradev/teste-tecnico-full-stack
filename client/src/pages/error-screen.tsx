import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

export default function ErrorScreen({ message }: { message?: string }): ReactNode {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <section className="flex flex-col bg-red-100 h-[43rem] w-[70rem] gap-5 rounded-2xl border border-zinc-300 shadow-[15px_15px_15px_-15px_rgba(0,0,0,0.3)] justify-center items-center font-bold">
      <h1 className="text-2xl font-bold mb-4">Algo Deu Errado!</h1>
      <p className="text-lg mb-6">
        {message || "Por Favor, Tente Novamente Recarregando a Página."}
      </p>
      <Button
        onClick={handleReload}
        className="w-[15rem] h-12 text-lg bg-red-500 text-white font-semibold rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
      >
        Recarregar Página
      </Button>
    </section>
  );
}
