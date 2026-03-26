"use client";

import { createContext, useContext, useReducer, ReactNode } from "react";
import { Product } from "@/data/products";

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
  customText?: string;
}

export interface CartState {
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
}

type CartAction =
  | {
      type: "ADD_ITEM";
      payload: {
        product: Product;
        quantity: number;
        selectedColor?: string;
        selectedSize?: string;
        customText?: string;
      };
    }
  | { type: "REMOVE_ITEM"; payload: string }
  | {
      type: "UPDATE_QUANTITY";
      payload: { productId: string; quantity: number };
    }
  | { type: "UPDATE_CUSTOMIZATION"; payload: { productId: string; customText?: string; selectedColor?: string; selectedSize?: string } }
  | { type: "CLEAR_CART" };

const TAX_RATE = 0.08875; // 8.875% NY tax
const FREE_SHIPPING_THRESHOLD = 500;
const SHIPPING_COST = 9.99;

const calculateTotals = (items: CartItem[]) => {
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const tax = Math.round(subtotal * TAX_RATE * 100) / 100;
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const total = Math.round((subtotal + tax + shipping) * 100) / 100;

  return { subtotal, tax, shipping, total };
};

const initialState: CartState = {
  items: [],
  subtotal: 0,
  tax: 0,
  shipping: 0,
  total: 0,
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  let newItems: CartItem[];

  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = state.items.find(
        (item) =>
          item.product.id === action.payload.product.id &&
          item.selectedColor === action.payload.selectedColor &&
          item.selectedSize === action.payload.selectedSize &&
          item.customText === action.payload.customText
      );

      if (existingItem) {
        newItems = state.items.map((item) =>
          item.product.id === action.payload.product.id &&
          item.selectedColor === action.payload.selectedColor &&
          item.selectedSize === action.payload.selectedSize &&
          item.customText === action.payload.customText
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      } else {
        newItems = [
          ...state.items,
          {
            product: action.payload.product,
            quantity: action.payload.quantity,
            selectedColor: action.payload.selectedColor,
            selectedSize: action.payload.selectedSize,
            customText: action.payload.customText,
          },
        ];
      }
      break;
    }

    case "REMOVE_ITEM": {
      newItems = state.items.filter((item) => item.product.id !== action.payload);
      break;
    }

    case "UPDATE_QUANTITY": {
      if (action.payload.quantity <= 0) {
        newItems = state.items.filter(
          (item) => item.product.id !== action.payload.productId
        );
      } else {
        newItems = state.items.map((item) =>
          item.product.id === action.payload.productId
            ? { ...item, quantity: action.payload.quantity }
            : item
        );
      }
      break;
    }

    case "UPDATE_CUSTOMIZATION": {
      newItems = state.items.map((item) =>
        item.product.id === action.payload.productId
          ? {
              ...item,
              customText: action.payload.customText ?? item.customText,
              selectedColor: action.payload.selectedColor ?? item.selectedColor,
              selectedSize: action.payload.selectedSize ?? item.selectedSize,
            }
          : item
      );
      break;
    }

    case "CLEAR_CART": {
      newItems = [];
      break;
    }

    default:
      return state;
  }

  const totals = calculateTotals(newItems);

  return {
    items: newItems,
    ...totals,
  };
};

interface CartContextType {
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  addItem: (
    product: Product,
    quantity: number,
    selectedColor?: string,
    selectedSize?: string,
    customText?: string
  ) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  updateCustomization: (
    productId: string,
    customText?: string,
    selectedColor?: string,
    selectedSize?: string
  ) => void;
  clearCart: () => void;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addItem = (
    product: Product,
    quantity: number,
    selectedColor?: string,
    selectedSize?: string,
    customText?: string
  ) => {
    dispatch({
      type: "ADD_ITEM",
      payload: { product, quantity, selectedColor, selectedSize, customText },
    });
  };

  const removeItem = (productId: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: productId });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { productId, quantity } });
  };

  const updateCustomization = (
    productId: string,
    customText?: string,
    selectedColor?: string,
    selectedSize?: string
  ) => {
    dispatch({
      type: "UPDATE_CUSTOMIZATION",
      payload: { productId, customText, selectedColor, selectedSize },
    });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

  const value: CartContextType = {
    state,
    dispatch,
    addItem,
    removeItem,
    updateQuantity,
    updateCustomization,
    clearCart,
    itemCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
