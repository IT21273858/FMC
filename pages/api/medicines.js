import { Medicines } from "@/models/Medicines";
import { mongooseConnect } from "@/lib/mongoose";
import { isAdminRequest } from "./auth/[...nextauth]";

export default async function handle(req, res) {
   
    const { method } = req;
    await mongooseConnect();
    await isAdminRequest(req,res)
    
    if (method === 'PUT'){
        const { title,gname, description, price,quantity,_id,image,expirydate,category,properties} = req.body;
        await Medicines.updateOne({_id},{
            title,
            gname,
            description,
            price,
            quantity,
            image,
            expirydate,
            category,
            properties,
        })
        res.json(true)
    }
    if(method === 'DELETE'){
        if(req.query?.id){
            await Medicines.deleteOne({_id:req.query?.id})
            res.json(true)
        }
    }
    if(method === 'GET'){
        if(req.query?.id){
            
            res.json(await Medicines.findOne({_id:req.query.id}))
        }else{
           
            res.json(await Medicines.find())
        }      
      
        
    }
    if (method === 'POST') {
        
        const { title,gname, description, price,quantity,image,expirydate,category,properties} = req.body;
        
        try {
            const medicineDoc = await Medicines.create({
                title,
                gname,
                description,
                price,
                quantity,
                image,
                expirydate,
                category,
                properties,
            });
            res.status(201).json(medicineDoc);
        } catch (error) {
            res.status(500).json({ error: 'Could not create medicine.' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }

    if(method === 'UPDATE'){
        const {_id,quantity} =req.body;
        await Medicines.updateOne({_id},{quantity});
        res.json(true)
    }
    
}