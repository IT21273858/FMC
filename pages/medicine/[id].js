import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Header from "@/components/Header";
import CartIcon from "@/components/icons/CartIcon";
import { mongooseConnect } from "@/lib/mongoose";
import {Medicines} from "@/models/Medicines";
import { useContext } from "react";
import styled from "styled-components";

const ColWrapper = styled.div`
display: grid;
grid-template-columns: .8fr 1.2fr;
gap:20px;
margin-top:20px;

`
const Box = styled.div`
background-color:#eee;
border-radius:10px;
padding:30px;
img{
    max-width:100%;
    max-height:100%;
}
`
const PriceRow = styled.div`
display:flex;
align-items: center;
gap:10px;
margin-top:2px;
margin-bottom:5px;
`
const Price = styled.span`
font-size:1.4rem;
font-weight:bold;
`
export default function MedicinePage({medicine}){
    const {addMedicine} =useContext(CartContext)
    return (
        <>
        <Header/>
        <Center>
            <h1>{medicine.title}</h1>
            <ColWrapper>
            <Box>
            <img src={medicine.image} alt={medicine.gname}/>
            </Box>
            <div>
                {medicine.title} ({medicine.gname})
                <p> {medicine.description}</p>
                <PriceRow>
                    <div>
                    <Price>
                    Rs.{medicine.price}
                        </Price>
                    </div>
                    <div>
                    <Button primary onClick={() => addMedicine(medicine._id)} ><CartIcon/> Add to Cart</Button>
                    </div>
                   
                </PriceRow>
                
            </div>
           
            </ColWrapper>
        </Center>
        </>
        
    )
}

export async function getServerSideProps(context){
    await mongooseConnect();
    const {id} = context.query
    const medicine = await Medicines.findById(id)
    return{
        props: {
            medicine: JSON.parse(JSON.stringify(medicine)),
        }
    }
}