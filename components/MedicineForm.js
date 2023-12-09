import axios from "axios";
import  useRouter from "next/router";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import Loading from "./Loading";
const today = new Date().toISOString().split('T')[0]; // Get today's date in "YYYY-MM-DD" format
export default function MedicineForm({
    _id,
    title:existingTitle,
    gname:existingGName,
    description:existingDecription,
    price:existingPrice,
    quantity:existingQuantity,
    image:existingImage,
    expirydate:existingDate,
    category:existingCategory,
    properties:assignedProperties,
}){

    const [title,setTitle] = useState(existingTitle || '')
    const [gname,setGname] = useState(existingGName || '')
    const [category,setCategory] = useState(existingCategory || '')
    const [medicineProperties,setMedicineProperties] = useState(assignedProperties || {})
    const [description,setDescription] = useState(existingDecription ||'')
    const [price,setPrice] = useState(existingPrice ||'')
    const [quantity,setQuantity] =useState(existingQuantity || '')
    const [Image,setMediImage] = useState(existingImage || {img: ''})
    const [tmpimg,setTempimg] = useState()
    const [imgstatus,setImgStatus] = useState(false)
    const [isLoading,setIsLoading] = useState(false)
    const [isUploading,setIsUploading] = useState(false)
    const [expirydate,setExpiryDate] = useState(existingDate|| '')
    const [goToMedicines,setGotoMedicines] = useState(false)
    const router = useRouter
    const [categories,setCategories] = useState([])

    useEffect(() => {
        setIsLoading(true)
        axios.get('/api/categories').then(result => {
            setCategories(result.data)
            setIsLoading(false)
        })
        
    },[])
    async function savemedicine(ev){
        setIsLoading(true)
        if(expirydate<=today){
            alert("Expiry Date must be greater than today.")
            setIsLoading(false)
            return
        }

        const imageBase64 = Image.img;
        const data={title,gname,description,price,quantity, image: imageBase64,
            expirydate,category,
            properties:medicineProperties
        }
        ev.preventDefault()
        console.log(data)
        
        if(_id){
            await axios.put('/api/medicines',{...data,_id}).then(()=>{
                setIsLoading(false)
            })
            
        }else{
        try {
            await axios.post('/api/medicines', data);
            setIsLoading(false)
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
        setIsUploading(true)
        const file =ev.target.files[0]
        const base64 = await convertToBase64(file)
        setImgStatus(true)
        setMediImage({...Image,img: base64})
        setTempimg(base64)
        setIsUploading(false)
    }

    function setMedicineProp(propName,value){
        setMedicineProperties(prev => {
            const newMedicineProps = {...prev}
            newMedicineProps[propName] = value
            return newMedicineProps
        })
    }

    const propertiesToFIll = []
    if(categories.length >0 && category){
       let catInfo = categories.find(({_id}) => _id === category)
      propertiesToFIll.push(...catInfo.properties)
      while(catInfo?.parent?._id){
        const parentCat = categories.find(({_id}) => _id === catInfo?.parent?._id)
        propertiesToFIll.push(...parentCat.properties)
        catInfo = parentCat
      }
    }
    return (
        
            isLoading?(
            <div className="flex items-center justify-center h-screen">
                <div>
                    <Loading />
                </div>
            </div>):(
            <form onSubmit={savemedicine}>
            <label className="flex gap-1 mb-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>

            Brand Name</label>
            <input type="text" placeholder="Brand Name" value={title} onChange={ev => setTitle(ev.target.value)}/>
            <label className="flex gap-1 mb-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-medicine-syrup" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"> 
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/> <path d="M8 21h8a1 1 0 0 0 1 -1v-10a3 3 0 0 0 -3 -3h-4a3 3 0 0 0 -3 3v10a1 1 0 0 0 1 1z" /> <path d="M10 14h4" /> <path d="M12 12v4" /> <path d="M10 7v-3a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v3" />
                 </svg>
            Generic Name</label>
            <input type="text" placeholder="Generic Name" value={gname} onChange={ev => setGname(ev.target.value)}/>

            <label className="flex gap-1 mb-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z" />
                </svg>

                Category</label>
            <select value={category} onChange={ev =>setCategory(ev.target.value)}>
                <option value="">UnCategorised</option>
                {
                    categories.length >0 && categories.map(c => (
                        <option value={c._id} key={c._id}> {c.name} </option>
                    ))
                }
            </select>
            {propertiesToFIll.length > 0 && propertiesToFIll.map(p => (
                <div className="flex gap-1" key={p.name}>
                    <div> { p.name[0].toUpperCase()+p.name.substring(1) } : </div>
                    <div>
                    <select value={medicineProperties[p.name]} onChange={ev => setMedicineProp(p.name,ev.target.value) }>
                        {p.values.map(v => (
                            <option value={v} key={v}> {v} </option>
                        ))}
                        
                    </select>
                    </div>
                </div>
            ))
            }
                <label className="flex gap-1 mb-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                    Images</label>
            <div className="mb-2 flex">
                <label className="w-24 h-24 cursor-pointer text-center flex flex-col items-center justify-center rounded-lg bg-gray-100 shadow-md border border-gray-200">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                     <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15" />
                    </svg>
                    <div className="text-blue-800">
                    Upload
                    </div>
                    <input type="file" onChange={uploadImages} accept="image/*" className="hidden" id="img" name='img' />
                </label>
                {
                    isUploading &&(
                        <div className="h-24 items-center">
                            <Spinner/>
                            </div>
                    )
                }
                <label className=" w-24 h-24 flex flex-col ml-5 ">{imgstatus?(<img src={tmpimg} style={{ maxWidth: '100px'}} className="rounded-lg shadow-md " />):(<div>No Photos in this Product</div>)}</label>
                
            </div>
            <label className="flex gap-1 mb-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                </svg>
                 Description</label>
            <textarea placeholder="description" value={description} onChange={ev => setDescription(ev.target.value)}></textarea>
            <label className="flex gap-1 mb-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                </svg>
                Expiry Date</label>
                <input type="date" value={expirydate} onChange={(ev) => setExpiryDate(ev.target.value)} min={today} defaultValue={existingDate}/>

            <label className="flex gap-1 mb-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                </svg>
                Price(LKR)</label>
            <input type="number" placeholder="Price" value={price} onChange={ev => setPrice(ev.target.value)}/>
            <label className="flex gap-1 mb-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />
                </svg>
                Quantity</label>
            <input type="number" placeholder="Quantity" value={quantity} onChange={ev => setQuantity(ev.target.value)}/>
            <button type="submit" className="btn-primary">Save</button>
            </form>

            )
       
    )
}