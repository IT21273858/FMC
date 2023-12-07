import { mongooseConnect } from "@/lib/mongoose"
import {Medicines} from "@/models/Medicines"
import { Order } from "@/models/Order"
export default async function handle(req,res){
    if(req.method !== 'POST'){
        res.json('Should be a POST request')
        return
    }

    const {
        name,phoneno,nic,email,
        address,city,
        cartMedicines,
    } = req.body
    await mongooseConnect()
    const medicinesId =cartMedicines
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
                        name:medicineinfo.title,
                        unit_amount:quantity*medicineinfo.price,
                    },
                },
                categoryinfo:{
                    cinfo:medicineinfo.properties
                }
            })
            try {
                // Deduct the quantity from the available stock
                await Medicines.updateOne(
                    { _id: medicineId },
                    { $inc: { quantity: -quantity } }
                );
            } catch (error) {
                console.log(error);
            }
        }
                 
    }
    const orderDoc = await Order.create({
        line_items,name,phoneno,nic,email,address,city,paid:true,
    })
    res.json({
        orderDoc
    })
}

