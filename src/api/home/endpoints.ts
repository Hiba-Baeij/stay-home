
import { axiosIns } from "@/lib/axios"

export enum API_HOME {
    Get = "Home/Get",

}

export class HomeApi {
    static fetchHome = async (year: number) => {
        try {
            const res = await axiosIns.get(API_HOME.Get + `?year=${year}`);
            return res.data
        }

        catch (er) {
            throw er
        }

    }

}