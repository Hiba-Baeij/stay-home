
import { axiosIns } from "@/lib/axios"
import { serialize } from "object-to-formdata";
import { Shop } from "./dto";

export enum API_SHOPS {
    GetAll = "Shop/GetAll",
    GetById = "Shop/GetById",
    Add = "Shop/Add",
    Modify = "Shop/Modify",
    Delete = "Shop/Delete",
}


export class ShopApi {
    static fetchShop = async () => {
        try {
            const res = await axiosIns.get(API_SHOPS.GetAll);
            return res.data
        }
        catch (er) {
            throw er
        }
    }

    static getShopDetails = async (id: string) => {
        try {
            const res = await axiosIns.get(API_SHOPS.GetById + `?id=${id}`);
            return res.data
        }

        catch (er) {
            throw er
        }

    }

    static AddShop = async (payload: Shop) => {
        try {
            const res = await axiosIns.post(API_SHOPS.Add, serialize(payload));
            return res.data
        }

        catch (er) {
            throw er
        }

    }

    static ModifyShop = async (payload: Shop) => {
        try {
            const res = await axiosIns.post(API_SHOPS.Modify, serialize(payload));
            return res.data
        }

        catch (er) {
            throw er
        }

    }

    static DeleteShop = async (ids: string[]) => {
        try {
            const res = await axiosIns.delete(API_SHOPS.Delete, { data: [...ids] });
            return res.data
        }

        catch (er) {
            throw er
        }

    }
}