
import { axiosIns } from "@/lib/axios"
import { Employee } from "./dto";
import { serialize } from "object-to-formdata";

export enum API_EMPLOYEE {
    GetAll = "Employee/GetAll",
    GetById = "Employee/GetById",
    Add = "Employee/Add",
    Delete = "Employee/Delete",
    Modify = "Employee/Modify",
    Block = "Employee/Block",
}

export class EmployeeApi {
    static fetchEmpolyee = async () => {
        try {
            const res = await axiosIns.get(API_EMPLOYEE.GetAll);
            return res.data
        }

        catch (er) {
            throw er
        }

    }
    static getEmpolyeeDetails = async (id: string) => {
        try {
            const res = await axiosIns.get(API_EMPLOYEE.GetById + `?id=${id}`);
            return res.data
        }

        catch (er) {
            throw er
        }

    }

    static AddEmpolyee = async (payload: Employee) => {
        try {
            const res = await axiosIns.post(API_EMPLOYEE.Add, serialize(payload));
            return res.data
        }

        catch (er) {
            throw er
        }

    }

    static BlockEmpolyee = async (id: string) => {
        try {
            const res = await axiosIns.post(API_EMPLOYEE.Block + `?id=${id}`);
            return res.data
        }

        catch (er) {
            throw er
        }

    }

    static ModifyEmpolyee = async (payload: Employee) => {
        try {
            const res = await axiosIns.post(API_EMPLOYEE.Modify, serialize(payload));
            return res.data
        }

        catch (er) {
            throw er
        }

    }

    static DeleteEmpolyee = async (ids: string[]) => {
        try {
            const res = await axiosIns.delete(API_EMPLOYEE.Delete, { data: [...ids] });
            return res.data
        }

        catch (er) {
            throw er
        }

    }
}