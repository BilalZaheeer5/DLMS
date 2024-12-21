"use client";
import Image from "next/image";
import styles from "./page.module.scss";
import { imagePaths } from "@/constants/ImagePath";
import React, { useContext, useEffect, useRef, useState } from "react";
import { TfiLayoutLineSolid } from "react-icons/tfi";
import { GetLicenc } from "@/libs/ServerActions";
import { ToastContext } from "@/context/ToastContext";
import Lottie from "lottie-react";
import searchingLottie from "@/lottie/search.json"
import errorLottie from "@/lottie/error.json"
import { useRouter } from "next/navigation";
import { recordContext } from "@/context/recordContext";
export default function Home() {
  const [cnic, setCnic] = useState(new Array(13).fill(""));
  const [searching,setSearching] = useState(false)
  const [found,setFound] = useState(true)
  const inputRefs = useRef([]);
  const router = useRouter()
  const {setShowToast} = useContext(ToastContext)
  const {setRecord} = useContext(recordContext)
  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/[^0-9]/.test(value)) return; // Only allow digits
    const newOtp = [...cnic];
    newOtp[index] = value;
    setCnic(newOtp);
    // Focus next input
    if (value && index < cnic.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Move focus backward if backspace is pressed
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !cnic[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };
  const verifyCnic=(e)=>{
    e.preventDefault()
    const CNIC = cnic.join('')
    if (CNIC.length<13){
      setShowToast({isOpen:true,message:"Invalid CNIC",type:"error"})
    }else{
      if(!searching){        
        setSearching(true)
        setFound(true)
        GetLicenc(CNIC).then(res=>{
          if (res.status_code==200){
            setRecord(
              {
                id: res.data.id,
                userImage: res.data.user_image,
                cnic: res.data.cnic,
                fullName: res.data.full_name,
                fatherHusbandName: res.data.father_husband_name,
                city: res.data.city,
                state: res.data.state,
                licenceNumber: res.data.licence_number,
                issueDate: res.data.issue_date,
                validFrom: res.data.valid_from,
                validTo: res.data.valid_to,
                allowedVehicles: res.data.allowed_vehicles,
                isInternational: res.data.is_international,
            })
            setFound(true)
            setTimeout(() => {
              setSearching(false)
              setShowToast({isOpen:true,message:"Record Found!",type:"success"})
              router.push('/record')
            }, 2000);
          }else{
            setFound(false)
            setTimeout(() => {
                setSearching(false)
            }, 2000);
          }
        })
      }
    }
  }
  
  const [btnDisabled,setBtnDisabled] = useState(true)
  useEffect(()=>{
    cnic.filter((i)=>{
      if (i==""){
        setBtnDisabled(true)
      }else{
        setBtnDisabled(false)
      }
    })
  },[cnic])
  return (
    <div className={styles.container}>
      {searching?
      <div className={styles.searchcontainer}>
        <div className={styles.searchBox}>
            <Lottie animationData={found?searchingLottie:errorLottie} loop={found?true:false} className={styles.lottie}/>
            <p>{found?"Searching Record...":"Record Not Found!"}</p>
        </div>
      </div>
      :""}
      <div className={styles.wave}></div>
      <div className={styles.wave}></div>
      <div className={styles.wave}></div>
      <div className={styles.box}>
        <Image
          src={imagePaths.Logo}
          width={0}
          height={0}
          sizes="100%"
          alt="Not Found"
        />
        <div className={styles.varificationPanel}>
          <h1>Verification Panel</h1>
            <p>Enter CNIC Here</p>
          <form onSubmit={(e)=>{verifyCnic(e)}}>
            <div className={styles.inputDigits}>
              {cnic.map((digit, index) => {
                return (
                  <React.Fragment key={index}>
                    <input
                      type="text"
                      ref={(el) => (inputRefs.current[index] = el)}
                      onChange={(e) => handleChange(e, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      maxLength="1"
                      className="otp-input"
                      autoFocus={index === 0}
                      value={digit}
                    />
                    {index == 4 ? <TfiLayoutLineSolid className={styles.icon} /> : ""}
                    {index == 11 ? <TfiLayoutLineSolid className={styles.icon} /> : ""}
                  </React.Fragment>
                );
              })}
            </div>
            <button disabled={btnDisabled} type="submit" style={btnDisabled?{opacity:"80%"}:{opacity:"100%"}}>Verify</button>
          </form>
        </div>
      </div>
    </div>
  );
}
