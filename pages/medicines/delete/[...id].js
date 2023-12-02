import Layout from "@/components/Layout";
import  useRouter  from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "@/components/Loading";

export default function DeleteProductPage(){
    const router = useRouter
    const {id} = router.query
    const [medicineInfo,setMedicineInfo] = useState()
    const [isLoading,setIsLoading] = useState(false)
    useEffect(() => {
        if (!id) {
            return;
        }
        setIsLoading(true);
        axios.get('/api/medicines?id=' + id)
            .then(response => {
                setMedicineInfo(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                // Handle errors if needed
                setIsLoading(false);
            });
    }, []); // Empty dependency array to run the effect only once
    
    async function deleteMedicine(){
      await  axios.delete('/api/medicines?id='+id)
      goback()
    }
    function goback(){
        router.push('/medicines')
    }
return (
    
    <Layout>
        {isLoading?(
        <div className="flex items-center justify-center h-screen">
            <div>
                <Loading />
            </div>
        </div>):(
            <div>
                <h1 className="text-center">Do you really want to delete &nbsp;"{medicineInfo?.title}"? </h1>
       <div className="flex gap-2 justify-center">
       <button className="px-4 py-1 btn-red mt-1" onClick={deleteMedicine}>Yes</button>
        <button onClick={goback} className="btn-default">No</button>
        </div> 
            </div>
       
        )}
    </Layout>
    
)
}