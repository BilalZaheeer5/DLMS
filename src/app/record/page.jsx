'use client'
import React, { useContext } from "react";
import style from "./page.module.scss";
import { recordContext } from "@/context/recordContext";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { useRouter } from "next/navigation";
export default function Record() {
  const { record } = useContext(recordContext);
  const router = useRouter();
  return (
    <div className={style.container}>
      <div className={style.wave}></div>
      <div className={style.wave}></div>
      <div className={style.wave}></div>
      <button onClick={() => { router.back(); }} className={style.goBack}><IoArrowBackCircleSharp /></button>
      <div className={style.box}>
        <div className={style.userImage}>
          <img loading="lazy" src={record.userImage?record.userImage:"../../assets/Images/user.png"} alt="Not Found" />
        </div>
        <div className={style.infoBox}>
          <div className={style.userInfo}>
            <p><b>Name:</b> {record.fullName}</p>
            <p><b>CNIC:</b> {record.cnic}</p>
            <p><b>Father/Husband Name:</b> {record.fatherHusbandName}</p>
            <p><b>City:</b> {record.city}</p>
            <p><b>State:</b> {record.state}</p>
          </div>
          <div className={style.licenceInfo}>
            <p><b>License Number:</b> {record.licenceNumber}</p>
            <p><b>Issue Date:</b> {record.issueDate}</p>
            <p><b>Valid From:</b> {record.validFrom}</p>
            <p><b>Valid To:</b> {record.validTo}</p>
            <p><b>Allowed Vehicles:</b> {record.allowedVehicles}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
