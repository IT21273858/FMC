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
grid-template-columns: auto auto auto;
gap:auto;
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
font-size:.9rem;
margin:0;
color:inherit;
text-decoration:none;
display: block;
@media screen and (min-width:768px){
    font-size:1rem;
}
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
font-size:1rem;
font-weight:bold;
@media screen and (min-width:768px){
    font-size:1.4rem;
}
`
export default function MedicineBox({_id,title,price,quantity,image,properties,description}){
    const {addMedicine} = useContext(CartContext)
    const url = '/medicine/'+_id
    return (
        <MedicineWrapper>
            <GrayBox href={url} >
                <div>
                <img src={image} alt={description}/>
                </div>
            
            </GrayBox>
            <ColumnWrapper>
            <Title href={url}>
                <div className="flex justify-start">
                {title}
                </div>
            
            </Title>
            <Title href={url}>
            {properties &&  Object.entries(properties).map(([key,value]) => 
            
                                        <div key={key} className="flex justify-center">
                                            {key.charAt(0).toUpperCase()}-{value}
                                           
                                        </div> )}
            </Title>
            <Title href={url} >
                <div className="justify-center flex ">
                Instock: {quantity}
                    </div>  </Title>
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
                            <Button onClick={() => addMedicine(_id)} primary ><CartIcon/> </Button>
                        )
                    }
                    
                </PriceRow>
                
            
            </MedicineInfoBox>
        

        </MedicineWrapper>
        
    )
}