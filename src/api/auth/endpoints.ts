
import { axiosIns } from "@/lib/axios"
export enum API_USER {
    Login = "Dashboard/Employee/LogIn",
    GetAll = "Dashboard/Employee/GetAll",
    RefreshToken = "User/RefreshToken",
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
    // static login = async () => {
    //     try {
    //         const { data } = await axiosIns.get(API_USER.Login);
    //         console.log(data);
    //         return data
    //     }

    //     catch (er) {
    //         throw er
    //     }

    // }
}