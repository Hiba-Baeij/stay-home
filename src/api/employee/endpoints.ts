
import { axiosIns } from "@/lib/axios"
export enum API_USER {
    GetAll = "Dashboard/Employee/GetAll",
}

export class EmployeeApi {
    static fetchEmpolyee = async () => {
        try {
            const res = await axiosIns.get(API_USER.GetAll);
            return res.data
        }

        catch (er) {
            throw er
        }

    }
}