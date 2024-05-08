import { getuserdata, removeuserdata } from "./storage"

export const isAuthenticated = ()=>
    {
        return getuserdata()!=null?true:false
    }

    export const logout = ()=>
        {
            removeuserdata()
        }