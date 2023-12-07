import Layout from "@/components/Layout";
import ScaleLoading from "@/components/ScaleLoading";
import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";


const ColumnWrapper = styled.div`
align-items: center;
display:grid;
grid-template-columns: auto auto auto;
gap:50px;
`
const Column = styled.div`
border-top-left-radius: 40px;
    align-items: center;
    width:140px;
    padding: 2px;
   
  `
 const Row =styled.div`
 border-bottom: 2px solid #364445;
 align-items: center;
display:grid;
grid-template-columns: auto auto auto;
gap:auto;
  `
export default function OrdersPage(){
    const [orders,setOrders] = useState ([])
    const [isloading,setIsLoading] = useState (false)
    useEffect(()=>{
        setIsLoading(true)
        try {
            axios.get('api/orders').then(response =>{
                setOrders(response.data) 
                setIsLoading(false)
             })
        } catch (error) {
            console.log(error)
        }
        
    },[])
    var total=0;
    function setTotalZero(){
        total =0;
    }
    return (
        <Layout>
           <h1>
           Orders
           </h1>
           {
            isloading?(
                <div className="flex items-center justify-center h-screen">
                    <div>
                        <ScaleLoading />
                    </div>
                </div>):(
           
           <table className="secondary mt-4 border-blue-800 bg-gray-300">
            <thead>
                <tr>
                    <th>
                        Date
                    </th>
                    <th>
                        Patient Info
                    </th>
                    <th>
                        Medicines
                    </th>
                    <th>
                        Total Amount
                    </th>
                </tr>
            </thead>
            <tbody>
                {orders.length > 0 && orders.map(order => 

                    <tr className="text-center" key={order._id}>
                        <td className="text-center">
                            {(new Date(order.createdAt)).toLocaleString()}
                        </td>
                        <td>
                            {order.name} <br/> {order.phoneno} <br/>
                            {order.nic} <br/> {order.email} <br/>
                            {order.address} , {order.city}
                        </td> 
                        <td className="text-center">
                            {order.line_items.map(l => (
                                total += l.price_data?.medicine_data.unit_amount,
                                <Row key={l._id}>
                                    <Column>
                                    {l.price_data?.medicine_data.name} x {l.quantity}
                                    </Column>
                                    
                                    <Column>
                                    Rs.{l.price_data?.medicine_data.unit_amount} 
                                    </Column>
                                   
                                   <Column>
                                    {
                                        l.categoryinfo.cinfo &&  Object.entries(l.categoryinfo.cinfo).map(([key,value]) => 
                                            <div key={l.categoryinfo.cinfo.key} className="text-left" >
                                                {key} : {value}
                                            </div> )
                                    }
                                   </Column>
                                   
                                </Row>
                            ))}
                        </td>
                        <td className=" text-center">
                            Rs.{total}
                            {setTotalZero()}
                        </td>
                        
                    </tr>
                    
                )}
            </tbody>
           </table>
)}
        </Layout>
        
    )
}