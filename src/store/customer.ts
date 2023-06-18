
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

            state.customerDto = { ...action.payload }
            console.log(state.customerDto);

        },
        addMoreCustomer(state: initialState, action: PayloadAction<CustomerDto>) {
            state.customers.unshift({
                id: '',
                orderCount: 0,
                name: action.payload.fullName,
                birthDate: action.payload.birthDate,
                cityId: action.payload.cityId,
                phoneNumber: action.payload.phoneNumber,
            })
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