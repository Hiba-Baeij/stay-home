
import { axiosIns } from "@/lib/axios"
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
}