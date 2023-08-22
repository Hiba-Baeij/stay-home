
import { axiosIns } from "@/lib/axios"
import { Area } from "@/store/setting";
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
    GetAllAreas = "Setting/GetAllAreas",
    UpsertArea = "Setting/UpsertArea",
    GetNamesAreas = "Setting/GetNamesAreas",
    DeleteArea = "Setting/DeleteArea",
    UpsertVehicleType = "Setting/UpsertVehicleType",
    GetAllVehicleTypes = "Setting/GetAllVehicleTypes",
    DeleteVehicleType = "Setting/DeleteVehicleType",
    ModifyAreaPrice = "Setting/ModifyAreaPrice",
    GetAllAreaPrices = "Setting/GetAllAreaPrices",
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

    static fetchArea = async () => {
        try {
            const res = await axiosIns.get(API_SETTING.GetAllAreas);
            return res.data
        }

        catch (er) {
            throw er
        }

    }
    static fetchNameArea = async () => {
        try {
            const res = await axiosIns.get(API_SETTING.GetNamesAreas);
            return res.data
        }

        catch (er) {
            throw er
        }

    }
    static fetchAreaPricing = async () => {
        try {
            const res = await axiosIns.get(API_SETTING.GetAllAreaPrices);
            return res.data
        }

        catch (er) {
            throw er
        }

    }

    static fetchVehicle = async () => {
        try {
            const res = await axiosIns.get(API_SETTING.GetAllVehicleTypes);
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
    static DeleteArea = async (ids: string[]) => {
        try {
            const res = await axiosIns.delete(API_SETTING.DeleteArea, { data: [...ids] });
            return res.data
        }

        catch (er) {
            throw er
        }

    }
    static DeleteVehicle = async (ids: string[]) => {
        try {
            const res = await axiosIns.delete(API_SETTING.DeleteVehicleType, { data: [...ids] });
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
    static UpsertVehicle = async (payload: { name: string, id: null | string }) => {
        try {
            const res = await axiosIns.post(API_SETTING.UpsertVehicleType, serialize(payload));
            return res.data
        }

        catch (er) {
            throw er
        }

    }
    static UpsertCategory = async (payload: { name: string, id: null | string, imageFile: null }) => {
        try {
            const res = await axiosIns.post(API_SETTING.UpsertCategory, serialize(payload));
            return res.data
        }

        catch (er) {
            throw er
        }

    }
    static UpsertArea = async (payload: Area) => {
        try {
            const res = await axiosIns.post(API_SETTING.UpsertArea, payload.id ? payload : { ...payload, id: null });
            return res.data
        }

        catch (er) {
            throw er
        }

    }
    static ModifyAreaPricing = async (payload: { id: string, price: number, kmBetween: number }) => {
        try {
            const res = await axiosIns.post(API_SETTING.ModifyAreaPrice, payload);
            return res.data
        }

        catch (er) {
            throw er
        }

    }

}