
import { axiosIns } from "@/lib/axios"
import { Customer, CustomerDto } from "./dto";
import { serialize } from "object-to-formdata";

export enum API_CUSTOMER {
    GetAll = "Customer/GetAll",
    GetById = "Customer/GetById",
    Add = "Customer/Add",
    GetNames = "Customer/GetNames",
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

    static AddCustomer = async (payload: CustomerDto) => {
        try {
            const res = await axiosIns.post(API_CUSTOMER.Add, serialize(payload));
            return res.data
        }

        catch (er) {
            throw er
        }

    }




}