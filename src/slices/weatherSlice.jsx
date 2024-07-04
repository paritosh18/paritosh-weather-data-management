import { createSlice } from '@reduxjs/toolkit';

const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    data: [],
    loggedInUser: null
  },
  reducers: {
    logWeatherData: (state, action) => {
      state.data.push(action.payload);
    },
    deleteWeatherData: (state, action) => {
      state.data = state.data.filter((_, index) => index !== action.payload);
    },
    loginUser: (state, action)  => {
      state.loggedInUser = action.payload;
    },
    registerUser: (state, action) => {
      console.log('New user registered:', action.payload);
  },
  
},
});

export const { logWeatherData, deleteWeatherData, loginUser ,registerUser } = weatherSlice.actions;
export default weatherSlice.reducer;