
import { axiosIns } from "@/lib/axios"
import { AddEmployee } from "./dto";
import { serialize } from "object-to-formdata";

export enum API_EMPLOYEE {
    GetAll = "Employee/GetAll",
    GetById = "Employee/GetById",
    Add = "Employee/Add",
    Delete = "Employee/Delete",
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
    static AddEmpolyee = async (payload: AddEmployee) => {
        try {
            const res = await axiosIns.post(API_EMPLOYEE.Add, serialize(payload));
            return res.data
        }

        catch (er) {
            throw er
        }

    }
    static DeleteEmpolyee = async (ids: string[]) => {
        console.log(ids);
        try {

            const res = await axiosIns.delete(API_EMPLOYEE.Delete, ids);
            return res.data
        }

        catch (er) {
            throw er
        }

    }
}