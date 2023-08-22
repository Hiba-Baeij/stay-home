
import { Order, OrderDetails, RejectOrder } from "@/api/order/dto"
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface initialState {
    shippingOrders: Order[],
    passengerOrders: Order[],
    deliveryOrders: Order[],
    rejectedOrders: RejectOrder[],
    openDialogOrder: boolean,
    orderDto: OrderDetails,
}

const state: initialState = {
    shippingOrders: [],
    passengerOrders: [],
    deliveryOrders: [],
    rejectedOrders: [],
    orderDto: { ...new OrderDetails() },
    openDialogOrder: false
}

const orderSlice = createSlice({
    name: 'order',
    initialState: state,
    reducers: {
        setShippingOrder(state: initialState, action: PayloadAction<Order[]>) {
            state.shippingOrders = action.payload
        },
        setDeliveryOrder(state: initialState, action: PayloadAction<Order[]>) {
            state.deliveryOrders = action.payload
        },
        setPassengerOrder(state: initialState, action: PayloadAction<Order[]>) {
            state.passengerOrders = action.payload
        },
        setRejectOrder(state: initialState, action: PayloadAction<RejectOrder[]>) {
            state.rejectedOrders = action.payload
        },


        setOrderDto(state: initialState, action: PayloadAction<OrderDetails>) {

            state.orderDto = { ...action.payload }
        },


        setOrderDialog(state: initialState, action: PayloadAction<boolean>) {
            state.openDialogOrder = action.payload
        },

        deleteShippingOrder(state: initialState, action: PayloadAction<string[]>) {
            state.shippingOrders = state.shippingOrders.filter(ele => !action.payload.includes(ele.id ? ele.id : ''))
        },
        deleteDeliveryOrder(state: initialState, action: PayloadAction<string[]>) {
            state.deliveryOrders = state.deliveryOrders.filter(ele => !action.payload.includes(ele.id ? ele.id : ''))
        },
        deletePassengerOrder(state: initialState, action: PayloadAction<string[]>) {
            state.passengerOrders = state.passengerOrders.filter(ele => !action.payload.includes(ele.id ? ele.id : ''))
        },

    }
})
export default orderSlice.reducer;
export const orderActions = orderSlice.actions;