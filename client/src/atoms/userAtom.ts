import { atom } from "recoil";


let defaultdata=(localStorage.getItem("user-Info"));
if(defaultdata){
    defaultdata=JSON.parse(defaultdata);
}

const userAtom=atom({
    key:"userAtom",

    default:defaultdata
})

export default userAtom;