import { configureStore } from "@reduxjs/toolkit";
import employeeSlice from "@/store/employee"
import customerSlice from "@/store/customer"
import settingSlice from "@/store/setting"
import shopSlice from "@/store/shop"
import productSlice from "@/store/product"
import vehicleSlice from "@/store/vehicle"
export const store = configureStore({
    reducer: {
        employee: employeeSlice,
        customer: customerSlice,
        setting: settingSlice,
        shop: shopSlice,
        product: productSlice,
        vehicle: vehicleSlice,
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch