import styled from "styled-components"
import Center from "@/components/Center"
import MedicineBox from "@/components/MedicineBox"
const MedicineGrid= styled.div`
display:grid;
grid-template-columns: 1fr 1fr 1fr 1fr;
gap:20px;
padding-top: 10px;
`
const Title = styled.h2`
font-size:2rem;
margin:30px 0 5px ;
`
export default function NewMedicines(medicines){
    return (
        <Center>
            <Title>New Arrivals</Title>
            <hr/>
            <MedicineGrid>
            {medicines?.medicines?.length > 0 && medicines?.medicines?.map(medicine => (
                    <MedicineBox {...medicine}/>                
                ))
            }
        </MedicineGrid>
        </Center>
        
        
    )
}