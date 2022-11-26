import { SleepTime } from './types/types'
import { wait } from './utils/utils'

interface CompareIndex {
    index1: number
    index2: number
}

type color1 = 'green'
type color2 = 'red'
type colorOptions = color1 | color2

export const animations = {

    barCollection: document.getElementsByClassName('bar') as HTMLCollectionOf<HTMLElement>,
    colors: { color1: 'green' as colorOptions, color2: 'red' as colorOptions, },

    selectBarStyleProp: function (index1: number, index2: number) {
        const barOneElement = this.barCollection[index1].style
        const barTwoElement = this.barCollection[index2].style
        return { barOneElement, barTwoElement }
    },

    compareValues: async function (sleepTimeRef: SleepTime,
        compareIndex: CompareIndex,
        color1: colorOptions, color2: colorOptions) {

        const { index1, index2 } = compareIndex
        const { barOneElement, barTwoElement } = this.selectBarStyleProp(index1, index2)

        barOneElement.backgroundColor = color1
        barTwoElement.backgroundColor = color2
        await wait(sleepTimeRef)
    },

    resetColorValues: function (index1: number, index2: number) {
        const { barOneElement, barTwoElement } = this.selectBarStyleProp(index1, index2)
        barOneElement.backgroundColor = 'grey'
        barTwoElement.backgroundColor = 'grey'
    },

    swapValues: function (index1: number, index2: number) {
        const { barOneElement, barTwoElement } = this.selectBarStyleProp(index1, index2)
        const barOneHeight = barOneElement.height
        barOneElement.height = barTwoElement.height
        barTwoElement.height = barOneHeight
    },

    overWriteValue: function (
        index1: number, index2: number,
        overWriteIndex: number, overWriteHeight: number) {
        this.resetColorValues(index1, overWriteIndex)
        this.barCollection[overWriteIndex].style.height = `${overWriteHeight}px`
        this.resetColorValues(index2, overWriteIndex)
    },

    animater: async function (
        sleepTimeRef: SleepTime,
        index1: number, index2: number,
        overWriteIndex?: number, overWriteHeight?: number) {

        const compareIndex = { index1, index2 }
        //When comapring both values or element has the same color green.
        await this.compareValues(sleepTimeRef, compareIndex, this.colors.color1, this.colors.color1)
        //When comaprison has resolve animationValue2 will be red
        //While animationValue1 will remain green.
        await this.compareValues(sleepTimeRef, compareIndex, this.colors.color1, this.colors.color2)

        //The overWriteValue() method will run specificly for merge sort only.
        if (overWriteIndex !== undefined && overWriteHeight !== undefined)
            return this.overWriteValue(index1, index2, overWriteIndex, overWriteHeight);

        this.swapValues(index1, index2)
        await this.compareValues(sleepTimeRef, compareIndex, this.colors.color2, this.colors.color1)
        this.resetColorValues(index1, index2)
    }
}

export type Animations = typeof animations
