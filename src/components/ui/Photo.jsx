import { useEffect, useState } from "react";

function Photo({handler , fileUrl , getPrview}) {

    const [previewUrl , setPreviewUrl] = useState()

    useEffect(()=>{
        if(fileUrl){
            const reader = new FileReader();
           reader.onload = ()=>{
             setPreviewUrl(reader.result);
           }

           reader.onerror = (err)=>{
            console.log(err);
           }

           reader.readAsDataURL(fileUrl)
        }

        if(previewUrl){
            getPrview(previewUrl)
        }
    })

  return (
    <>
       <label htmlFor="photo" className="w-full p-2 bg-white cursor-pointer rounded-md">Photo</label>
         <input type="file" name="photo" id="photo"  className="w-full " hidden  onChange={handler} accept="image/*"  />
    </>
  )
}

export default Photo