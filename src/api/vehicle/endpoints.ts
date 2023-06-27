
import { axiosIns } from "@/lib/axios"
import { serialize } from "object-to-formdata";
import { Vehicle } from "./dto";

export enum API_VEHICLE {
    GetAll = "Vehicle/GetAll",
    GetById = "Vehicle/GetById",
    Add = "Vehicle/Add",
    Modify = "Vehicle/Modify",
    Delete = "Vehicle/Delete",
}


export class VehicleApi {
    static fetchVehicle = async () => {
        try {
            const res = await axiosIns.get(API_VEHICLE.GetAll);
            return res.data
        }
        catch (er) {
            throw er
        }
    }

    static getVehicleDetails = async (id: string) => {
        try {
            const res = await axiosIns.get(API_VEHICLE.GetById + `?id=${id}`);
            return res.data
        }

        catch (er) {
            throw er
        }

    }

    static AddVehicle = async (payload: Vehicle) => {
        try {
            const res = await axiosIns.post(API_VEHICLE.Add, serialize(payload));
            return res.data
        }

        catch (er) {
            throw er
        }

    }

    static ModifyVehicle = async (payload: Vehicle) => {
        try {
            const res = await axiosIns.post(API_VEHICLE.Modify, serialize(payload));
            return res.data
        }

        catch (er) {
            throw er
        }

    }

    static DeleteVehicle = async (ids: string[]) => {
        try {
            const res = await axiosIns.delete(API_VEHICLE.Delete, { data: [...ids] });
            return res.data
        }

        catch (er) {
            throw er
        }

    }
}