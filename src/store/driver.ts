
import { Driver, DriverDto } from "@/api/driver/dto"
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface initialState {
    drivers: Driver[],
    openDialogDriver: boolean,
    driverDto: DriverDto,
}

const state: initialState = {
    drivers: [],
    driverDto: { ...new DriverDto() },
    openDialogDriver: false
}

const driverSlice = createSlice({
    name: 'driver',
    initialState: state,
    reducers: {
        setDriver(state: initialState, action: PayloadAction<Driver[]>) {
            state.drivers = action.payload
        },

        setBlocked(state: initialState, action: PayloadAction<boolean>) {
            state.driverDto.isBlock = action.payload

        },

        setDriverDto(state: initialState, action: PayloadAction<DriverDto>) {

            state.driverDto = { ...action.payload }


        },
        resetForm(state: initialState) {
            state.driverDto = { ... new DriverDto() }
        },

        modifyDriver(state: initialState, action: PayloadAction<Driver>) {
            const indexData = state.drivers.findIndex(ele => ele.id == action.payload.id);
            state.drivers[indexData] = { ...action.payload }
        },

        setDriverDialog(state: initialState, action: PayloadAction<boolean>) {
            state.openDialogDriver = action.payload
        },
        deleteDriver(state: initialState, action: PayloadAction<string[]>) {
            state.drivers = state.drivers.filter(ele => !action.payload.includes(ele.id ? ele.id : ''))
        },

    }
})
export default driverSlice.reducer;
export const driverActions = driverSlice.actions;