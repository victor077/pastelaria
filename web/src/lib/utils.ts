import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function translateToPortuguese(word: string): string {
  const dictionary: { [key: string]: string } = {
    CHEESE: "QUEIJO",
    MEAT: "CARNE",
    CHICKEN: "FRANGO",
    PIZZA: "PIZZA",
    PALM_HEART: "PALMITO",
    BAURU: "BAURU",
    SHRIMP: "CAMARÃO",
  };

  return dictionary[word.toUpperCase()] || "Tradução não encontrada";
}