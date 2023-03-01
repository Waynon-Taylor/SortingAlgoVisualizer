import React, { useState } from 'react'

let handleisSorting = (isSorting: boolean): void => { }
const initialIsSortingStatus = false

export const UpdateIsSortingContext = React.createContext(handleisSorting)
export const IsSortingContext = React.createContext(initialIsSortingStatus)

const DisabledProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isSortingStatus, setIsSortingStatus] = useState(initialIsSortingStatus)

    handleisSorting = (isSortingStatus: boolean) => {
        setIsSortingStatus(isSortingStatus)
    }

    return (
        <IsSortingContext.Provider value={isSortingStatus}>
            <UpdateIsSortingContext.Provider value={handleisSorting}>
                {children}
            </UpdateIsSortingContext.Provider>
        </IsSortingContext.Provider>
    )
}

export default DisabledProvider
