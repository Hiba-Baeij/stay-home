
import { Driver } from "@/api/driver/dto"
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface initialState {
    drivers: Driver[],
    openDialogDriver: boolean,
    driverDto: Driver,
}

const state: initialState = {
    drivers: [],
    driverDto: { ...new Driver() },
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

        setDriverFormDto(state: initialState, action: PayloadAction<Driver>) {
            delete action.payload.imageFile

            if (action.payload.id) {
                state.driverDto = { ...action.payload }
            }
            else {
                state.drivers.unshift({ ...action.payload, dateCreated: new Date().toLocaleDateString(), handledOrdersCount: 0 })
            }
        },
        resetForm(state: initialState) {
            state.driverDto = { ... new Driver() }
        },

        modifyDriver(state: initialState, action: PayloadAction<Driver>) {
            const indexData = state.drivers.findIndex(ele => ele.id == action.payload.id);
            state.drivers[indexData] = { ...action.payload, dateCreated: new Date().toLocaleDateString(), handledOrdersCount: 0 }
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