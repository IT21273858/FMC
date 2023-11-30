import Layout from "@/components/Layout";
import { useRouter} from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import MedicineForm from "@/components/MedicineForm";

export default function EditMedicinePage(){
    const [medicineInfo,setMedicineInfo] = useState(null)
    const router=useRouter()
    const {id} = router.query
    useEffect(()=> {
        if(!id){
            return
        }
        axios.get('/api/medicines?id='+id).then(response =>{
            setMedicineInfo(response.data)
        })
    },[id])
    return(
        <Layout>
            <h1>Edit Product</h1>
            {medicineInfo && ( <MedicineForm {...medicineInfo} />)}
        </Layout>
    )
}