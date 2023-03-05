import client from "../client";
import { InitialDataDto } from "../models/InitialDataDto";

const URL = "api/general";

const getInitialData = async (signal?:AbortSignal) => {
    const url = `${URL}/initial`;
    const resp = await client.get<InitialDataDto>(url, { signal });
    return resp.data;
};

const general = {
    getInitialData
}

export default general;