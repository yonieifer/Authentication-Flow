export const httpError = (msg, status) => {
    return Object.assign(new Error(msg), {status})
}