import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function MedicineUser(){
    const {data:session} = useSession()
    return (
        <div>
    
    <Layout>
    <div className="text-black-400 flex justify-between" >
      <h2>
      Hello, <b>{session?.user?.name}</b>
      </h2>
     <div className="flex bg-gray-300 gap-1 text-black rounded-lg overflow-hidden">
     <img src={session?.user?.image} alt="" className="w-6 h-6"/>
     <span className="px-2"></span>
     {session?.user?.name}
     
     </div>
     
    </div>

  </Layout>
  </div>
    )
   
    
}