import Center from '@/components/Center'
import styled from 'styled-components'
import PrimaryBtn from '@/components/PrimaryBtn'

const Bg = styled.div`
background-color:#4ddbeb;
padding: 40px 0;
`

const Title = styled.h1`
margin:0;
font-weight:normal
`

const Desc = styled.p`
color:#736f6f;
font-size:.8rem
`
const Wrapper = styled.div`
display:grid;
grid-template-columns: 0.8fr 1.2fr;
gap:40px;
img{
    max-width:100%;
}
`
const Column =styled.div`
display:flex;
align-items:center;
`

export default function Featured(){
    return(
        <Bg>
            <Center>
                <Wrapper>
                    <div>
                    <Title>Featured</Title>
                    <Desc> Test Description goes here </Desc>
                    </div>
                </Wrapper>
            
            </Center>
            
        </Bg>
    )
}