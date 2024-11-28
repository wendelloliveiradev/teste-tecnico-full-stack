import { useState } from "react";
import { ScreenSwitcherContext } from "./sreen-switcher-context";
import {
  EstimateRideFormValues,
  EstimateRideResponse,
  RideHistoryResponse,
  ScreenSwitcherContextType,
  ScreenSwitcherProps,
} from "@/lib/definitions";

// Componente para controlar a troca de telas e compartilhar informações entre os componentes
export function ScreenSwitcherProvider({ children }: { children: React.ReactNode }) {
  const [show_screen, setShowScreen] = useState<ScreenSwitcherProps>(
    "estimate" as ScreenSwitcherProps
  );
  const [estimate_request, setEstimateRequest] = useState<EstimateRideFormValues>({
    customer_id: "",
    origin: "",
    destination: "",
  });
  const [estimate_response, setEstimateResponse] = useState<EstimateRideResponse | null>(null);
  const [get_rides_response, setGetRidesResponse] = useState<RideHistoryResponse | null>(null);
  const [api_config, setApiConfig] = useState<string>("");

  const provided_value: ScreenSwitcherContextType = {
    show_screen,
    setShowScreen,
    estimate_request,
    setEstimateRequest,
    estimate_response,
    setEstimateResponse,
    get_rides_response,
    setGetRidesResponse,
    api_config,
    setApiConfig,
  };

  return (
    <ScreenSwitcherContext.Provider value={provided_value}>
      {children}
    </ScreenSwitcherContext.Provider>
  );
}
