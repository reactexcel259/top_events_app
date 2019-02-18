import axios from "axios";
import { BASE_URL } from "../config/index";

export default function fireAjax(method, URL, data, header) {
 const url = BASE_URL + URL;
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
   return axios.get(url, config.headers)
 } else if (method === "POST") {
   return axios.post(url, data, config);
 }
}
  