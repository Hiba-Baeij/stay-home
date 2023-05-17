import { configureStore } from "@reduxjs/toolkit";
import employeeSlice from "@/store/employee"
export const store = configureStore({
    reducer: {
        employee: employeeSlice
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch