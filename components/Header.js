import Link from "next/link";
import styled from "styled-components";
import Center from "@/components/Center";
import { useContext } from "react";
import { CartContext } from "@/components/CartContext";

const StyledHeader =styled.header`
background-color : #72befc;

`
const Logo = styled(Link)`
color:#fff;
text-decoration:none;
`
const Wrapper = styled.div `
display:flex;
justify-content: space-between;
padding: 10px 0;
`
const NavLink = styled(Link)`
color:#211f1f;
text-decoration:none;
`
const StyledNav = styled.nav`
display: flex;
gap:15px;
`
export default function Header({children}){
    const {cartMedicines} = useContext(CartContext)
    return (
        <StyledHeader>
            <Center>
                <Wrapper>
                <Logo href={'/'}> FMC</Logo>
            <StyledNav>
                <NavLink href={'/'}>Home</NavLink>
                <NavLink href={'/umedicines'}>All Medicines</NavLink>
                <NavLink href={'/ucategories'}>Categories</NavLink>
                <NavLink href={'/uaccount'}>Account</NavLink>
                <NavLink href={'/cart'}>Cart ({cartMedicines?.length})</NavLink>
            </StyledNav>
            </Wrapper>
            </Center>
                
            
            {children}
           
        </StyledHeader>
        
    )
}