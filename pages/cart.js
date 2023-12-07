import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import ClockLoading from "@/components/ClockLoading";
import Header from "@/components/Header";
import Table from "@/components/Table";
import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import styled from "styled-components";

const ColumnWrapper = styled.div`
display:grid;
grid-template-columns: 1fr;
@media screen and (min-width:768px){
    grid-template-columns: 1.2fr .8fr;
}
gap:40px;
margin-top:40px;
`
const Box = styled.div`
background-color:#d9d4d4;
border-radius:10px;
padding:20px;
`
const QuantityLabel = styled.span`
padding:0 15px;
display:block;
@media screen and (min-width:768px){
   display:inline-block;
   padding: 0 10px;
}
`
const CityHolder = styled.div`
display:flex;
gap:5px;

`
export default function CartPage(){
    const {cartMedicines,addMedicine,removeMedicine,clearCart} = useContext(CartContext)
    const [medicines,setMedicines] = useState([])
    const [name,setName] = useState('')
    const [phoneno,setPhoneNo] = useState('')
    const [nic,setNic] = useState('')
    const [address,setAdress] = useState('')
    const [city,setCity] = useState('')
    const [email,setEmail] = useState('')
    const [isloading,setIsLoading] = useState(false)
    const router = useRouter()

    useEffect(() => {
        if(cartMedicines.length > 0){
            setIsLoading(true)
            axios.post('api/cart',{ids:cartMedicines}).then(response =>{
                setMedicines(response.data)
                setIsLoading(false)
            })
        }else {
            setMedicines([])
        }
    },[cartMedicines])
    
    async function GoToPayment(){
        try {
            const response = await axios.post('/api/checkout', {
              name,
              phoneno,
              nic,
              email,
              address,
              city,
              cartMedicines,
            });
            
            if (response.data) {
              clearCart()
              toast.success('Order successful!')
              router.push('/');
            }
          } catch (error) {
            console.error(error);
            toast.error('Payment failed. Please try again.');
          }

          
    }
    function moreOfThisMedicine(id){
        addMedicine(id)
    }
    function lessOfThisProduct(id){
        removeMedicine(id)
    }
    let total=0
    for(const medicineId of cartMedicines){
        const price = medicines.find(p => p._id === medicineId)?.price || 0
        total += price
    }
    const checkExpiryDate = (expirydate) => {
        const expiry = new Date(expirydate);
        const today = new Date();
        const differenceInTime = expiry.getTime() - today.getTime();
        const differenceInDays = differenceInTime / (1000 * 3600 * 24);

        return differenceInDays <= 30 && differenceInDays > 0;
    };
    
    return (
        <>
        <div>
            <Toaster/></div>
        <Header/>
        <Center>
        <ColumnWrapper>
        <Box>
        <h1> <b>Cart</b></h1>
            {!cartMedicines?.length &&(
                <div> Your Cart is Empty</div>
            ) }
            {
                isloading?(
                    <div className="flex items-center justify-center">
                    <div>
                        <ClockLoading/>
                    </div>
                </div>
                ):(
            medicines?.length > 0 && (
            
                <Table>
                <thead>
                    <tr>
                        <th> Medicine Name</th>
                        <th> Expires On</th>
                        <th> Quantity</th>
                        <th> Price</th>
                    </tr>
                </thead>
                <tbody>
                {medicines.map(medicine => (
                    <tr key={medicine._id}>
                        <td>
                            {medicine.title} 
                        </td>
                        {
                            checkExpiryDate(medicine.expirydate)?(
                                <td className={checkExpiryDate(medicine.expirydate)?" rounded-md bg-red-600 font-bold ":"text-center"} >
                                    {medicine.expirydate ? new Date(medicine.expirydate).toLocaleDateString() : 'No Expiry Date'}
                                    </td>
                            ):(
                                <td>
                                    {medicine.expirydate ? new Date(medicine.expirydate).toLocaleDateString() : 'No Expiry Date'}
                                    </td>
                            )
                        }
                        
                        <td>
                            <Button white onClick ={() => lessOfThisProduct(medicine._id)}> - </Button>
                            <QuantityLabel>
                            {cartMedicines.filter(id => id === medicine._id).length} 
                            </QuantityLabel>
                            
                            <Button white onClick={() => moreOfThisMedicine(medicine._id) } > + </Button>
                        </td>
                        <td>
                            Rs.{cartMedicines.filter(id => id === medicine._id).length * medicine.price}
                        </td>
                    </tr>
                    ))}
                     <tr>
                        <td>Total</td>
                        <td></td>
                        <td></td>
                        <td><b><u>Rs.{total}</u>  </b> </td>
                    </tr>
                    
                </tbody>
            </Table>
            )
            )}
        </Box>
        {!!cartMedicines?.length && (
            <Box>
            <h1><b> Order Information </b></h1>
            
            <input type="text" placeholder="Name" value={name} name="name" onChange={ev => setName(ev.target.value)}/>
            <input type="text" placeholder="PhoneNo" value={phoneno} name="phoneno" onChange={ev => setPhoneNo(ev.target.value)}/>
            <input type="text" placeholder="NIC" value={nic} name="nic" onChange={ev => setNic(ev.target.value)}/>
            <input type="email" placeholder="E-mail" value={email} name="email" onChange={ev => setEmail(ev.target.value)}/>
            <CityHolder>
            <input type="text" placeholder="Address" value={address} name="address" onChange={ev => setAdress(ev.target.value)}/>
            <input type="text" placeholder="City" value={city} name="city" onChange={ev => setCity(ev.target.value)}/>
            </CityHolder>
            
            <Button onClick={GoToPayment} block primary>Continue to Payment</Button>
        
        </Box>
        )}
        </ColumnWrapper>
        </Center>
        
        </>
        

    )
}