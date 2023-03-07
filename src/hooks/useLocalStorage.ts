import React,{useState, useEffect} from 'react'

export function useLocalStorage<T>(key:string, initialValue: T |(()=> T)) {
    const [value, setValue] = useState<T>(()=>{
        const jsonValue = localStorage.getItem(key)
        if(jsonValue == null){
            if(typeof initialValue === "function"){
                return (initialValue as ()=> T)()
            }else{
                return initialValue
            }
        }else{
            return JSON.parse(jsonValue)
        }
    }) //value exit at

    useEffect(() => {
     localStorage.setItem(key, JSON.stringify(value))
      
    }, [value, key])
    
     return [value, setValue] as [T, typeof setValue]
     //update the value
}
