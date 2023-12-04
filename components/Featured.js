import Center from '@/components/Center'
import styled from 'styled-components'
import PrimaryBtn from '@/components/PrimaryBtn'
import Button from "@/components/Button"
import Link from 'next/link'
const Bg = styled.div`
background-color:#4ddbeb;
padding: 10px 0;
display:flex;
align-items: center;
justify-content: space-between;
`

const Title = styled.h1`
margin:0;
font-weight:normal;
`

const Wrapper = styled.div`

display:grid;
grid-template-columns: 1.2fr .8fr;
gap:10px;
img{
    max-width:100%;
}
`
const Column =styled.div`
display:grid;
grid-template-columns: 1.2fr .8fr;
gap:40px;
margin-top:40px;
`

export default function Featured(){
    return(
        <Bg>
            <Center>
               
                <div className="flex items-center justify-center">
                    <Title>Search Medicines Here</Title>
                    
                    <Link href="/medicinesearch" className=' ml-2 '>
                        <Button primary>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                            </svg>
                            Search
                        </Button>
                    </Link>
                    </div>
              
            
            </Center>
            
        </Bg>
    )
}