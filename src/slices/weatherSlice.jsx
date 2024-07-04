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
      localStorage.setItem('weatherData', JSON.stringify(state.data));
    },
    deleteWeatherData: (state, action) => {
      state.data = state.data.filter((_, index) => index !== action.payload);
      localStorage.setItem('weatherData', JSON.stringify(state.data));
    },
    loginUser: (state, action) => {
      state.loggedInUser = action.payload;
    },
    registerUser: (state, action) => {
      console.log('New user registered:', action.payload);
    },
    resetWeatherData: (state, action) => {
      state.data = action.payload;
      localStorage.setItem('weatherData', JSON.stringify(state.data));
    },
  
},
});

export const { logWeatherData, deleteWeatherData, loginUser ,registerUser,resetWeatherData } = weatherSlice.actions;
export default weatherSlice.reducer;