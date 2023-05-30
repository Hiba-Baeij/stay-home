import { configureStore } from "@reduxjs/toolkit";
import employeeSlice from "@/store/employee"
import customerSlice from "@/store/customer"
export const store = configureStore({
    reducer: {
        employee: employeeSlice,
        customer: customerSlice,
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch