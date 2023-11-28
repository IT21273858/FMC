import Medicines from "../medicines";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handle(req, res) {
    const { method } = req;
    await mongooseConnect();

    if (method === 'POST') {
        const { title, description, price } = req.body;

        try {
            const medicineDoc = await Medicines.create({
                title,
                description,
                price,
            });
            res.status(201).json(medicineDoc);
        } catch (error) {
            res.status(500).json({ error: 'Could not create medicine.' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}