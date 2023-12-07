import styled from "styled-components"
import Center from "@/components/Center"
import MedicineBox from "@/components/MedicineBox"
import { useEffect, useState } from "react"
import axios from "axios"
import Loading from "./Loading"
import Button from "@/components/Button"
const MedicineGrid= styled.div`
display:grid;
grid-template-columns: 1fr 1fr ;
gap:20px;
padding-top: 10px;
@media screen and (min-width:768px){
    grid-template-columns: 1fr 1fr 1fr 1fr;
}
`
const Title = styled.h2`
font-size:2rem;
margin:5px 0 5px ;
`
const Wrapper = styled.div`
justify-content: end;
display:grid;
grid-template-columns: 1.2fr .6fr;
gap:60%;

`
export default function NewMedicines(medicines){
    const [allmedicines,setMedicines] = useState([])
    const [isloading,setIsLoading] = useState(false)
    const [displayedmedicines,setDisplayedMedicines] = useState([])
    const [visibleItems,setVisibleItems] = useState(4)
    
    useEffect(()=>{
        setIsLoading(true)
       axios.get('/api/medicines').then(response =>{
        setMedicines(response.data)
        setIsLoading(false)
       })
      
    },[])

    useEffect(() => {
        setDisplayedMedicines(allmedicines.slice(0,visibleItems))
    },[visibleItems,allmedicines])
    const handleMoreClicks = () =>{
        setVisibleItems(prevVisibleItems => prevVisibleItems + 8)
    }
    return (
        <>
        {
            isloading?(
                <div className="flex items-center justify-center h-screen">
                    <div>
                        <Loading />
                    </div>
                </div>
            ):(
                <>
            <Center>
                <Title>Fast Moving</Title>
                <hr/>
                <MedicineGrid>
                {medicines?.medicines?.length > 0 && medicines?.medicines?.map(medicine => (
                        <MedicineBox {...medicine}/>                
                    ))
                }
            </MedicineGrid>
            </Center>
            
            <Wrapper>
            <Title>All Medicines</Title>
                {displayedmedicines.length < allmedicines.length && (
                       <div className="mt-4">
                         <Button primary onClick ={handleMoreClicks}>More</Button>
                        </div> 
                )}
            </Wrapper>
                <hr/>
                <MedicineGrid>
                    {displayedmedicines?.length >0 && displayedmedicines?.map(allmedicine =>(
                        <MedicineBox {...allmedicine}/>
                    ))}
                </MedicineGrid>
            </>)
        }
        
        </>
        
    )
}