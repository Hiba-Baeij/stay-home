import { createSlice, PayloadAction } from '@reduxjs/toolkit'
interface Base {
    name: string,
    id: string,
    imageFile?: File,
    imageUrl?: string,
}
export interface Area {
    id: string | null,
    name: string,
    cityId: string
}
interface initialState {
    cities: Base[],
    areas: Area[],
    categories: Base[],
    vehicles: Base[],
}

const state: initialState = {
    cities: [],
    areas: [],
    categories: [],
    vehicles: [],

}

const settingSlice = createSlice({
    name: 'setting',
    initialState: state,
    reducers: {
        //city
        setCity(state: initialState, action: PayloadAction<Base[]>) {
            state.cities = action.payload;
        },

        deleteCity(state: initialState, action: PayloadAction<string[]>) {
            state.cities = state.cities.filter(ele => !action.payload.includes(ele.id ? ele.id : ''))
        },

        UpsertCity(state: initialState, action: PayloadAction<Base>) {
            if (action.payload.id) {
                const index = state.cities.findIndex(ele => ele.id == action.payload.id);
                state.cities[index] = { ...action.payload }
                console.log(action.payload);

            }
            else state.cities.unshift(action.payload)
        },

        //category

        setCategory(state: initialState, action: PayloadAction<Base[]>) {
            state.categories = action.payload;
        },

        deleteCategory(state: initialState, action: PayloadAction<string[]>) {
            state.categories = state.categories.filter(ele => !action.payload.includes(ele.id ? ele.id : ''))

        },

        UpsertCategory(state: initialState, action: PayloadAction<Base>) {
            console.log(action.payload);
            delete action.payload.imageFile;
            if (action.payload.id) {

                const index = state.categories.findIndex(ele => ele.id == action.payload.id);
                state.categories[index] = { ...action.payload }
                console.log(action.payload);

            }
            else state.categories.unshift(action.payload)
        },

        //Area

        setArea(state: initialState, action: PayloadAction<Area[]>) {
            state.areas = action.payload;
        },

        deleteArea(state: initialState, action: PayloadAction<string[]>) {
            state.areas = state.areas.filter(ele => !action.payload.includes(ele.id ? ele.id : ''))

        },

        UpsertArea(state: initialState, action: PayloadAction<Area>) {
            if (action.payload.id) {
                console.log(action.payload);

                const index = state.areas.findIndex(ele => ele.id == action.payload.id);
                state.areas[index] = { ...action.payload }
                console.log(action.payload);

            }
            else state.areas.unshift(action.payload)
        },

        // Vechile

        setVehicle(state: initialState, action: PayloadAction<Base[]>) {
            state.vehicles = action.payload;
        },

        deleteVehicles(state: initialState, action: PayloadAction<string[]>) {
            state.vehicles = state.vehicles.filter(ele => !action.payload.includes(ele.id ? ele.id : ''))
        },

        upsertVehicle(state: initialState, action: PayloadAction<Base>) {
            if (action.payload.id) {
                const index = state.vehicles.findIndex(ele => ele.id == action.payload.id);
                state.vehicles[index] = { ...action.payload }
                console.log(action.payload);

            }
            else state.vehicles.unshift(action.payload)
        },
    }


})

export default settingSlice.reducer;
export const settingActions = settingSlice.actions;