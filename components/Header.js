import Link from "next/link";
import styled from "styled-components";
import Center from "@/components/Center";
import { useContext, useState } from "react";
import { CartContext } from "@/components/CartContext";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Logo from "@/components/Logo";
import BarsIcon from "./icons/Bars";
const StyledHeader =styled.header`
background-color : #72befc;

`
const Logos = styled(Link)`
text-decoration:none;
position: relative;
z-index: 3;
`
const Wrapper = styled.div `
align-items: center;
display:flex;
justify-content: space-between;
padding: 5px 0;
`
const NavLink = styled(Link)`
display:block;
color:#211f1f;
text-decoration:none;
padding:10px 0;
@media screen and (min-width:768px){
    padding:0;
}
`
const StyledNav = styled.nav`
${props => props.mobnavactivie ?`
display: block;
` : `
display: none;
`}
gap:15px;
position:fixed;
top:0;
bottom:0;
left:0;
right:0;
padding:60px 20px 20px;
background-color : #72befc;
@media screen and (min-width:768px){
    display:flex;
    position:static;
    padding:0;
}
`

const NavButton = styled.button`
background-color:transparent;
width: 30px;
height:30px;
border:0;
color:white;
cursor: pointer;
position: relative;
z-index: 3;
@media screen and (min-width:768px){
    display: none;
}
`
export default function Header({children}){
    const {cartMedicines} = useContext(CartContext)
    const {data:session} = useSession()
    const router = useRouter()
    async function logout(){
        await router.push('/')
        await signOut()
    }
    const [mobnavactivie,setMobNavActive] = useState(false)

    return (
        <StyledHeader>
            <Center>
                <Wrapper>
                <div className="text-black-400 flex justify-between" >
                    <h1 className="text-sm">Hello, <b>{session?.user?.name}</b></h1>
                </div>
                <Center>
                    <Logos href={'/'}> <Logo/></Logos>
                </Center>
                
            <StyledNav mobnavactivie={mobnavactivie}>
                <NavLink href={'/'}>Home</NavLink>
                <NavLink href={'/medicinesearch'}>Find</NavLink>
                <NavLink href={'/ucategories'}>Categories</NavLink>
                <NavLink href={'/adminuser'}>Admin</NavLink>
                <NavLink href={'/cart'}>Cart ({cartMedicines?.length})</NavLink>
                <NavLink href={'/'} onClick={logout}>LogOut</NavLink>
            </StyledNav>
            <NavButton onClick={() => setMobNavActive( prev => !prev)}>
                <BarsIcon />
            </NavButton>
            </Wrapper>
            </Center>
                
            
            {children}
           
        </StyledHeader>
        
    )
}