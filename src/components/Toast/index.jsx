import React from 'react'
import ReactDOM from 'react-dom'
import style from "./Toast.module.scss"
import { IoIosWarning } from "react-icons/io";
import { FaInfoCircle } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import { MdError } from "react-icons/md";
export default function Toast({message,type,setShowToast}) {
  const iconType = {
    "success":<FaCircleCheck color='green' className={style.icon}/>,
    "error":<MdError color='red' className={style.icon}/>,
    "info":<FaInfoCircle color='blue' className={style.icon}/>,
    "warning":<IoIosWarning color='yellow' className={style.icon}/>
  }
  setTimeout(() => {
    setShowToast({isOpen:false})
  }, 2000);
  return ReactDOM.createPortal (
    <section className={style.container}>
        <div className={style.toast}>
            {iconType[type]}
            <p>{message}</p>
        </div>
    </section>
  ,document.querySelector('.modelContainer'))
}
