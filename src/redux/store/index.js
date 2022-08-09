// import { legacy_createStore } from 'redux';


// const reducerFn = (state = {count: 0, data: []}, action) => {

//   if (action.type == 'INC') {
//     return {
//       ...state,
//       count: state.count + 1,
//     }
//   } else if (action.type == 'DEC') {
//     return {
//       ...state,
//       count: state.count - 1,
//     }
//   } else if (action.type == 'ADD BY 10') {
//     return {
//       ...state, 
//       count: state.count + action.payload
//     }
//   }
//   return state;
// }

// const store = legacy_createStore(reducerFn)

// export default store;