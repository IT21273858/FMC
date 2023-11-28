import Layout from "@/components/Layout";
import axios from "axios";
import { useState } from "react";

export default function NewMedicine(){
    const [title,setTitle] = useState('')
    const [description,setDescription] = useState('')
    const [price,setPrice] = useState('')

    async function createmedicine(ev){
        ev.preventDefault()
        const data={title,description,price}
        try {
            const response = await axios.post('/api/medicines', data);
            console.log('Medicine created:', response.data);
        } catch (error) {
            console.error('Error creating medicine:', error);
        }
    }

    return (
        <Layout>
            <form onSubmit={createmedicine}>
            <h1><b>New Medicine</b></h1>
            <label>Medicine Name</label>
            <input type="text" placeholder="Medicine Name" value={title} onChange={ev => setTitle(ev.target.value)}/>
            <label>Description</label>
            <textarea placeholder="description" value={description} onChange={ev => setDescription(ev.target.value)}></textarea>
            <label>Price</label>
            <input type="number" placeholder="Price" value={price} onChange={ev => setPrice(ev.target.value)}/>
            <button type="submit" className="btn-primary">Save</button>
            </form>
        </Layout>
    )
}