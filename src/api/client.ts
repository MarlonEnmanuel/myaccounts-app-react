import axios from "axios";

const client = axios.create({
    baseURL: process.env.REACT_APP_MYACCOUNTS_API_URL,
    timeout: process.env.REACT_APP_MYACCOUNTS_API_TIMEOUT,
    headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiTWFybG9uIiwiZXhwIjoxNzM3OTIxODMyfQ.CBkzbIOSO1jIf4-Cj_tUtGP4R7v0h7HnER7vG-Zc2_k',
    }
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