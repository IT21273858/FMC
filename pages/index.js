import Featured from "@/components/Featured";
import Header from "@/components/Header";
import NewMedicines from "@/components/NewMedicines";
import { mongooseConnect } from "@/lib/mongoose";
import { useSession } from "next-auth/react";
import Link from "next/link";
import {Medicines} from "@/models/Medicines"

export default function Home({featuredMedicine,newMedicines}) {
 
  const {data:session} = useSession()
 return(
 
        <div>
           <Header>
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
           </Header>
           <Featured medicine={featuredMedicine}/>
           <NewMedicines medicines={newMedicines}/>
        <div className="text-black-400 flex justify-between" >
        <Link href={'/adminuser'} >
        <svg  viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6"> 
          <path fill-rule="evenodd" clip-rule="evenodd" d="M20 4C18.3431 4 17 5.34315 17 7H13C11.3431 7 10 8.34315 10 10V41C10 42.6569 11.3431 44 13 44H35C36.6569 44 38 42.6569 38 41V10C38 8.34315 36.6569 7 35 7H31C31 5.34315 29.6569 4 28 4H20ZM19 7C19 6.44772 19.4477 6 20 6H28C28.5523 6 29 6.44772 29 7V9C29 9.55228 28.5523 10 28 10H20C19.4477 10 19 9.55228 19 9V7ZM19 15V18H16V20H19V23H21V20H24V18H21V15H19ZM17 26C16.4477 26 16 26.4477 16 27C16 27.5523 16.4477 28 17 28H31C31.5523 28 32 27.5523 32 27C32 26.4477 31.5523 26 31 26H17ZM16 32C16 31.4477 16.4477 31 17 31H31C31.5523 31 32 31.4477 32 32C32 32.5523 31.5523 33 31 33H17C16.4477 33 16 32.5523 16 32ZM17 36C16.4477 36 16 36.4477 16 37C16 37.5523 16.4477 38 17 38H31C31.5523 38 32 37.5523 32 37C32 36.4477 31.5523 36 31 36H17Z" 
                fill="black"/>
        </svg>
              Admin
      </Link>
    </div>   
      
  </div>
  
  
 )
}

export async function getServerSideProps(){
  const featuredMedicineId ='65663abe0cc257467d73a5a2'
  await mongooseConnect()
  const featuredMedicine = await Medicines.findById(featuredMedicineId)
  const newMedicines = await Medicines.find({},null,{sort:{'_id':-1},limit:10})
  return{
    props: {
      featuredMedicine:JSON.parse(JSON.stringify(featuredMedicine)),
      newMedicines:JSON.parse(JSON.stringify(newMedicines))
     }
  }
}
