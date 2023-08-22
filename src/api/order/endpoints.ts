
import { axiosIns } from "@/lib/axios"

export enum API_ORDER {
    GetByIdShippingOrder = "Order/GetByIdShippingOrder",
    GetByIdDeliveryOrder = "Order/GetByIdDeliveryOrder",
    GetByIdPassengerOrder = "Order/GetByIdPassengerOrder",
    GetAllShippingOrder = "Order/GetAllShippingOrder",
    GetAllDeliveryOrder = "Order/GetAllDeliveryOrder",
    GetAllPassengerOrder = "Order/GetAllPassengerOrder",
    GetAllRejectedOrder = "Order/GetAllRejectedOrder",
    Delete = "Order/Delete",
    Cancel = "Order/Cancel",
    Handle = "Order/Handle",

}

export class OrderApi {
    static getAllDeliveryOrder = async () => {
        try {
            const res = await axiosIns.get(API_ORDER.GetAllDeliveryOrder);
            return res.data
        }

        catch (er) {
            throw er
        }

    }
    static getAllRejectOrder = async () => {
        try {
            const res = await axiosIns.get(API_ORDER.GetAllRejectedOrder);
            return res.data
        }

        catch (er) {
            throw er
        }

    }
    static getAllPassengerOrder = async () => {
        try {
            const res = await axiosIns.get(API_ORDER.GetAllPassengerOrder);
            return res.data
        }

        catch (er) {
            throw er
        }

    }
    static getAllShippingOrder = async () => {
        try {
            const res = await axiosIns.get(API_ORDER.GetAllShippingOrder);
            return res.data
        }

        catch (er) {
            throw er
        }

    }
    static getByIdShippingOrder = async (id: string) => {
        try {
            const res = await axiosIns.get(API_ORDER.GetByIdShippingOrder + `?id=${id}`);
            return res.data
        }

        catch (er) {
            throw er
        }

    }
    static getByIdDeliveryOrder = async (id: string) => {
        try {
            const res = await axiosIns.get(API_ORDER.GetByIdDeliveryOrder + `?id=${id}`);
            return res.data
        }

        catch (er) {
            throw er
        }

    }
    static getByIdPassengerOrder = async (id: string) => {
        try {
            const res = await axiosIns.get(API_ORDER.GetByIdPassengerOrder + `?id=${id}`);
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

    static DeleteOrder = async (ids: string[]) => {
        try {
            const res = await axiosIns.delete(API_ORDER.Delete, { data: [...ids] });
            return res.data
        }

        catch (er) {
            throw er
        }

    }

    static CancelOrder = async (id: string) => {
        try {
            const res = await axiosIns.post(API_ORDER.Cancel + `?id=${id}`);
            return res.data
        }

        catch (er) {
            throw er
        }

    }
}