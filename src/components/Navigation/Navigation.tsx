import React, { useContext } from 'react'
import { SleepTime } from '../../types/types'
import { ArrayDataContext,UpdateArrayDataContext } from '../../contexts/ArrayContex'
import { TimeContext } from '../../contexts/TimeContext'
import { setTimer } from '../../utils/utils'
import BubbleSort from '../../Sorting Algos/BubbleSort'
import MergeSort from '../../Sorting Algos/MergeSort'
import QuickSort from '../../Sorting Algos/QuickSort'
import HeapSort from '../../Sorting Algos/HeapSort'

const sleepTimeRef = { inputSpeed: 0, isPause: false }

const Navigation: React.FC = () => {

    const array = useContext(ArrayDataContext)
    const setArray = useContext(UpdateArrayDataContext)

    const sleepTime = useContext(TimeContext)
    sleepTimeRef.inputSpeed = setTimer(sleepTime.inputSpeed)
    sleepTimeRef.isPause = sleepTime.isPause

    async function animater(
        sleepTimeRef: SleepTime,
        compareIndex1: number,
        compareIndex2: number,
        mergeSortHeight?: number,
        mergeSortHeightIndex?: number,
    ) {
        const barCollection = document.getElementsByClassName('bar') as HTMLCollectionOf<HTMLElement>

        barCollection[compareIndex1].style.backgroundColor = 'green'
        barCollection[compareIndex2].style.backgroundColor = 'green'
        await wait(sleepTimeRef)

        barCollection[compareIndex2].style.backgroundColor = 'red'
        barCollection[compareIndex1].style.backgroundColor = 'green'
        await wait(sleepTimeRef)

        if (mergeSortHeightIndex !== undefined) {
            barCollection[mergeSortHeightIndex].style.height = `${mergeSortHeight}px`
        } else {
            const tempHeight = barCollection[compareIndex1].style.height
            barCollection[compareIndex1].style.height = barCollection[compareIndex2].style.height
            barCollection[compareIndex2].style.height = tempHeight
        }

        await wait(sleepTimeRef)
        barCollection[compareIndex1].style.backgroundColor = 'grey'
        barCollection[compareIndex2].style.backgroundColor = 'grey'
    }

    async function wait(sleepTimeRef: SleepTime) {
        const pausetime = 250
        while (sleepTimeRef.isPause) {
            await new Promise((resolve) => setTimeout(() => resolve(null), pausetime))
        }
        return new Promise((resolve) => { setTimeout(() => resolve(null), sleepTimeRef.inputSpeed) })
    }

    const sortingDependencies = { array, setArray,animater, sleepTimeRef }

    return (
        <>
            <nav>
                <div>
                    <MergeSort sortingDependencies={sortingDependencies} />
                    <BubbleSort sortingDependencies={sortingDependencies} />
                    <QuickSort sortingDependencies={sortingDependencies} />
                    <HeapSort sortingDependencies={sortingDependencies} />
                </div>
            </nav>
        </>
    )
}

export default Navigation
