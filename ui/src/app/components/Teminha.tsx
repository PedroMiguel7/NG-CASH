import { useState, useEffect } from "react"

export default function useTema(key: string, initialState: any) {
  const [ state, setState ] = useState(() => {
    const storage = localStorage.getItem(key);

    if(storage){
        return JSON.parse(storage)
    }else{
        return initialState;
    }
  })

  useEffect(() =>{
    localStorage.setItem(key, JSON.stringify(state))
  }, [key, state])

  return [ state, setState]
}