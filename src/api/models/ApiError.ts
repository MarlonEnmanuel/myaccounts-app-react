
export interface ApiError {
    title: string,
    errors?: string[],
    fields?: Record<string, string[]>,
};