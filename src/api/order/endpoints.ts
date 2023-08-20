
import { axiosIns } from "@/lib/axios"
import { Order, OrderDetails } from "./dto";
import { serialize } from "object-to-formdata";

export enum API_ORDER {
    GetAll = "Order/GetAllShippingOrder",
    GetByIdShippingOrder = "Order/GetByIdShippingOrder",
    Handle = "Order/Handle",

}

export class OrderApi {
    static fetchOrder = async () => {
        try {
            const res = await axiosIns.get(API_ORDER.GetAll);
            return res.data
        }

        catch (er) {
            throw er
        }

    }
    static getOrderDetails = async (id: string) => {
        try {
            const res = await axiosIns.get(API_ORDER.GetByIdShippingOrder + `?id=${id}`);
            return res.data
        }

        catch (er) {
            throw er
        }

    }



    static HandleOrder = async (payload: { id: string, driverId: string }) => {
        try {
            const res = await axiosIns.post(API_ORDER.Handle, payload);
            return res.data
        }

        catch (er) {
            throw er
        }

    }

    // static DeleteOrder= async (ids: string[]) => {
    //     try {
    //         const res = await axiosIns.delete(API_ORDER.Delete, { data: [...ids] });
    //         return res.data
    //     }

    //     catch (er) {
    //         throw er
    //     }

    // }
}