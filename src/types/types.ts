export type ArrayData = number[]

export interface SleepTime { inputSpeed?: number, isPause?: boolean }
export type Animater = (
    sleepTimeRef: SleepTime,
    compareIndex1: number,
    compareIndex2: number,
    mergeSortHeight?: number,
    mergeSortHeightIndex?: number,
) => Promise<void>

export interface SortingDependencies {
    auxiliaryArray?: ArrayData
    sleepTimeRef?: SleepTime
    animater?: Animater
}

export interface IncreaseArrayQuantity {
    array: ArrayData
    currentQuantity: number
    quantity: number
    maxRange?: number
    minRange?: number
}
