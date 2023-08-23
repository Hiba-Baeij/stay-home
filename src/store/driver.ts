
import { Driver, DriverDto } from "@/api/driver/dto"
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface DriverName {
    id: string,
    fullName: string
}
interface initialState {
    drivers: Driver[],
    openDialogDriver: boolean,
    driverDto: DriverDto,
    driverNames: DriverName[],
    driverAvailableNames: DriverName[],

}

const state: initialState = {
    drivers: [],
    driverDto: { ...new DriverDto() },
    openDialogDriver: false,
    driverNames: [],
    driverAvailableNames: []

}

const driverSlice = createSlice({
    name: 'driver',
    initialState: state,
    reducers: {
        setDriver(state: initialState, action: PayloadAction<Driver[]>) {
            state.drivers = action.payload
        },

        setDriverNames(state: initialState, action: PayloadAction<DriverName[]>) {
            state.driverNames = action.payload
        },
        setDriverAvailableNames(state: initialState, action: PayloadAction<DriverName[]>) {
            state.driverAvailableNames = action.payload
        },

        setBlocked(state: initialState, action: PayloadAction<boolean>) {
            state.driverDto.isBlock = action.payload

        },

        setDriverDto(state: initialState, action: PayloadAction<DriverDto>) {
            action.payload.vehicle.imageFile = null


            state.driverDto = { ...action.payload }


        },
        addDriver(state: initialState, action: PayloadAction<Driver>) {


            state.drivers.unshift(action.payload)


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