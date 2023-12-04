import { mongooseConnect } from "@/lib/mongoose";
import {Medicines} from "@/models/Medicines"
export default async function handle (req,res){
    await mongooseConnect();
    const ids =req.body.ids
    res.json(await Medicines.find({_id:ids}))
}