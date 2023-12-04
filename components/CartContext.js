const { createContext, useState, useEffect } = require("react");

export const CartContext = createContext({})

export function CartContextProvider({children}){
    const ls= typeof window !== "undefined" ? window.localStorage : null
    const [cartMedicines,setCartMedicines] = useState([])
    useEffect(() => {
        if(cartMedicines?.length > 0){
            ls?.setItem('cart',JSON.stringify(cartMedicines))
        }
    },[cartMedicines])

    useEffect(() => {
    if (ls && ls.getItem('cart')) {
        setCartMedicines(JSON.parse(ls.getItem('cart')))
    }
},[])

    function addMedicine(medicineId){
        setCartMedicines(prev =>[...prev,medicineId])
    }
    function removeMedicine(medicineId){
        setCartMedicines(prev =>{
            const pos = prev.indexOf(medicineId)
            if(pos !== -1){
               return prev.filter((value,index) => index !== pos)
            }
            return prev
        })
    }
    return (
        <CartContext.Provider value={{cartMedicines,setCartMedicines,addMedicine,removeMedicine}}>
             {children}
        </CartContext.Provider>
    )
}