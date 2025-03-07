import { toast } from "react-toastify"

const SuccessNotify = (message: string) => {
    return toast.success(message, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        pauseOnHover: false,
    })
}

const InfoNotify = (message: string) => {
    return toast.info(message, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        pauseOnHover: false,
    })
}

const ErrorNotify = (message: string) => {
    return toast.error(message, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        pauseOnHover: false,
    })
}

export { SuccessNotify, InfoNotify, ErrorNotify }