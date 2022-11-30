import React, { useState } from 'react'

let handleFlipView = (disabledStatus: boolean): void => { }
const initialDisabledStatus = false

export const UpdateFlipViewContext = React.createContext(handleFlipView)
export const FlipViewContext = React.createContext(initialDisabledStatus)

const FlipViewProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [flipViewStatus, setFlipView] = useState(initialDisabledStatus)

    handleFlipView = (flipView: boolean) => {
        setFlipView(flipView)
    }

    return (
        <FlipViewContext.Provider value={flipViewStatus}>
            <UpdateFlipViewContext.Provider value={handleFlipView}>
                {children}
            </UpdateFlipViewContext.Provider>
        </FlipViewContext.Provider>
    )
}

export default FlipViewProvider
