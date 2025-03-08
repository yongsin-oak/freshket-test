import React, { useMemo } from "react";

export interface CartProps {
  id: number;
  name: string;
  price: number;
}
export interface CartItem extends CartProps {
  quantity: number;
}

interface State {
  cart: CartItem[];
}

interface Action {
  type: string;
  item?: CartProps;
  id?: number;
  quantity?: number;
}

interface Context {
  cartContext: {
    addToCart: (item: CartProps) => void;
    removeFromCart: (id: number) => void;
    increaseQuantity: (id: number) => void;
    decreaseQuantity: (id: number) => void;
    clearCart: () => void;
    getQuantity: (id: number) => number;
  };
  state: State;
}

const initialState: State = {
  cart: [],
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
      removeFromCart: (id: number) =>
        dispatch({ type: "REMOVE_FROM_CART", id }),
      increaseQuantity: (id: number) =>
        dispatch({ type: "INCREASE_QUANTITY", id }),
      decreaseQuantity: (id: number) =>
        dispatch({ type: "DECREASE_QUANTITY", id }),
      clearCart: () => dispatch({ type: "CLEAR_CART" }),
      getQuantity: (id: number) =>
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
