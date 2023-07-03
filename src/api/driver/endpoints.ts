
import { axiosIns } from "@/lib/axios"
import { Driver } from "./dto";
import { serialize } from "object-to-formdata";

export enum API_DRIVER {
    GetAll = "Driver/GetAll",
    GetById = "Driver/GetById",
    Add = "Driver/Add",
    GetNames = "Driver/GetNames",
    Modify = "Driver/Modify",
    Delete = "Driver/Delete",
}


export class DriverApi {
    static fetchDriver = async () => {
        try {
            const res = await axiosIns.get(API_DRIVER.GetAll);
            return res.data
        }

        catch (er) {
            throw er
        }

    }
    static getDriverDetails = async (id: string) => {
        try {
            const res = await axiosIns.get(API_DRIVER.GetById + `?id=${id}`);
            return res.data
        }

        catch (er) {
            throw er
        }

    }

    static AddDriver = async (payload: Driver) => {
        try {
            const res = await axiosIns.post(API_DRIVER.Add, serialize(payload));
            return res.data
        }

        catch (er) {
            throw er
        }

    }
    static ModifyDriver = async (payload: Driver) => {
        try {
            const res = await axiosIns.post(API_DRIVER.Modify, serialize(payload));
            return res.data
        }

        catch (er) {
            throw er
        }

    }

    static DeleteDriver = async (ids: string[]) => {
        try {
            const res = await axiosIns.delete(API_DRIVER.Delete, { data: [...ids] });
            return res.data
        }

        catch (er) {
            throw er
        }

    }




}