export interface ApiErrorResponse {
    error: {
        code: number;
        message: string;
    }
}

export function isApiErrorResponse(error: any): error is ApiErrorResponse {
    return error !== null &&
        typeof error === 'object' &&
        'error' in error &&
        'code' in error.error &&
        typeof error.error.code === 'number' &&
        'message' in error.error &&
        typeof error.error.message === 'string';
}
