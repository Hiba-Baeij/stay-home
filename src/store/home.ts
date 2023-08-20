
import { Home } from "@/api/home/dto";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface initialState {
    homeDto: Home
}

const state: initialState = {
    homeDto: { ...new Home() },
}

const homeSlice = createSlice({
    name: 'home',
    initialState: state,
    reducers: {
        setHome(state: initialState, action: PayloadAction<Home>) {
            console.log(action.payload);
            state.homeDto = action.payload
        },



    }
})
export default homeSlice.reducer;
export const homeActions = homeSlice.actions;