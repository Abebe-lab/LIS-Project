import { jwtDecode } from "jwt-decode";

const decodeJwt=(encoded)=>{
        return jwtDecode(encoded);
}
export{
    decodeJwt,
}