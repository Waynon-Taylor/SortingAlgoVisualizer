import './Navigation.css'
import React, { useContext, useState, useMemo } from 'react'
import { ArrayData, SleepTime, SortingDependencies } from '../../types/types'
import { setTimer, increaseArrayQuantity } from '../../utils/utils'
import { ArrayDataContext, UpdateArrayDataContext } from '../../contexts/ArrayContex'
import { TimeContext } from '../../contexts/TimeContext'
import { DisabledContext, UpdateDisabledContext } from '../../contexts/DisabledContext'
import BubbleSort from '../../Sorting Algos/BubbleSort'
import MergeSort from '../../Sorting Algos/MergeSort'
import QuickSort from '../../Sorting Algos/QuickSort'
import HeapSort from '../../Sorting Algos/HeapSort'

type Algo = (sortingDependencies: SortingDependencies) => Promise<void>
interface AlgoState {
    type: string
    algo: Algo
    isSorting: boolean
}

const initialButtonsState = [
    { type: 'BubbleSort', algo: BubbleSort, isSorting: false },
    { type: 'MergeSort', algo: MergeSort, isSorting: false },
    { type: 'QuickSort', algo: QuickSort, isSorting: false },
    { type: 'HeapSort', algo: HeapSort, isSorting: false }
]

const sleepTimeRef: SleepTime = {}
const sortingDependencies: SortingDependencies = { sleepTimeRef }

const Navigation: React.FC = () => {

    const array = useContext(ArrayDataContext)
    const setArray = useContext(UpdateArrayDataContext)
    const sleepTime = useContext(TimeContext)
    const disabledStatus = useContext(DisabledContext)
    const setDisabledStatus = useContext(UpdateDisabledContext)

    const [buttonsState, setButtonsState] = useState<AlgoState[]>(initialButtonsState)

    sortingDependencies.auxiliaryArray = useMemo(() => [...array], [array])
    sortingDependencies.animater = animater
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
        const barOneElement = barCollection[compareIndex1].style
        const barTwoElement = barCollection[compareIndex2].style

        barOneElement.backgroundColor = 'green'
        barTwoElement.backgroundColor = 'green'
        await wait(sleepTimeRef)

        barTwoElement.backgroundColor = 'red'
        barOneElement.backgroundColor = 'green'
        await wait(sleepTimeRef)

        if (mergeSortHeightIndex !== undefined) {
            barOneElement.backgroundColor = 'grey'
            barCollection[mergeSortHeightIndex].style.backgroundColor = 'green'
            barCollection[mergeSortHeightIndex].style.height = `${mergeSortHeight}px`
            barCollection[mergeSortHeightIndex].title = `${mergeSortHeight}px`

            await wait(sleepTimeRef)
            barCollection[mergeSortHeightIndex].style.backgroundColor = 'grey'
            barTwoElement.backgroundColor = 'grey'
            return
        } else {
            const tempHeight = barOneElement.height
            barOneElement.height = barTwoElement.height
            barTwoElement.height = tempHeight
        }

        barOneElement.backgroundColor = 'red'
        barTwoElement.backgroundColor = 'green'

        await wait(sleepTimeRef)
        barOneElement.backgroundColor = 'grey'
        barTwoElement.backgroundColor = 'grey'
    }

    async function wait(sleepTimeRef: SleepTime) {
        const pausetime = 250
        while (sleepTimeRef.isPause)
            await new Promise(resolve => setTimeout(() => resolve(null), pausetime))
        return new Promise(resolve => setTimeout(() => resolve(null), sleepTimeRef.inputSpeed))
    }

    async function handleCurrentSort(CurrentSort: Algo) {
        const { newButtonsState, staleButtonsState } = generateButtonsStates(CurrentSort)
        setDisabledStatus(true)
        setButtonsState(newButtonsState)
        await CurrentSort(sortingDependencies)
        setButtonsState(staleButtonsState)
        setDisabledStatus(false)
    }

    function generateButtonsStates(CurrentSort: Algo) {
        const staleButtonsState = buttonsState
        const newButtonsState = buttonsState.map(algoState => {
            if (CurrentSort === algoState.algo) return { ...algoState, isSorting: true }
            return { ...algoState }
        })

        return { newButtonsState, staleButtonsState }
    }

    async function handleAutoSort() {
        await NextSort(MergeSort)
        await NextSort(QuickSort)
        await NextSort(HeapSort)
        await NextSort(BubbleSort)
        handleAutoSort()
    }

    async function NextSort(CurrentSort: Algo) {
        const delay: SleepTime = { ...sortingDependencies.sleepTimeRef!, inputSpeed: 500 }
        const { newButtonsState, staleButtonsState } = generateButtonsStates(CurrentSort)

        shuffle()
        setDisabledStatus(true)
        setButtonsState(newButtonsState)
        await wait(delay)
        await CurrentSort(sortingDependencies)
        await wait(delay)
        setButtonsState(staleButtonsState)
    }

    function shuffle() {
        const array: ArrayData = [], currentQuantity = 1
        let quantity = Number(sessionStorage.getItem("currentQuantity"))
        if (quantity > 100) quantity = 100
        increaseArrayQuantity({ array, currentQuantity, quantity })
        setArray!(array)
    }

    return (
        <>
            <nav>
                {
                    buttonsState.map(algoState => {
                        return (
                            <button
                                disabled={disabledStatus}
                                className={`${algoState.isSorting ? 'is-sorting' : ''}`}
                                onClick={() => handleCurrentSort(algoState.algo)}>
                                {algoState.type}
                            </button>
                        )
                    })
                }
                <button
                    onClick={handleAutoSort}
                    disabled={disabledStatus}>Auto</button>
            </nav>
        </>
    )
}

export default Navigation
