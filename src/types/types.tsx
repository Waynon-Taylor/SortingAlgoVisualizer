export interface ArrayData {
    height: number
    green: boolean
    red: boolean
}

export interface SleepTime { inputSpeed: number, isPause: boolean }
type Wait = (sleepTimeRef: SleepTime) => Promise<unknown>

export interface SortingDependencies {
    array: ArrayData[]
    setArray: React.Dispatch<React.SetStateAction<ArrayData[]>> | null
    sleepTimeRef: SleepTime
    animater: (
        sleepTimeRef: SleepTime,
        compareIndex1: number,
        compareIndex2: number,
        height?: number,
        mergeSortHeightIndex?: number,
    ) => Promise<unknown>
}

export interface IncreaseArrayQuantity {
    array: ArrayData[]
    currentQuantity: number
    quantity: number
    maxRange?: number
    minRange?: number
}
