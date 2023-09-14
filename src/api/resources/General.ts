import client from "../client";
import { InitialDataDto } from "../models";

const URL = "api/general";

const getInitialData = async (data:{}, signal?:AbortSignal) => {
    const url = `${URL}/initial`;
    const resp = await client.get<InitialDataDto>(url, { data, signal });
    return resp.data;
};

export const general = {
    getInitialData
};