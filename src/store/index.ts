import { configureStore } from "@reduxjs/toolkit";
import employeeSlice from "@/store/employee"
import customerSlice from "@/store/customer"
import settingSlice from "@/store/setting"
import shopSlice from "@/store/shop"
import productSlice from "@/store/product"
import vehicleSlice from "@/store/vehicle"
import driverSlice from "@/store/driver"
import orderSlice from "@/store/order"
export const store = configureStore({
    reducer: {
        employee: employeeSlice,
        customer: customerSlice,
        setting: settingSlice,
        shop: shopSlice,
        product: productSlice,
        vehicle: vehicleSlice,
        driver: driverSlice,
        order: orderSlice,
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch