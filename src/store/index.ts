import { configureStore } from "@reduxjs/toolkit";
import employeeSlice from "@/store/employee"
import customerSlice from "@/store/customer"
import settingSlice from "@/store/setting"
import shopSlice from "@/store/shop"
import productSlice from "@/store/product"
import homeSlice from "@/store/home"
import driverSlice from "@/store/driver"
import orderSlice from "@/store/order"
export const store = configureStore({
    reducer: {
        employee: employeeSlice,
        customer: customerSlice,
        setting: settingSlice,
        shop: shopSlice,
        product: productSlice,
        home: homeSlice,
        driver: driverSlice,
        order: orderSlice,
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch