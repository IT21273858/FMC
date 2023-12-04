import Featured from "@/components/Featured";
import Header from "@/components/Header";
import NewMedicines from "@/components/NewMedicines";
import { mongooseConnect } from "@/lib/mongoose";
import {Medicines} from "@/models/Medicines"

export default function Home({featuredMedicine,newMedicines}) {
 return(
        <div>
           <Header/>
           <Featured medicine={featuredMedicine}/>
           <NewMedicines medicines={newMedicines}/>      
  </div>
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
