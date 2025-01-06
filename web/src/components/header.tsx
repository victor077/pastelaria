import { CoffeeIcon, FileClockIcon, UtensilsCrossedIcon } from "lucide-react";
import { Logo } from "./logo";
import { useViewClient } from "@/hooks/useViewClient";

export function Header() {
  const setView = useViewClient((state) => state.setView);
  return (
    <header className="w-full h-16 bg-primary items-center flex justify-between px-8 fixed top-0 z-50 ">
      <Logo />
      <nav className="flex gap-4 items-center">
        <div
          className="flex gap-2 text-white hover:bg-red-700 py-2 px-3 border-0 rounded-md cursor-pointer"
          onClick={() => setView("customer")}
        >
          <CoffeeIcon />
          <span>Caixa</span>
        </div>
        <div
          className="flex gap-2 text-white hover:bg-red-700 py-2 px-3 border-0 rounded-md cursor-pointer"
          onClick={() => setView("kitchen")}
        >
          <UtensilsCrossedIcon />
          <span>Cozinha</span>
        </div>
        <div
          className="flex gap-2 text-white hover:bg-red-700 py-2 px-3 border-0 rounded-md cursor-pointer"
          onClick={() => setView("history")}
        >
          <FileClockIcon />
          <span>Historico</span>
        </div>
      </nav>
    </header>
  );
}
