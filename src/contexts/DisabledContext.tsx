import React, { useState } from 'react'

let handleDisabledStatus = (disabledStatus: boolean): void => { }
const initialDisabledStatus = false

export const UpdateDisabledContext = React.createContext(handleDisabledStatus)
export const DisabledContext = React.createContext(initialDisabledStatus)

const DisabledProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [disabledStatus, setdisabledStatus] = useState(initialDisabledStatus)

    handleDisabledStatus = (disabledStatus: boolean) => {
        setdisabledStatus(disabledStatus)
    }

    return (
        <DisabledContext.Provider value={disabledStatus}>
            <UpdateDisabledContext.Provider value={handleDisabledStatus}>
                {children}
            </UpdateDisabledContext.Provider>
        </DisabledContext.Provider>
    )
}

export default DisabledProvider
