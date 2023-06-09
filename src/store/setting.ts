import { createSlice, PayloadAction } from '@reduxjs/toolkit'
interface Base {
    name: string,
    id: string,
    imageFile?: File,
    imageUrl?: string,

}
interface initialState {
    cities: Base[],
    areas: Base[],
    categories: Base[],
}

const state: initialState = {
    cities: [],
    areas: [],
    categories: []
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
            if (action.payload.id) {
                const index = state.categories.findIndex(ele => ele.id == action.payload.id);
                state.categories[index] = { ...action.payload }
                console.log(action.payload);

            }
            else state.categories.unshift(action.payload)
        },
    }


})

export default settingSlice.reducer;
export const settingActions = settingSlice.actions;