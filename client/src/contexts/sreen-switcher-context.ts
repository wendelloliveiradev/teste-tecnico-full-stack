import { ScreenSwitcherContextType } from "@/lib/definitions";
import { createContext } from "react";
  
// Contexto para controlar a troca de telas e compartilhar informações entre os componentes
export const ScreenSwitcherContext = createContext<ScreenSwitcherContextType>({
    show_screen: "estimate",
    setShowScreen: () => {},
    estimate_request: {
        customer_id: "",
        origin: "",
        destination: "",
    },
    setEstimateRequest: () => {},
    estimate_response: null,
    setEstimateResponse: () => {},
    get_rides_response: null,
    setGetRidesResponse: () => {},
    api_config: "",
    setApiConfig: () => {},
});