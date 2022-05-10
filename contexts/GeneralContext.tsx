// Modules
import React, { createContext, ReactNode, useState } from 'react';

export type GeneralContextType = {
  token:string;
  shoppingCartItems:number;
  showShoppingCartModal:boolean;
  currentItem: {
    pieces:number
    price:number
    brand:string
    image:string
    id:number
  };
  toastMessage:string;
}

export const initialState:GeneralContextType = {
  token:'',
  shoppingCartItems: 0,
  showShoppingCartModal: false,
  currentItem: {
    pieces:1,
    price:1, 
    brand:'',
    image:'',
    id:1
  },
  toastMessage:''
}

export const GeneralContext = createContext({} as { state:GeneralContextType, setState:React.Dispatch<React.SetStateAction<GeneralContextType>> });

type Props = {
  children: ReactNode;
};

export default function GeneralState({ children }:Props) {

  const [state, setState] = useState<GeneralContextType>(initialState);

  return (
    <GeneralContext.Provider value={{ state, setState }}>
      {children}
    </GeneralContext.Provider>
  )
}
