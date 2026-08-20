import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    // Add a plant to the cart
    addItem: (state, action) => {
      const { name, image, cost } = action.payload;

      // Check whether the plant already exists
      const existingItem = state.items.find(
        (item) => item.name === name
      );

      if (existingItem) {
        // If it already exists, increase quantity
        existingItem.quantity++;
      } else {
        // Otherwise add it with quantity 1
        state.items.push({
          name,
          image,
          cost,
          quantity: 1,
        });
      }
    },

    // Remove a plant completely from the cart
    removeItem: (state, action) => {
      state.items = state.items.filter(
        (item) => item.name !== action.payload
      );
    },

    // Update the quantity of a plant
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;

      const itemToUpdate = state.items.find(
        (item) => item.name === name
      );

      if (itemToUpdate) {
        itemToUpdate.quantity = quantity;

        // Remove item if quantity becomes 0 or negative
        if (itemToUpdate.quantity <= 0) {
          state.items = state.items.filter(
            (item) => item.name !== name
          );
        }
      }
    },
  },
});

// Export actions
export const {
  addItem,
  removeItem,
  updateQuantity,
} = cartSlice.actions;

// Export reducer
export default cartSlice.reducer;