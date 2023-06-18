import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Shop } from "@/api/shop/dto"
interface initialState {
    shops: Array<Shop>;

}

const state: initialState = {
    shops: [],

}


const shopSlice = createSlice({
    name: 'shop',
    initialState: state,
    reducers: {
        setShop(state: initialState, action: PayloadAction<Shop[]>) {
            state.shops = action.payload;
        },

    }
})

export default shopSlice.reducer;
export const shopActions = shopSlice.actions;
