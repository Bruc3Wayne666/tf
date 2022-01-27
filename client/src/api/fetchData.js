import axios from "axios";


export const getDataAPI = async (url, token) => {
    const {data} = await axios.get(`/api/${url}`, {
        headers: {
            Authorization: token
        }
    })

    return data
}

export const postDataAPI = async (url, postData, token) => {
    const {data} = await axios.post(`/api/${url}`, postData, {
        headers: {
            Authorization: token
        }
    })

    return data
}

export const putDataAPI = async (url, putData, token) => {
    const {data} = await axios.put(`/api/${url}`, putData, {
        headers: {
            Authorization: token
        }
    })

    return data
}

export const patchDataAPI = async (url, patchData, token) => {
    const {data} = await axios.patch(`/api/${url}`, patchData, {
        headers: {
            Authorization: token
        }
    })

    return data
}

export const deleteDataAPI = async (url, deleteData, token) => {
    const {data} = await axios.delete(`/api/${url}`, {
        headers: {
            Authorization: token
        }
    })

    return data
}