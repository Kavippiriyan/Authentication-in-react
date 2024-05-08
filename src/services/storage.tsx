export const store_user_data = (data: any) => {
    localStorage.setItem("idToken", data)
}


export const getuserdata = () => {
    return localStorage.getItem("idToken")
}

export const removeuserdata = ()=>
    {
        localStorage.removeItem("idToken")
    }