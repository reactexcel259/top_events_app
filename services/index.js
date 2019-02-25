import axios from "axios";
import { BASE_URL } from "../config/index";

export default function fireAjax(method, URL) {
 const url =URL;
 let config = {};
 if (URL !== "user/login" && URL !== "user/register") {
   config = {
     headers: {
       "Content-Type": "application/json",
     }
   };
 } else {
   config = {
     headers: {
       "Content-Type": "application/json"
     }
   };
 }
 if (method === "GET") {
   
   return axios.get(url)
 } else if (method === "POST") {
   return axios.post(url, data, config);
 }
}
  