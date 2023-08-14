import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Shop } from "@/api/shop/dto"
interface initialState {
    shops: Array<Shop>;
    openDialogShop: boolean;
    shopDto: Shop;


}

const state: initialState = {
    shops: [],
    openDialogShop: false,
    shopDto: { ...new Shop() }
}


const shopSlice = createSlice({
    name: 'shop',
    initialState: state,
    reducers: {
        setShop(state: initialState, action: PayloadAction<Shop[]>) {
            state.shops = action.payload;
        },

        setShopDto(state: initialState, action: PayloadAction<Shop>) {

            delete action.payload.imageFile;

            state.shopDto = { ...action.payload }



        },
        addShopDto(state: initialState, action: PayloadAction<Shop>) {
            delete action.payload.imageFile;
            state.shops.unshift(action.payload)

        },

        modifyShop(state: initialState, action: PayloadAction<Shop>) {
            const indexData = state.shops.findIndex(ele => ele.id == action.payload.id);
            state.shops[indexData] = { ...action.payload }
        },
        resetForm(state: initialState) {
            state.shopDto = { ... new Shop() }
        },

        setShopDialog(state: initialState, action: PayloadAction<boolean>) {
            state.openDialogShop = action.payload
        },
        deleteShop(state: initialState, action: PayloadAction<string[]>) {
            state.shops = state.shops.filter(ele => !action.payload.includes(ele.id ? ele.id : ''))
        },

    }
})

export default shopSlice.reducer;
export const shopActions = shopSlice.actions;
