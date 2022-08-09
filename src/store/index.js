import { configureStore } from '@reduxjs/toolkit';
import dataSlice from './data-reducer';

const store = configureStore({
  reducer: {
    dataReducer: dataSlice.reducer,
  }
});

//  dataReducer is used to access the state of the store => in a component where you need it use
//  const <variable you want to store in> = useSelector((state) => state.dataReducer.<name of state variable you want in this case products>)

export default store;