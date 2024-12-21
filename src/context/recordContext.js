'use client'
import { createContext, useState } from "react";
export const recordContext = createContext();
export function RecordContextProvider({children}){
    const [record,setRecord] = useState({
        id: 0,
        userImage: "",
        cnic: "",
        fullName: "",
        fatherHusbandName: "",
        city: "",
        state: "",
        licenceNumber: "",
        issueDate: "",
        validFrom: "",
        validTo: "",
        allowedVehicles: "",
        isInternational: false,
    })
    return(
        <recordContext.Provider value={{record,setRecord}}>
            {children}
        </recordContext.Provider>
    )
}