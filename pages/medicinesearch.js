import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import Header from "@/components/Header";
import Loading from "@/components/Loading";
import MedicineBox from "@/components/MedicineBox";
import Link from "next/link";
import { useContext, useState } from "react";
import styled from "styled-components";

const ColumnWrapper = styled.div`
display:grid;
grid-template-columns: 1.2fr .8fr;
gap:5px;
margin-top:10px;
`
const Box = styled.div`
  border-radius: 10px;
  display: flex;
  align-items: center;
  padding: 10px;
`;

const Icon = styled.div`
  margin-right: 5px;
`;
export default function MedicineSearchPage(){
    const [searchItem,setSearchItem] = useState ('')
    const [searchResults,setSearchResults] = useState([])
    const {addMedicine} = useContext(CartContext)
    const [noresults,setNoResults] = useState(false)
    const [isloading,setIsLoading] =useState(false)
    const handleSearch = async () => {
        setIsLoading(true)
        const response = await fetch(`/api/medicinesearch?search=${searchItem}`);

        const data = await response.json()
        if(data.length ===0){
            setNoResults(true)
        }else{
            setSearchResults(data)
            setNoResults(false)
        }
        setIsLoading(false)
    }
    const handleInputChange = (ev) =>{
        const input = ev.target.value
        setSearchItem(input)
        if(input.length >=1){
            handleSearch()
        }
    }
    const handleAddtoCart = (id) =>{
        addMedicine(id)
    }

    return (
        <>
        <Header/>
        <div>
            <div className="flex">
                <Link href={'/'} className="mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
                    </svg>
                </Link>
                <h1>Search Medicine</h1>
            </div>
           
            <div>
                <ColumnWrapper>
                <Box>
                <input type="text" placeholder="Search" value={searchItem} onChange={handleInputChange}/>
                </Box>
               <Box>
                {noresults?(
                <div className="flex justify-between items-center">
                    <Icon>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
                        </svg>
                    </Icon>
                     No Results Found 
                </div>
                     ):(
                        <div className="flex justify-between items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                            </svg>
                        
                        </div>   
                )}
               </Box>
                </ColumnWrapper> 
                <div>
                    {
                        isloading?(
                            <div className="flex items-center justify-center h-screen">
                                <div>
                                <Loading/>
                                </div>
                            </div>
                        ): noresults?(
                            <div className="flex items-center justify-center h-screen">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H6.911a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661z" />
                                </svg>
                            </div>
                        ):(
                            searchResults.map((medicine) =>
                            <MedicineBox {...medicine} key={medicine._id} >
                                <Button onClick= {() =>handleAddtoCart(medicine._id)}></Button>
                                </MedicineBox>
                        ))
                    }
                </div>
            </div>
        </div>
        </>
    )
}