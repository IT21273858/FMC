import axios from "axios";
import  useRouter from "next/router";
import { useState } from "react";
const today = new Date().toISOString().split('T')[0]; // Get today's date in "YYYY-MM-DD" format
export default function MedicineForm({
    _id,
    title:existingTitle,
    description:existingDecription,
    price:existingPrice,
    image:existingImage,
    expirydate:existingDate,
}){

    const [title,setTitle] = useState(existingTitle || '')
    const [description,setDescription] = useState(existingDecription ||'')
    const [price,setPrice] = useState(existingPrice ||'')
    const [Image,setMediImage] = useState(existingImage || {img: ''})
    const [tmpimg,setTempimg] =useState()
    const [imgstatus,setImgStatus] = useState(false)
    const [expirydate,setExpiryDate] = useState(existingDate|| '')
    const [goToMedicines,setGotoMedicines] = useState(false)
    const router = useRouter
    async function savemedicine(ev){

        if(expirydate<=today){
            alert("Expiry Date must be greater than today.")
            return
        }

        const imageBase64 = Image.img;
        const data={title,description,price, image: imageBase64,expirydate}
        ev.preventDefault()
        console.log(data)
        if(_id){
            await axios.put('/api/medicines',{...data,_id})
        }else{
        try {
            await axios.post('/api/medicines', data);
        } catch (error) {
            console.error('Error creating medicine:', error);
        }
        }
        setGotoMedicines(true)
        
    }
    if(goToMedicines){
        router.push('/medicines')
    }

    function convertToBase64(file){
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    }
    
    async function uploadImages(ev){
        const file =ev.target.files[0]
        const base64 = await convertToBase64(file)
        setImgStatus(true)
        setMediImage({...Image,img: base64})
        setTempimg(base64)
    }
    return (
        
            <form onSubmit={savemedicine}>
            <label className="flex gap-1 mb-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-medicine-syrup" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"> 
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/> <path d="M8 21h8a1 1 0 0 0 1 -1v-10a3 3 0 0 0 -3 -3h-4a3 3 0 0 0 -3 3v10a1 1 0 0 0 1 1z" /> <path d="M10 14h4" /> <path d="M12 12v4" /> <path d="M10 7v-3a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v3" />
                 </svg>
            Medicine Name</label>
            <input type="text" placeholder="Medicine Name" value={title} onChange={ev => setTitle(ev.target.value)}/>
                <label className="flex gap-1 mb-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                    Images</label>
            <div className="mb-2 flex">
                <label className="w-24 h-24 cursor-pointer text-center flex flex-col items-center justify-center rounded-lg bg-gray-200">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                     <path stroke-linecap="round" stroke-linejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15" />
                    </svg>
                    <div className="text-gray-400">
                    Upload
                    </div>
                    <input type="file" onChange={uploadImages} accept="image/*" className="hidden" id="img" name='img' />
                </label>
                <label className=" w-24 h-24 flex flex-col ml-5 ">{imgstatus?(<img src={tmpimg} style={{ maxWidth: '100px'}} className="rounded-lg " />):(<div>No Photos in this Product</div>)}</label>
                
            </div>
            <label className="flex gap-1 mb-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                </svg>
                 Description</label>
            <textarea placeholder="description" value={description} onChange={ev => setDescription(ev.target.value)}></textarea>
            <label className="flex gap-1 mb-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                </svg>
                Expiry Date</label>
            <input type="date" value={expirydate} onChange={(ev) => setExpiryDate(ev.target.value)} min={today}/>
            <label className="flex gap-1 mb-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                </svg>
                Price</label>
            <input type="number" placeholder="Price" value={price} onChange={ev => setPrice(ev.target.value)}/>
            <button type="submit" className="btn-primary">Save</button>
            </form>
       
    )
}