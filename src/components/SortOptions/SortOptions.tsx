import './SortOptions.css'
import React, { useContext, useState, useMemo } from 'react'
import { ArrayData, SleepTime, SortingDependencies } from '../../types/types'
import { setTimer, increaseArrayQuantity, wait, shuffle } from '../../utils/utils'
import { ArrayDataContext, UpdateArrayDataContext } from '../../contexts/ArrayContex'
import { TimeContext } from '../../contexts/TimeContext'
import { IsSortingContext, UpdateIsSortingContext } from '../../contexts/IsSortingContext'
import BubbleSort from '../../Sorting Algos/BubbleSort'
import MergeSort from '../../Sorting Algos/MergeSort'
import QuickSort from '../../Sorting Algos/QuickSort'
import HeapSort from '../../Sorting Algos/HeapSort'
import { animations } from '../../animations'
import { v4 as ID } from 'uuid'

type CurrentSort = (sortingDependencies: SortingDependencies) => Promise<void>

const initialButtonsState = [
    { name: 'BubbleSort', sortType: BubbleSort, isSorting: false },
    { name: 'MergeSort', sortType: MergeSort, isSorting: false },
    { name: 'QuickSort', sortType: QuickSort, isSorting: false },
    { name: 'HeapSort', sortType: HeapSort, isSorting: false }
]
const sleepTimeRef: SleepTime = { isPause: false, inputSpeed: 0 }
const delayRef: SleepTime = { isPause: sleepTimeRef.isPause, inputSpeed: 500 }
const sortingDependencies: SortingDependencies = { auxiliaryArray: [], sleepTimeRef, animations }

const SortOptions: React.FC = () => {

    const array = useContext(ArrayDataContext)
    const setArray = useContext(UpdateArrayDataContext)
    const sleepTime = useContext(TimeContext)
    const isSortingStatus = useContext(IsSortingContext)
    const setIsSortingStatus = useContext(UpdateIsSortingContext)
    const [buttonsState, setButtonsState] = useState(initialButtonsState)

    sortingDependencies.auxiliaryArray = useMemo(() => [...array], [array])
    sleepTimeRef.inputSpeed = setTimer(sleepTime.inputSpeed)
    sleepTimeRef.isPause = sleepTime.isPause

    async function handleCurrentSort(currentSort: CurrentSort) {
        const { newButtonsState, initialButtonsState } = generateButtonsStates(currentSort)
        setIsSortingStatus(true)
        setButtonsState(newButtonsState)
        await currentSort(sortingDependencies)
        setButtonsState(initialButtonsState)
        setIsSortingStatus(false)
        setArray!(sortingDependencies.auxiliaryArray)
    }

    function generateButtonsStates(currentSort: CurrentSort) {
        const newButtonsState = buttonsState.map(currentSortState => {
            if (currentSort === currentSortState.sortType) return { ...currentSortState, isSorting: true }
            return { ...currentSortState }
        })
        return { newButtonsState, initialButtonsState }
    }

    async function handleAutoSort() {
        const quantity = 100
        for (let i = 0; buttonsState.length - 1; i++) {
            // setting variable i to -1 will run bubble sort.
            if (i === buttonsState.length - 1) i = -1;
            // getting buttonState index i+1 will ensure that sortType bubbleSort run last. 
            shuffle(setArray, quantity)
            await NextSort(buttonsState[i + 1].sortType)
        }
    }

    delayRef.isPause = sortingDependencies.sleepTimeRef.isPause
    async function NextSort(currentSort: CurrentSort) {
        const { newButtonsState, initialButtonsState } = generateButtonsStates(currentSort)

        setIsSortingStatus(true)
        setButtonsState(newButtonsState)
        await wait(delayRef)
        await currentSort(sortingDependencies)
        await wait(delayRef)
        setButtonsState(initialButtonsState)
    }

    return (
        <>
            <nav>
                <div id='options-container'>
                    {
                        buttonsState.map(CurrentSortState => {
                            return (
                                <button
                                    key={ID()}
                                    disabled={isSortingStatus}
                                    className={`${CurrentSortState.isSorting ? 'is-sorting' : ''} sort-buttons`}
                                    onClick={() => handleCurrentSort(CurrentSortState.sortType)}>
                                    {CurrentSortState.name}
                                </button>
                            )
                        })
                    }
                    <button
                        className='auto-button sort-buttons'
                        onClick={handleAutoSort}
                        disabled={isSortingStatus}>
                        Auto
                    </button>
                </div>
            </nav>
        </>
    )
}

export default SortOptions
