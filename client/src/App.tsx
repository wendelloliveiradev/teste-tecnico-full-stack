import "./App.css";
import { ScreenSwitcherProvider } from "./contexts/screen-switcher-provider";
import ScreenController from "./pages/screen-controller";

function App() {
  return (
    <main className="flex flex-col gap-4 w-full h-full justify-center items-center">
      <ScreenSwitcherProvider>
        <ScreenController />
      </ScreenSwitcherProvider>
    </main>
  );
}

export default App;
