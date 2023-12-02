import Nav from "@/components/Nav";
import { useSession, signIn, signOut } from "next-auth/react"
import { useState } from "react";
import Logo from "./Logo";

export default function Layout({children}) {
  const [showNav,setShowNav] = useState(true)
  const { data: session } = useSession();
  if(!session){
    return (
      <div className="flex flex-col">
      <div className="fontname bg-blue-300 flex justify-center items-center p-2 ">
        Family medical care
      </div>
      <div className="bg-blue-400 text-center w-30  mt-20 justify-center flex items-center rounded-3xl ">
        <div className="w-60 mx-auto p-20">
        <div className={"mainContainer "}>
        <div className={"titleContainer"}>
            <div>Login</div>
        </div>
        <br />
        
        <br />
        <div className={"inputContainer"}>
            <input
                className={"inputbtn"}
                type="button"
                onClick={() => signIn('google')}
                value={"Log in"} />
        </div>
    </div>
        </div>
        
      </div>
      

    </div>
    
    
  )
  }
  const toggleNav = () => {
    setShowNav(prevShowNav => !prevShowNav);
  };
  const currentYear = new Date().getFullYear()
  return (
    <div className="bg-blue-300 min-h-screen">
      <div className=" flex items-center p-4">
        
      <button onClick={toggleNav}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
</svg>

        </button>
        <div className="flex grow justify-center mr-6">
        <Logo/>
        </div>
        
      </div>
      <div>
        
      </div>
        
<div className="flex">
  {
    showNav &&(<Nav show={showNav} />)
  }
      
    <div className="bg-white flex-grow mt-2 mr-2 mb-2 rounded-lg p-4">
        {children}
    </div>
    
    </div>
    <div className="text-center py-4 text-gray-600 text-sm">
        <p>All Rights Reserved &copy; {currentYear} Family Medical Care</p>
      </div>
    </div>
    
  )
}
