import Layout from "@/components/Layout";
import Loading from "@/components/Loading";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
export default function Medicines(){
    const [medicines,setMedicines] = useState([])
    const [expiringcount,setExpiringCount] =useState()
    const [isLoading,setIsLoading] =useState(false)
    useEffect(()=>{
        setIsLoading(true)
       axios.get('/api/medicines').then(response =>{
        setMedicines(response.data)
        const count = response.data.filter(medicines => checkExpiryDate(medicines.expirydate)).length
        setExpiringCount(count)
        setIsLoading(false)
       })
    },[])


    const checkExpiryDate = (expirydate) => {
        const expiry = new Date(expirydate);
        const today = new Date();
        const differenceInTime = expiry.getTime() - today.getTime();
        const differenceInDays = differenceInTime / (1000 * 3600 * 24);

        return differenceInDays <= 30 && differenceInDays > 0;
    };
    return (

        <Layout>
            <div className="flex justify-between items-center">
                <Link href={'/medicines/new'} className="bg-green-300 text-black py-1 px-2 rounded-md">Add new Medicine</Link>
                <div className="py-1 px-2 flex">
                <span className="text-black py-1 px-2 rounded-md bg-orange-600 ml-20">
                Expiring Medicines: {expiringcount} 
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6" className="mt-1 w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5" />
                </svg>
                </div>
                
            </div>
            {
                isLoading?(
                <div className="flex items-center justify-center h-screen">
                    <div>
                        <Loading />
                    </div>
                </div>):(
                
            <table className="basic mt-2 "style={{ borderRadius: '0px 20px 2px 5px', overflow: 'hidden' }}>
                <thead>
                    <tr>
                        <td className="text-center"> <b>Medicine Name</b> </td>
                        <td className="text-center"> <b>Description</b>   </td>
                        <td className="text-center"> <b>Image</b>         </td>
                        <td className="text-center"> <b>Expiry Date</b>   </td>
                        <td className="text-center"> <b>Action</b>        </td>
                    </tr>
                </thead>
                <tbody>
                    {medicines.map(medicines =>(
                        <tr key={medicines._id}>
                            <td className="text-center" style={{ backgroundColor: checkExpiryDate(medicines.expirydate) ? 'red' : 'transparent' }}> {medicines.title} </td>
                            <td className="text-center"> {medicines.description }</td>
                            <td className="text-center">
                            {medicines.image ? (
                                    <img src={medicines.image} alt="Medicine" style={{ display: 'block', margin: '0 auto', maxWidth: '100px' }} className="rounded-lg " />
                                ): (<span>No Image</span>)}
                            </td>
                            <td className="text-center">
                            {medicines.expirydate ? new Date(medicines.expirydate).toLocaleDateString() : 'No Expiry Date'}
                            </td>
                            <td className="text-center"> 
                                <Link href={'/medicines/edit/'+medicines._id}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                    </svg>
                                    Edit
                                </Link>
                                <Link href={'/medicines/delete/'+medicines._id}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg>
                                    Delete
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
        )}
        </Layout>
    )
}