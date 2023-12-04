import { mongooseConnect } from "@/lib/mongoose"
import {Medicines} from "@/models/Medicines"
export default async function handle(req,res){
    if(req.method !== 'POST'){
        res.json('Should be a POST request')
        return
    }

    const {
        name,phoneno,nic,
        address,city,postalcode,
        medicines,
    } = req.body
    await mongooseConnect()
    const medicinesId =medicines?.split(',')
    const uniqueIds = [...new Set(medicinesId)]
    const medicinesInfos = await Medicines.find({_id:uniqueIds})

    let line_items = []
    for(const medicineId of uniqueIds){
        const medicineinfo = medicinesInfos.find(p => p._id.toString() === medicineId )
        const quantity = medicinesId.filter(id => id === medicineId)?.length || 0
        if(quantity > 0 && medicineinfo){
            line_items.push({
                quantity,
                price_data:{
                    currency: 'RS',
                    medicine_data:{
                        name:medicineinfo.name,
                        unit_amount:quantity*medicineinfo.price,
                    }
                }
            })}
            res.json({line_items})
    }
    
}
