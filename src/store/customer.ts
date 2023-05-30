
import { Customer, CustomerDto } from "@/api/customer/dto"
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface initialState {
    customers: Customer[],
    openDialogCustomer: boolean,
    customerDto: CustomerDto,
}

const state: initialState = {
    customers: [],
    customerDto: { ...new CustomerDto() },
    openDialogCustomer: false
}

const customerSlice = createSlice({
    name: 'customer',
    initialState: state,
    reducers: {
        setCustomer(state: initialState, action: PayloadAction<Customer[]>) {
            state.customers = action.payload
        },

        setCustomerFormDto(state: initialState, action: PayloadAction<CustomerDto>) {
            if (action.payload.id) {

                state.customerDto = { ...action.payload }
                console.log(state.customerDto);
            }
            else {
                console.log("in add  custoneer");
                // state.customers.unshift(action.payload)
                console.log(state.customers);

            }
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