
import { axiosIns } from "@/lib/axios"
import { serialize } from "object-to-formdata";

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
}