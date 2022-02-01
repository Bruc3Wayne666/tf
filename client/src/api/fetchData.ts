import axios from "axios";
import {AuthResponse, AuthState} from "../redux/types";


export const getDataAPI = async (url: string, token: string) => {
    const {data} = await axios.get(`/api/${url}`, {
        headers: {
            Authorization: token
        }
    })

    return data
}

export const postDataAPI = async (url: string, postData: any, token: string): Promise<AuthResponse> => {
    const {data} = await axios.post<AuthResponse>(`/api/${url}`, postData, {
        headers: {
            Authorization: token
        }
    })

    return data
}

export const putDataAPI = async (url: string, putData: any, token: string) => {
    const {data} = await axios.put(`/api/${url}`, putData, {
        headers: {
            Authorization: token
        }
    })

    return data
}

export const patchDataAPI = async (url: string, patchData: any, token: string) => {
    const {data} = await axios.patch(`/api/${url}`, patchData, {
        headers: {
            Authorization: token
        }
    })

    return data
}

export const deleteDataAPI = async (url: string, deleteData: any, token: string) => {
    const {data} = await axios.delete(`/api/${url}`, {
        headers: {
            Authorization: token
        }
    })

    return data
}