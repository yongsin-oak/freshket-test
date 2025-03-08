import React, { useMemo } from "react";

interface CartProps {
  id: string;
  name: string;
  price: number;
}
interface CartItem extends CartProps {
  quantity: number;
}

interface State {
  cart: CartItem[];
  isLoading: boolean;
}

interface Action {
  type: string;
  item?: CartProps;
  id?: string;
  quantity?: number;
}

interface Context {
  cartContext: {
    addToCart: (item: CartProps) => void;
    removeFromCart: (id: string) => void;
    increaseQuantity: (id: string) => void;
    decreaseQuantity: (id: string) => void;
    clearCart: () => void;
    getQuantity: (id: string) => number;
  };
  state: State;
}

const initialState: State = {
  cart: [],
  isLoading: false,
};

const CartContext = React.createContext<Context | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = React.useReducer((state: State, action: Action) => {
    switch (action.type) {
      case "ADD_TO_CART": {
        const existingItem = state.cart.find(
          (item) => item.id === action.item!.id
        );
        if (existingItem) {
          return {
            ...state,
            cart: state.cart.map((item) =>
              item.id === action.item!.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          };
        }
        return {
          ...state,
          cart: [...state.cart, { ...action.item!, quantity: 1 }],
        };
      }
      case "REMOVE_FROM_CART":
        return {
          ...state,
          cart: state.cart.filter((item) => item.id !== action.id),
        };
      case "INCREASE_QUANTITY":
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      case "DECREASE_QUANTITY":
        return {
          ...state,
          cart: state.cart
            .map((item) =>
              item.id === action.id
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
            .filter((item) => item.quantity > 0),
        };
      case "CLEAR_CART":
        return { ...state, cart: [] };
      default:
        return state;
    }
  }, initialState);

  const cartContext = useMemo(
    () => ({
      addToCart: (item: CartProps) => dispatch({ type: "ADD_TO_CART", item }),
      removeFromCart: (id: string) =>
        dispatch({ type: "REMOVE_FROM_CART", id }),
      increaseQuantity: (id: string) =>
        dispatch({ type: "INCREASE_QUANTITY", id }),
      decreaseQuantity: (id: string) =>
        dispatch({ type: "DECREASE_QUANTITY", id }),
      clearCart: () => dispatch({ type: "CLEAR_CART" }),
      getQuantity: (id: string) =>
        state.cart.find((item) => item.id === id)?.quantity || 0,
    }),
    [state.cart]
  );

  return (
    <CartContext.Provider value={{ cartContext, state }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): Context => {
  const context = React.useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
