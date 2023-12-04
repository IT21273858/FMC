// Assuming this is your backend API route: api/medicines.js

import { Medicines } from "@/models/Medicines";
import { mongooseConnect } from "@/lib/mongoose";
import { isAdminRequest } from "./auth/[...nextauth]";

export default async function handle(req, res) {
    const { method, query: { search } } = req; // Extracting the search term from query parameters

    await mongooseConnect();
    await isAdminRequest(req, res);

    

    if (method === 'GET') {
        try {
            if (search) {
                // Search for medicines based on title or gname (use appropriate regex or search criteria)
                const searchResults = await Medicines.find({
                    $or: [
                        { title: { $regex: new RegExp(search, 'i') } }, // Case-insensitive search for title
                        { gname: { $regex: new RegExp(search, 'i') } }, // Case-insensitive search for gname
                    ]
                });

                res.status(200).json(searchResults);
            } else {
                // Return all medicines if no search term is provided
                const allMedicines = await Medicines.find();
                res.status(200).json(allMedicines);
            }
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
