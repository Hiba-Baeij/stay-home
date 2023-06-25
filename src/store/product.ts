import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Product } from "@/api/Product/dto"
interface initialState {
    products: Array<Product>;
    openDialogProduct: boolean;
    isLoading: boolean;
    productDto: Product;


}

const state: initialState = {
    products: [],
    openDialogProduct: false,
    isLoading: false,
    productDto: { ...new Product() }
}


const productSlice = createSlice({
    name: 'product',
    initialState: state,
    reducers: {
        setProduct(state: initialState, action: PayloadAction<Product[]>) {
            state.products = action.payload;
        },

        setLoading(state: initialState, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        },

        setProductDto(state: initialState, action: PayloadAction<Product>) {
            console.log(action.payload);
            delete action.payload.imageFile
            if (action.payload.id) {
                state.productDto = { ...action.payload }
            }
            else {
                state.products.unshift({ ...action.payload })
            }
        },

        modifyProduct(state: initialState, action: PayloadAction<Product>) {
            const indexData = state.products.findIndex(ele => ele.id == action.payload.id);
            state.products[indexData] = { ...action.payload }
        },
        resetForm(state: initialState) {
            state.productDto = { ... new Product }
        },

        setProductDialog(state: initialState, action: PayloadAction<boolean>) {
            state.openDialogProduct = action.payload
        },
        deleteProduct(state: initialState, action: PayloadAction<string[]>) {
            state.products = state.products.filter(ele => !action.payload.includes(ele.id ? ele.id : ''))
        },

    }
})

export default productSlice.reducer;
export const productActions = productSlice.actions;
