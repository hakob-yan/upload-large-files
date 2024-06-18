// reducers.ts
import { createSlice } from '@reduxjs/toolkit';
export interface ICount { value: number  }

interface IState {
    value: number
}

const initialState: IState = { value: 0 };

const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
    },
});

export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;
