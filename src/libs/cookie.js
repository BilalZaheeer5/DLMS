import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
const Secret_Key = "932jKLD((@)@*@3984"; // secret key for encryption
export function setCookie(key, value) {
  // set cookie
  const encryptedData = CryptoJS.AES.encrypt(value, Secret_Key);
  Cookies.set(key, encryptedData);
}
export function getCookie(key) {
  // get cookie
  const data = Cookies.get(key);
  if (data) {
    const decryptedData = CryptoJS.AES.decrypt(data, Secret_Key);
    return decryptedData;
  }
}
export function deleteCookie(key) {
  // delete the cookie
  try {
    Cookies.deleteCookie(key);
  } catch {}
}
