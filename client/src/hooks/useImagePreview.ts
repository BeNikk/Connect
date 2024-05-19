import { useState } from "react"
import { toast } from "react-hot-toast";

const useImagePreview = () => {
    const [imageUrl,setImageUrl]=useState(null);
    
    const handleImageChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        if(e.target.files){

            const file=e.target.files[0];
            console.log(file);
            if(file && file.type.startsWith("image/")){
                const reader:any=new FileReader();
                reader.onloadend=()=>{
                    setImageUrl(reader.result);
                }
                reader.readAsDataURL(file);
            }else{
                toast.error("Invalid file type, Select an Image");
                setImageUrl(null);
                return;
            }
        }

    }
    return {handleImageChange,imageUrl,setImageUrl};
}

export default useImagePreview
