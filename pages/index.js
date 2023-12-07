import Featured from "@/components/Featured";
import Header from "@/components/Header";
import Layout from "@/components/Layout";
import NewMedicines from "@/components/NewMedicines";
import { mongooseConnect } from "@/lib/mongoose";
import {Medicines} from "@/models/Medicines"
import { useSession } from "next-auth/react";

export default function Home({featuredMedicine,newMedicines}) {
  const {data:session} = useSession()
 return(
  
    !session ?(<Layout/>):(
      <div>
           <Header/>
           <Featured medicine={featuredMedicine}/>
           <NewMedicines medicines={newMedicines}/>      
  </div>
    )
 )
}

export async function getServerSideProps(){
  await mongooseConnect()
  const newMedicines = await Medicines.find({},null,{sort:{updatedAt:-1},limit:8})
  return{
    props: {
      newMedicines:JSON.parse(JSON.stringify(newMedicines)),
     }
  }
}
