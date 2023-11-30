import Layout from "@/components/Layout";
import  useRouter  from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

export default function DeleteProductPage(){
    const router = useRouter
    const {id} = router.query
    const [medicineInfo,setMedicineInfo] = useState()
    useEffect(()=>{
        if(!id){
            return 
        }

        axios.get('/api/medicines?id='+id).then(response =>{
           setMedicineInfo(response.data)
        })
    })
    async function deleteMedicine(){
      await  axios.delete('/api/medicines?id='+id)
      goback()
    }
    function goback(){
        router.push('/medicines')
    }
return (
    <Layout>
       <h1 className="text-center">Do you really want to delete &nbsp;"{medicineInfo?.title}"? </h1>
       <div className="flex gap-2 justify-center">
       <button className="btn-red" onClick={deleteMedicine}>Yes</button>
        <button onClick={goback} className="btn-default">No</button>
        </div> 
        
    </Layout>
)
}