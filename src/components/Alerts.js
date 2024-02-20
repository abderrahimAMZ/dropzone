

import Alert from "@mui/material/Alert";


export const AlertError = (props) => {
    return (
        <Alert severity="error" {...props} />
    )
}

export const AlertSuccess = (props) => {
    return (
        <Alert severity="success" {...props} />
    )
}

export const AlertInfo = (props) => {
    return (
        <Alert severity="info" {...props} />
    )
}
