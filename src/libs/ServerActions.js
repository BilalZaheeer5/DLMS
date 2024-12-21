'use server'
import { APIs } from "@/constants/ApiEndpoint"
import axios from "axios"
export async function LoginUser(email,password){    
    const data = await axios.post(APIs.loginApi,{
        email:email,
        password:password,
    })
    .then(res=>{return res.data})
    .catch(error=>{return error.response.data})
    return data
}
export async function GetLicenc(cnic) {
    if(cnic){
        const data = await axios.get(`${APIs.getLicenceApi}${cnic}`)
        .then(res=>{return res.data})
        .catch(error=>{return error.response.data})
        return data
    }else{
        const data = await axios.get(`${APIs.getLicenceApi}`)
        .then(res=>{return res.data})
        .catch(error=>{return error.response.data})
        return data
    }
}


