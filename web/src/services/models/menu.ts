export type ResponseMenuDTO = {
  availableMenu: MenuItem[]
};

export type MenuPastries =
  | "CHEESE"
  | "MEAT"
  | "CHICKEN"
  | "PIZZA"
  | "PALM_HEART"
  | "BAURU"
  | "SHRIMP";


  export interface MenuItem {
    flavor: MenuPastries;
    unitPrice: number;
    description: string;
  }

  export interface CartItem {
    flavor: string;
    unitPrice: number;
    description: string;
    quantity: number
  }