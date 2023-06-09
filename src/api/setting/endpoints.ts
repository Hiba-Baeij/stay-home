
import { axiosIns } from "@/lib/axios"
// import { Employee } from "./dto";
import { serialize } from "object-to-formdata";

export enum API_SETTING {
    GetAllCities = "Setting/GetAllCities",
    GetAllCitiesWithAreas = "Setting/GetAllCitiesWithAreas",
    UpsertCity = "Setting/UpsertCity",
    DeleteCity = "Setting/DeleteCity",
    GetAllCategories = "Setting/GetAllCategories",
    UpsertCategory = "Setting/UpsertCategory",
    DeleteCategory = "Setting/DeleteCategory",
}

export class SettingApi {
    static fetchCity = async () => {
        try {
            const res = await axiosIns.get(API_SETTING.GetAllCities);
            return res.data
        }
        catch (er) {
            throw er
        }
    }

    static fetchCityWithArea = async () => {
        try {
            const res = await axiosIns.get(API_SETTING.GetAllCitiesWithAreas);
            return res.data
        }

        catch (er) {
            throw er
        }

    }

    static fetchCategory = async () => {
        try {
            const res = await axiosIns.get(API_SETTING.GetAllCategories);
            return res.data
        }

        catch (er) {
            throw er
        }

    }

    static DeleteCategory = async (ids: string[]) => {
        try {
            const res = await axiosIns.delete(API_SETTING.DeleteCategory, { data: [...ids] });
            return res.data
        }

        catch (er) {
            throw er
        }

    }
    static DeleteCity = async (ids: string[]) => {
        try {
            const res = await axiosIns.delete(API_SETTING.DeleteCity, { data: [...ids] });
            return res.data
        }

        catch (er) {
            throw er
        }

    }

    static UpsertCity = async (payload: { name: string, id: null | string }) => {
        try {
            const res = await axiosIns.post(API_SETTING.UpsertCity, payload);
            return res.data
        }

        catch (er) {
            throw er
        }

    }
    static UpsertCategory = async (payload: { name: string, id: null | string }) => {
        try {
            const res = await axiosIns.post(API_SETTING.UpsertCategory, serialize(payload));
            return res.data
        }

        catch (er) {
            throw er
        }

    }

}