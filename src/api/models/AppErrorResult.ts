
export interface AppErrorResult {
    title: string,
    errors?: string[],
    fields?: FieldError[],
}

interface FieldError {
    field:string,
    errors: string[],
}