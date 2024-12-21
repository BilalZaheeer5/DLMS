'use client'
import React, { useEffect, useState } from "react";
import style from "./page.module.scss";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { MdAdd } from "react-icons/md";
import { GetLicenc } from "@/libs/ServerActions";
import { useRouter } from "next/navigation";
export default function Admin() {
  const [records,setRecords] = useState([])
  const [search,setSearch] = useState('')
  const router = useRouter()
  useEffect(()=>{
    GetLicenc(null).then(res=>{
      if(res.status_code==200){
        setRecords(res.data)
      }
    })
  },[])
  const data = records;
  return (
    <div className={style.container}>
      <div className={style.navBar}>
        <p>Driving Licence Information Management Software</p>
        <div className={style.btn}>
        <button>Logout</button>
        <button onClick={()=>{router.push('/')}}>View Site</button>
        </div>
      </div>
      <div className={style.screen}>
        <div className={style.topbar}>
          <input type="text" placeholder="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}} />
          <button><MdAdd className={style.icon}/> Add New</button>
        </div>
        <div className={style.table}>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>CNIC</th>
                <th>Father/Husband Name</th>
                <th>City</th>
                <th>State</th>
                <th>Licence Number</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {data.length>0?data.filter((v) => v.cnic.toLowerCase().includes(search.toLowerCase())).map((rec,index)=>{
                return(
                  <tr key={index}>
                  <td>{index+1}</td>
                  <td>{rec.full_name}</td>
                  <td>{rec.cnic}</td>
                  <td>{rec.father_husband_name}</td>
                  <td>{rec.city}</td>
                  <td>{rec.state}</td>
                  <td>{rec.licence_number}</td>
                  <td>
                    <button className={style.edit}><FaEdit /></button>
                    <button className={style.delete}><MdDelete /></button>
                  </td>
                </tr>
                )
              }):null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
