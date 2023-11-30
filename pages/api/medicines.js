import {Medicines} from "@/models/Medicines";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handle(req, res) {
    const { method } = req;
    await mongooseConnect();
    if (method === 'PUT'){
        const { title, description, price,_id,image,expirydate } = req.body;
        await Medicines.updateOne({_id},{title,description,price,image,expirydate})
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
        const { title, description, price,image,expirydate} = req.body;
        
        try {
           // const decodedImage = Buffer.from(image, 'base64');
            const medicineDoc = await Medicines.create({
                title,
                description,
                price,
                image,
                expirydate,
            });
            res.status(201).json(medicineDoc);
        } catch (error) {
            res.status(500).json({ error: 'Could not create medicine.' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
    
}