import { createSlice } from '@reduxjs/toolkit';

// createSlice generates actions creaters and types that correspond to the reducers and state
const dataSlice = createSlice({
  // slice name
  name: 'data',
  // initial state
  initialState: {
    product: ['1'],
    data: [],
    delete: false,
  },
  // reducer functions
  reducers: {
    getData (state, action) {
      return ({
        ...state,
        data: action.payload,
      })

    }, 
    removeData(state, action) {
      return ({
        ...state,
        data: action.payload
      })
    }
  }
})

// getting the actions
export const dataActions = dataSlice.actions;

// getting the 
export default dataSlice