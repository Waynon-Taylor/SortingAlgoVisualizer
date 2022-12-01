import './SortOptions.css'
import React, { useContext, useState, useMemo } from 'react'
import { ArrayData, SleepTime, SortingDependencies } from '../../types/types'
import { setTimer, increaseArrayQuantity, wait } from '../../utils/utils'
import { ArrayDataContext, UpdateArrayDataContext } from '../../contexts/ArrayContex'
import { TimeContext } from '../../contexts/TimeContext'
import { DisabledContext, UpdateDisabledContext } from '../../contexts/DisabledContext'
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
    const disabledStatus = useContext(DisabledContext)
    const setDisabledStatus = useContext(UpdateDisabledContext)
    const [buttonsState, setButtonsState] = useState(initialButtonsState)

    sortingDependencies.auxiliaryArray = useMemo(() => [...array], [array])
    sleepTimeRef.inputSpeed = setTimer(sleepTime.inputSpeed)
    sleepTimeRef.isPause = sleepTime.isPause

    async function handleCurrentSort(currentSort: CurrentSort) {
        const { newButtonsState, initialButtonsState } = generateButtonsStates(currentSort)
        setDisabledStatus(true)
        setButtonsState(newButtonsState)
        await currentSort(sortingDependencies)
        setButtonsState(initialButtonsState)
        setDisabledStatus(false)
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
        await NextSort(MergeSort)
        await NextSort(QuickSort)
        await NextSort(HeapSort)
        await NextSort(BubbleSort)
        handleAutoSort()
    }

    delayRef.isPause = sortingDependencies.sleepTimeRef.isPause
    async function NextSort(currentSort: CurrentSort) {
        const { newButtonsState, initialButtonsState } = generateButtonsStates(currentSort)

        shuffle()
        setDisabledStatus(true)
        setButtonsState(newButtonsState)
        await wait(delayRef)
        await currentSort(sortingDependencies)
        await wait(delayRef)
        setButtonsState(initialButtonsState)
    }

    function shuffle() {
        const array: ArrayData = [], currentQuantity = 1
        let quantity = Number(sessionStorage.getItem("currentQuantity"))
        if (quantity > 100) quantity = 100
        increaseArrayQuantity({ array, currentQuantity, quantity })
        setArray!(array)
    }
    console.log('Sortrender')
    return (
        <>
            <nav>
                <div id='options-container'>
                    {
                        buttonsState.map(CurrentSortState => {
                            return (
                                <button
                                    key={ID()}
                                    disabled={disabledStatus}
                                    className={`${CurrentSortState.isSorting ? 'is-sorting' : ''} sort-buttons`}
                                    onClick={() => handleCurrentSort(CurrentSortState.sortType)}>
                                    {CurrentSortState.name}
                                </button>
                            )
                        })
                    }
                    <button
                        className='sort-buttons'
                        onClick={handleAutoSort}
                        disabled={disabledStatus}>
                        Auto
                    </button>
                </div>
            </nav>
        </>
    )
}

export default SortOptions
