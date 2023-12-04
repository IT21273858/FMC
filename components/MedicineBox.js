import styled from "styled-components"
import Button from "@/components/Button"
import CartIcon from "./icons/CartIcon"
import Link from "next/link"
import { useContext } from "react"
import { CartContext } from "@/components/CartContext"
const MedicineWrapper = styled.div`

`
const ColumnWrapper = styled.div`
align-items: center;
display:grid;
grid-template-columns: 1.2fr .8fr;
gap:80px;
`
const GrayBox = styled(Link)`
background-color:#eee;
padding: 20px;
height: 130px;
align-items: center;
text-align: center;
display:flex;
justify-content:center;
border-radius:20px;
img{
    max-width:100%;
    max-height:120px;
}
`

const Title =styled(Link)`
text-align: left;
font-weight:normal;
font-size:1rem;
margin:0;
color:inherit;
text-decoration:none;
display: block;

`
const MedicineInfoBox = styled.div`
margin-top:5px;
`
const PriceRow = styled.div`
display:flex;
align-items: center;
justify-content: space-between;
margin-top:2px;
margin-bottom:5px;
`
const Price = styled.div`
font-size:1.4rem;
font-weight-bold;
`
export default function MedicineBox({_id,title,price,quantity,image}){
    const {addMedicine} = useContext(CartContext)
    const url = '/medicines/'+_id
    return (
        <MedicineWrapper>
            <GrayBox href={url} >
                <div>
                <img src={image} alt=''/>
                </div>
            
            </GrayBox>
            <ColumnWrapper>
            <Title href={url}>
            {title}
            </Title>
            <Title href={url} >Instock: {quantity} </Title>
            </ColumnWrapper>
            
            <MedicineInfoBox>
                <PriceRow>
                    <Price>
                    Rs.{price}
                    </Price>
                    {
                        quantity <= 5 ? (
                            <Button lowstock onClick={() => addMedicine(_id)}><CartIcon/> </Button>
                        ):(
                            <Button onClick={() => addMedicine(_id)} primary outline><CartIcon/> </Button>
                        )
                    }
                    
                </PriceRow>
                
            
            </MedicineInfoBox>
        

        </MedicineWrapper>
        
    )
}