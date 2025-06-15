const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
const getHashPassword=(password)=>{
    const hashedPassword=password;//hashedpassword;
    return hashedPassword;
}
export {passwordRegex,getHashPassword}