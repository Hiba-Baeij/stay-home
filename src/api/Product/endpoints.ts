
import { axiosIns } from "@/lib/axios"
import { serialize } from "object-to-formdata";
import { Product } from "./dto";

export enum API_PRODUCT {
    GetAll = "Product/GetAll",
    Delete = "Product/Delete",
    Modify = "Product/Modify",
    GetById = "Product/GetById",
    Add = "Product/Add",

}

export class ProductApi {
    static fetchProduct = async (id: string) => {
        try {
            const res = await axiosIns.get(API_PRODUCT.GetAll + `?shopId=${id}`);
            return res.data
        }
        catch (er) {
            throw er
        }
    }

    static getProductDetails = async (id: string) => {
        try {
            const res = await axiosIns.get(API_PRODUCT.GetById + `?id=${id}`);
            return res.data
        }

        catch (er) {
            throw er
        }

    }

    static AddProduct = async (payload: Product) => {
        try {
            const res = await axiosIns.post(API_PRODUCT.Add, serialize(payload));
            return res.data
        }

        catch (er) {
            throw er
        }

    }

    static ModifyProduct = async (payload: Product) => {
        try {
            const res = await axiosIns.post(API_PRODUCT.Modify, serialize(payload));
            return res.data
        }

        catch (er) {
            throw er
        }

    }

    static DeleteProduct = async (ids: string[]) => {
        try {
            const res = await axiosIns.delete(API_PRODUCT.Delete, { data: [...ids] });
            return res.data
        }

        catch (er) {
            throw er
        }

    }

}
