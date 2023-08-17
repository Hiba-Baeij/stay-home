
import { Order, OrderDetails } from "@/api/order/dto"
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface initialState {
    orders: Order[],
    openDialogOrder: boolean,
    orderDto: OrderDetails,
}

const state: initialState = {
    orders: [],
    orderDto: { ...new OrderDetails() },
    openDialogOrder: false
}

const orderSlice = createSlice({
    name: 'order',
    initialState: state,
    reducers: {
        setOrder(state: initialState, action: PayloadAction<Order[]>) {
            state.orders = action.payload
        },


        setOrderDto(state: initialState, action: PayloadAction<OrderDetails>) {

            state.orderDto = { ...action.payload }
        },


        setOrderDialog(state: initialState, action: PayloadAction<boolean>) {
            state.openDialogOrder = action.payload
        },

        deleteOrder(state: initialState, action: PayloadAction<string[]>) {
            state.orders = state.orders.filter(ele => !action.payload.includes(ele.id ? ele.id : ''))
        },

    }
})
export default orderSlice.reducer;
export const orderActions = orderSlice.actions;