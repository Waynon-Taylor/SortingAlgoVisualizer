import React, { useState } from 'react'
import { SleepTime } from '../types/types'

let handleInpuitSpeed = (sleepTime: SleepTime) => { }
const currentSleepTime = JSON.parse(sessionStorage.getItem("currentSleepTime")!)
if (!currentSleepTime)
    sessionStorage.setItem("currentSleepTime", JSON.stringify({ inputSpeed: 2000, isPause: false }));

export const UpdateTimeContext = React.createContext(handleInpuitSpeed)
export const TimeContext = React.createContext(currentSleepTime)

const TimeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [sleepTime, setSleepTime] = useState(currentSleepTime)

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
