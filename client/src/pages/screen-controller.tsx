import { ReactNode, useContext } from "react";
import ConfirmRideScreen from "./confirm-ride-screen";
import ErrorScreen from "./error-screen";
import EstimateRideScreen from "./estimate-ride-screen";
import GetRidesScreen from "./get-rides-screen";
import LoadingScreen from "./loading-screen";
import { ScreenSwitcherContext } from "@/contexts/sreen-switcher-context";

export default function ScreenController(): ReactNode {
  const switch_screen_context = useContext(ScreenSwitcherContext);

  // Mapeia os nomes das telas para os componentes correspondentes
  const screens_map: Record<string, ReactNode> = {
    estimate: <EstimateRideScreen />,
    confirm: <ConfirmRideScreen />,
    get: <GetRidesScreen />,
    loading: <LoadingScreen />,
    error: <ErrorScreen />,
  };

  // Mapeia os nomes das telas para os títulos correspondentes
  const titles_map: Record<string, string> = {
    estimate: "Solicitar Viagem",
    confirm: "Opções de Viagens",
    get: "Histórico de Viagens",
    loading: "Carregando...",
    error: "Algo Deu Errado!",
  };

  return (
    <>
      <h1 className="w-[70rem] text-4xl font-bold text-start">
        {titles_map[switch_screen_context.show_screen]}
      </h1>
      {screens_map[switch_screen_context.show_screen]}
    </>
  );
}
