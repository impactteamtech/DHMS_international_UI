import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the type for a single cart item
interface CartItem {
  id: number;
  name: string;
  price: number;
  totalPrice: number;
  quantity: number;
  image: string;
  description: string;
  category: string;
  rating: number;
}

// Define the type for the cart state
interface CartState {
  itemsList: CartItem[];
  totalQuantity: number;
  showCart: boolean;
}

// Initial state with type
const initialState: CartState = {
  itemsList: [],
  totalQuantity: 0,
  showCart: false,
};

// Create the cart slice with proper types
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      const newItem = action.payload;
      const existingItem = state.itemsList.find((item) => item.id === newItem.id);
      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.quantity * existingItem.price;
      } else {
        state.itemsList.push({
          ...newItem,
          quantity: 1,
          totalPrice: newItem.price,
        });
      }
      const totalQuantity = state.itemsList.reduce((total, item) => total + item.quantity, 0);
      state.totalQuantity = totalQuantity;
    },
    removeFromCart(state, action: PayloadAction<{ id: number }>) {
      const findItem = state.itemsList.find((item) => item.id === Number(action.payload.id));
      if (findItem) {
        if (findItem.quantity === 1) {
          state.itemsList = state.itemsList.filter((item) => item.id !== Number(action.payload.id));
        } else {
          findItem.quantity--;
          findItem.totalPrice -= findItem.price;
        }
      }
      const totalQuantity = state.itemsList.reduce((total, item) => total + item.quantity, 0);
      state.totalQuantity = totalQuantity;

    },
    updateQty: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
        const item = state.itemsList.find((i) => i.id === action.payload.id);
        if (item) {
          item.quantity = action.payload.quantity;
        }
        const totalQuantity = state.itemsList.reduce((total, item) => total + item.quantity, 0);
        state.totalQuantity = totalQuantity;
      },
    setShowCart(state) {
      state.showCart = !state.showCart;
    },
  },
});

// Export actions and reducer
export const { addToCart, removeFromCart, updateQty, setShowCart } = cartSlice.actions;
export default cartSlice.reducer;