import Link from "next/link";
import styled from "styled-components";
import Center from "@/components/Center";
import { useContext } from "react";
import { CartContext } from "@/components/CartContext";
import { useSession } from "next-auth/react";

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
padding: 5px 0;
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
    const {data:session} = useSession()
    
    return (
        <StyledHeader>
            <Center>
                <Wrapper>
                <div className="text-black-400 flex justify-between" >
           <h1 className="text-sm">Hello, <b>{session?.user?.name}</b>
      </h1>
      </div>
                <Logo href={'/'}> <h1 className="text-md">FMC</h1></Logo>
            <StyledNav>
                <NavLink href={'/'}>Home</NavLink>
                <NavLink href={'/medicinesearch'}>Find</NavLink>
                <NavLink href={'/ucategories'}>Categories</NavLink>
                <NavLink href={'/adminuser'}>Admin</NavLink>
                <NavLink href={'/cart'}>Cart ({cartMedicines?.length})</NavLink>
            </StyledNav>
            </Wrapper>
            </Center>
                
            
            {children}
           
        </StyledHeader>
        
    )
}