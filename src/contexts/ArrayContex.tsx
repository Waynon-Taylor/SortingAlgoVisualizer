import React, { useState } from 'react'
import { ArrayData as ArrayData } from '../types/types'

export const ArrayDataContext = React.createContext<ArrayData[]>([])
export const UpdateArrayDataContext = React.createContext<React.Dispatch<React.SetStateAction<ArrayData[]>> | null>(null)

const ArrayProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // { height: number, green: false, red: false }
    const [ArrayData, setArrayData] = useState<ArrayData[]>([])

    return (
        <ArrayDataContext.Provider value={ArrayData}>
            <UpdateArrayDataContext.Provider value={setArrayData}>
                {children}
            </UpdateArrayDataContext.Provider>
        </ArrayDataContext.Provider>
    )
}

export default ArrayProvider
