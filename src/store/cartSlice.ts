import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

interface CartState {
  itemsList: CartItem[];
  totalQuantity: number;
  showCart: boolean;
}
const savedCartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
const initialState: CartState = {
  itemsList: savedCartItems,
  totalQuantity: savedCartItems.reduce((total: number, item: any) => total + item.quantity, 0),
  showCart: false,
};

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
      state.totalQuantity = state.itemsList.reduce((total, item) => total + item.quantity, 0);
      localStorage.setItem('cartItems', JSON.stringify(state.itemsList));
    },

    removeFromCart(state, action: PayloadAction<{ id: number }>) {
      const findItem = state.itemsList.find((item) => item.id === Number(action.payload.id));
      if (findItem) {
        if (findItem.quantity === 1) {
          state.itemsList = state.itemsList.filter((item) => item.id !== Number(action.payload.id));
        } else {
          findItem.quantity--;
          findItem.totalPrice = findItem.quantity * findItem.price;
        }
      }
      state.totalQuantity = state.itemsList.reduce((total, item) => total + item.quantity, 0);
      localStorage.setItem('cartItems', JSON.stringify(state.itemsList));
    },

    updateQty(state, action: PayloadAction<{ id: number; quantity: number }>) {
      const item = state.itemsList.find((i) => i.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
        item.totalPrice = item.quantity * item.price;
      }
      state.totalQuantity = state.itemsList.reduce((total, item) => total + item.quantity, 0);

      // Sync to localStorage
      localStorage.setItem('cartItems', JSON.stringify(state.itemsList));
    },

    setShowCart(state) {
      state.showCart = !state.showCart;
    },
  },
});

export const { addToCart, removeFromCart, updateQty, setShowCart } = cartSlice.actions;
export default cartSlice.reducer;
