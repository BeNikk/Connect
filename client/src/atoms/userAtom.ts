import { atom } from "recoil";


let defaultdata=(localStorage.getItem("user-Info"));
if(!defaultdata){
    defaultdata=null;
}

const userAtom=atom({
    key:"userAtom",

    default:defaultdata
})

export default userAtom;