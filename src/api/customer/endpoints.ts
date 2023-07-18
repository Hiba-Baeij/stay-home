
import { axiosIns } from "@/lib/axios"
import { Customer } from "./dto";
import { serialize } from "object-to-formdata";

export enum API_CUSTOMER {
    GetAll = "Customer/GetAll",
    GetById = "Customer/GetById",
    Add = "Customer/Add",
    GetNames = "Customer/GetNames",
    Modify = "Customer/Modify",
    Delete = "Customer/Delete",
    Block = "Customer/Block",
}


export class CustomerApi {
    static fetchCustomer = async () => {
        try {
            const res = await axiosIns.get(API_CUSTOMER.GetAll);
            return res.data
        }

        catch (er) {
            throw er
        }

    }
    static getCustomerDetails = async (id: string) => {
        try {
            const res = await axiosIns.get(API_CUSTOMER.GetById + `?id=${id}`);
            return res.data
        }

        catch (er) {
            throw er
        }

    }
    static BlockCustomer = async (id: string) => {
        try {
            const res = await axiosIns.post(API_CUSTOMER.Block + `?id=${id}`);
            return res.data
        }

        catch (er) {
            throw er
        }

    }
    static AddCustomer = async (payload: Customer) => {
        try {
            const res = await axiosIns.post(API_CUSTOMER.Add, serialize(payload));
            return res.data
        }

        catch (er) {
            throw er
        }

    }
    static ModifyCustomer = async (payload: Customer) => {
        try {
            const res = await axiosIns.post(API_CUSTOMER.Modify, serialize(payload));
            return res.data
        }

        catch (er) {
            throw er
        }

    }

    static DeleteCustomer = async (ids: string[]) => {
        try {
            const res = await axiosIns.delete(API_CUSTOMER.Delete, { data: [...ids] });
            return res.data
        }

        catch (er) {
            throw er
        }

    }




}