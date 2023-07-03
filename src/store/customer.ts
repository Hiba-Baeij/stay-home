
import { Customer } from "@/api/customer/dto"
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface initialState {
    customers: Customer[],
    openDialogCustomer: boolean,
    customerDto: Customer,
}

const state: initialState = {
    customers: [],
    customerDto: { ...new Customer() },
    openDialogCustomer: false
}

const customerSlice = createSlice({
    name: 'customer',
    initialState: state,
    reducers: {
        setCustomer(state: initialState, action: PayloadAction<Customer[]>) {
            state.customers = action.payload
        },

        setCustomerFormDto(state: initialState, action: PayloadAction<Customer>) {
            state.customerDto = { ...action.payload }
            console.log(state.customerDto);

            if (action.payload.id) {
                state.customerDto = { ...action.payload }
            }
            else {
                state.customers.unshift({ ...action.payload, orderCount: 0 })
            }

        },

        resetForm(state: initialState) {
            state.customerDto = { ... new Customer() }
        },

        setBlocked(state: initialState, action: PayloadAction<boolean>) {
            state.customerDto.isBlock = action.payload

        },

        modifyCustomer(state: initialState, action: PayloadAction<Customer>) {
            const indexData = state.customers.findIndex(ele => ele.id == action.payload.id);
            state.customers[indexData] = action.payload
        },


        setCustomerDialog(state: initialState, action: PayloadAction<boolean>) {
            state.openDialogCustomer = action.payload
            console.log(state.openDialogCustomer);
        },
        deleteCustomer(state: initialState, action: PayloadAction<string[]>) {
            state.customers = state.customers.filter(ele => !action.payload.includes(ele.id ? ele.id : ''))
        },

    }
})
export default customerSlice.reducer;
export const customerActions = customerSlice.actions;