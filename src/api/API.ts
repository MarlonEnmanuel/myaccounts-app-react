import { general, payments, security } from "./resources";

export const API = {
    security,
    general,
    payments,
};

export type ApiRequest<TInput, TResponse> = (input:TInput, signal?:AbortSignal) => Promise<TResponse>;