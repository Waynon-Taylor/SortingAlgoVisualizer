import React, { useState } from 'react'
import { SleepTime } from '../types/types'
import {evaluateSessionStorageValue} from '../utils/utils'

let handleInpuitSpeed = (sleepTime: SleepTime) => { }
let initialSleepTime = { inputSpeed: 2000, isPause: false } 
initialSleepTime = evaluateSessionStorageValue("currentSleepTime", initialSleepTime)

export const UpdateTimeContext = React.createContext(handleInpuitSpeed)
export const TimeContext = React.createContext(initialSleepTime)

const TimeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [sleepTime, setSleepTime] = useState(initialSleepTime)

    handleInpuitSpeed = (sleepTime: SleepTime) => {
        setSleepTime(sleepTime)
    }

    return (
        <TimeContext.Provider value={sleepTime}>
            <UpdateTimeContext.Provider value={handleInpuitSpeed}>
                {children}
            </UpdateTimeContext.Provider>
        </TimeContext.Provider>
    )
}

export default TimeProvider
