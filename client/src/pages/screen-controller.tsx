import { ReactNode } from "react";
import ConfirmRideScreen from "./confirm-ride-screen";
import ErrorScreen from "./error-screen";
import EstimateRideScreen from "./estimate-ride-screen";
import GetRidesScreen from "./get-rides-screen";
import LoadingScreen from "./loading-screen";

type ScreenSwitcherProps = {
  screen: "estimate" | "confirm" | "get" | "loading" | "error";
};

export default function ScreenController() {
  const screen_maps: Record<string, ReactNode> = {
    estimate: <EstimateRideScreen />,
    confirm: <ConfirmRideScreen />,
    get: <GetRidesScreen />,
    loading: <LoadingScreen />,
    error: <ErrorScreen />,
  };
  const title_maps: Record<string, string> = {
    estimate: "Solicitar Viagem",
    confirm: "Opções de Viagens",
    get: "Histórico de Viagens",
    loading: "Carregando...",
    error: "Algo Deu Errado!",
  };

  return (
    <>
      <h1 className="w-[70rem] text-4xl font-bold text-start">Solicitar Viagem</h1>
      {screen_maps["get"]}
    </>
  );
}
