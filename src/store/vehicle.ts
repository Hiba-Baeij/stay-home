
import { Vehicle } from "@/api/vehicle/dto"
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface initialState {
    vehicles: Vehicle[],
    openDialogVehicle: boolean,
    vehicleDto: Vehicle,
}

const state: initialState = {
    vehicles: [],
    vehicleDto: { ...new Vehicle() },
    openDialogVehicle: false
}

const vehicleSlice = createSlice({
    name: 'vehicle',
    initialState: state,
    reducers: {
        setVehicle(state: initialState, action: PayloadAction<Vehicle[]>) {
            console.log(action.payload);

            state.vehicles = action.payload
        },

        setVehicleFormDto(state: initialState, action: PayloadAction<Vehicle>) {
            delete action.payload.imageFile

            if (action.payload.id) {
                state.vehicleDto = { ...action.payload }
            }
            else {
                state.vehicles.unshift(action.payload)
            }
        },
        resetForm(state: initialState) {
            state.vehicleDto = { ... new Vehicle() }
        },

        modifyVehicle(state: initialState, action: PayloadAction<Vehicle>) {
            const indexData = state.vehicles.findIndex(ele => ele.id == action.payload.id);
            state.vehicles[indexData] = action.payload
        },

        setVehicleDialog(state: initialState, action: PayloadAction<boolean>) {
            state.openDialogVehicle = action.payload
        },
        deleteVehicle(state: initialState, action: PayloadAction<string[]>) {
            state.vehicles = state.vehicles.filter(ele => !action.payload.includes(ele.id ? ele.id : ''))
        },

    }
})
export default vehicleSlice.reducer;
export const vehicleActions = vehicleSlice.actions;