export const httpError = (status, msg) => {
    return Object.assign(new Error(msg), {status})
}