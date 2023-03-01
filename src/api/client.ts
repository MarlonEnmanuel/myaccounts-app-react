import axios from "axios";

const client = axios.create({
    baseURL: process.env.REACT_APP_MYACCOUNTS_API_URL,
    timeout: process.env.REACT_APP_MYACCOUNTS_API_TIMEOUT,
});

export const setBearerToken = (token:string) => {
    client.defaults.headers["Authorization"] = `Bearer ${token}`;
}

export const unsetBearerToken = () => {
    if (client.defaults.headers["Authorization"])
        delete client.defaults.headers["Authorization"];
}

export default client;

// export default {
//     get: <T>(url:string) => axios.get<T>(url, getConfig()),
//     post: <T>(url:string, data:any) => axios.post<T>(url, data, getConfig()),
//     put: <T>(url:string, data:any) => axios.put<T>(url, data, getConfig()),
//     delete: <T>(url:string) => axios.delete<T>(url, getConfig()),
// };