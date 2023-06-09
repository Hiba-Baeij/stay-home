import { LoginRequest, LoginResponse } from "@/api/auth/dto";
import { axiosIns } from "@/lib/axios"
import { toast } from 'react-toastify';
import jwt_decode from "jwt-decode"
import { API_USER } from "@/api/auth/endpoints"
import { AxiosError } from "axios";
import { API_URL } from "app.config";

// export interface RefreshTokenDecoded {
//     aud: string
//     exp: number
//     'generate-date': string
//     'generation-stamp': string
//     'http://schemas.microsoft.com/ws/2008/06/identity/claims/role': string
//     'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier': string
//     'iss': string
// }

export interface RefreshTokenDecoded {
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": string,
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name": string,
    Type: string,
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string,
    exp: number,
    iss: string,
    aud: string
}

export async function LoginUser(payload: LoginRequest) {

    try {
        const { data } = await axiosIns.post(API_USER.Login, payload)
        if (data.isSuccess) {
            SetUserData(data.response)
            return data
        }
        // if (data.message) {
        //     toast(data.message, {
        //         position: "top-right",
        //         autoClose: 5000,
        //         hideProgressBar: false,
        //         closeOnClick: true,
        //         pauseOnHover: true,
        //         progress: undefined,
        //         theme: "light",
        //     });
        // }
        // else {
        toast('تم التسجيل بنجاح', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            progress: undefined,
            theme: "light",
            type: 'success'
        });
        // }
    }
    catch (error) {
        HandlerError(error as AxiosError)

    }
}

export async function RefreshToken() {
    const userData = GetUserData()
    try {
        const response = await axiosIns.post(API_USER.RefreshToken,
            {
                id: userData?.id,
                refreshToken: GetRefreshToken(),
            })

        const { accessToken } = response.data
        if (!accessToken)
            LogOut()

        if (accessToken && userData) {
            SetUserData({
                ...userData,
                accessToken,
            })
        }
        // if(response.status==500)

        return accessToken
    }
    catch (error) {
        LogOut()
    }
}

export const isLoggedIn = () => {
    return localStorage.getItem('user-data')
}

export function SetUserData(userData: LoginResponse) {
    localStorage.setItem('user-data', JSON.stringify(userData))
}
export function GetAccessToken() {
    const userData = GetUserData()
    if (userData && userData.accessToken)
        return userData.accessToken

    else return null
}
export function GetUserData(): LoginResponse | null {
    const userData = localStorage.getItem('user-data')
    if (userData)
        return JSON.parse(userData)
    else
        return null
}
export function GetRefreshToken() {
    return GetUserData()?.refreshToken
}
export function GetUserRoles() {
    return GetAccessTokenDecoded()?.['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
}
export function GetAccessTokenDecoded(): RefreshTokenDecoded | null {
    if (GetAccessToken())
        return jwt_decode(GetAccessToken() as string)
    else return null
}
export function IsLoggedIn() {
    return !!GetAccessToken()
}
export function LogOut() {
    // console.log('in Logout');
    localStorage.removeItem('user-data')

}
// function ActionsGaurd(name: string, action: string) {
//     if (name === 'Public')
//         return true

//     return (GetUserRoles()?.includes(`${name}-${action}`) || GetUserRoles()?.includes(BaseRoles.SuperAdmin))
// }
function HandlerError(er: AxiosError) {
    if (er.response?.status === 404 || er.request?.status === 403)
        return toast('المستخدم غير موجود .. يرجى التحقق من صحة المعلومات', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            progress: undefined,
            theme: "light",
            type: 'error'
        });

    else if (er.response?.status === 400)
        return toast('كلمة المرور خاطئة .. يرجى التأكد من حالة الأحرف ', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            progress: undefined,
            theme: "light",
            type: 'error'
        });


    else if (er.response?.status === 500)
        return toast('حدث خطأ في الخادم .. يرجى اعادة المحاولة', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            progress: undefined,
            theme: "light",
            type: 'error'
        });

    else return toast('حدث خطأ ما', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
        theme: "light",
        type: 'error'
    });
}
