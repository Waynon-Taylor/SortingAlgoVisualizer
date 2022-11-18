import React, { useState } from 'react'
import { SleepTime } from '../types/types'

let handleInpuitSpeed = (sleepTime: SleepTime) => { }
const initialSleepTime = { inputSpeed: 2000, isPause: false  }

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


