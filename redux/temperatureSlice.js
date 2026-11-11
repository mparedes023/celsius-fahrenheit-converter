import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  celsiusInput: '',
  fahrenheitOutput: '',
  errorMessage: '',
};

const temperatureSlice = createSlice({
  name: 'temperature',
  initialState,
  reducers: {


    setCelsiusInput: (state, action) => {
      state.celsiusInput = action.payload;
    },
    convertToFahrenheit: (state) => {
      const input = state.celsiusInput.trim();
      
      if (input === '') {
        state.errorMessage = 'Please enter a temperature.';

        state.fahrenheitOutput = '';


        return;
      }

      const celsiusNum = Number(input);
      // input validation
      if (isNaN(celsiusNum)) {
        state.errorMessage = 'Invalid input. Please enter a valid number.';


        state.fahrenheitOutput = '';

      } else {
        const fahrenheit = (celsiusNum * 9) / 5 + 32;

        state.fahrenheitOutput = `${fahrenheit.toFixed(1)} F`;

        state.errorMessage = '';
      }
    },
  },
});

export const { setCelsiusInput, convertToFahrenheit } = temperatureSlice.actions;

export default temperatureSlice.reducer;
