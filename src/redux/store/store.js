import { configureStore, createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'count',
  initialState: { count: 0 },
  reducers: {
    increment(state, action) { 
      state.count++;
    },
    decrement(state, action) { 
      state.count--;
    },
    addBy(state, action) { 
      state.count += action.payload;
    },  
  }
})

const store = configureStore({
  reducer: counterSlice.reducer
})

export const actions = counterSlice.actions;
export default store;