import { SleepTime } from './types/types'
import { wait } from './utils/utils'

type CurrentIndices = number[]

type color1 = 'green'
type color2 = 'red'
type color3 = 'yellow'
type colorOptions = color1 | color2 | color3

export const animations = {

    barCollection: document.getElementsByClassName('bar') as HTMLCollectionOf<HTMLElement>,
    colors: {
        color1: 'green' as color1,
        color2: 'red' as color2,
        color3: 'yellow' as color3
    },

    selectBarStyleProp: function (currentIndices: CurrentIndices) {
        const [index1, index2] = currentIndices
        const barOneElement = this.barCollection[index1].style
        const barTwoElement = this.barCollection[index2].style
        return { barOneElement, barTwoElement }
    },

    compareValues: async function (
        sleepTimeRef: SleepTime,
        currentIndices: CurrentIndices,
        color1: colorOptions, color2: colorOptions) {

        const { barOneElement, barTwoElement } = this.selectBarStyleProp(currentIndices)
        barOneElement.backgroundColor = color1
        barTwoElement.backgroundColor = color2
        await wait(sleepTimeRef)
    },

    resetColorValues: function (currentIndices: CurrentIndices,) {
        const { barOneElement, barTwoElement } = this.selectBarStyleProp(currentIndices)
        barOneElement.backgroundColor = 'grey'
        barTwoElement.backgroundColor = 'grey'
    },

    swapValues: function (currentIndices: CurrentIndices) {
        const { barOneElement, barTwoElement } = this.selectBarStyleProp(currentIndices)
        const barOneHeight = barOneElement.height
        barOneElement.height = barTwoElement.height
        barTwoElement.height = barOneHeight
    },

    overWriteValue: async function (
        sleepTimeRef: SleepTime,
        currentIndices: CurrentIndices,
        overWriteIndex: number, overWriteHeight: number) {
        const [index1, index2] = currentIndices

        this.resetColorValues([index1, index1])
        this.barCollection[overWriteIndex].style.backgroundColor = this.colors.color1
        this.barCollection[overWriteIndex].style.height = `${overWriteHeight}px`
        
        await wait(sleepTimeRef)
        this.resetColorValues([index2, overWriteIndex])
    },

    animater: async function (
        sleepTimeRef: SleepTime,
        currentIndices: CurrentIndices,
        overWriteIndex?: number, overWriteHeight?: number) {

        const color1 = this.colors.color1, color2 = this.colors.color2
        //When comapring both values or element has the same color green.
        await this.compareValues(sleepTimeRef, currentIndices, color1, color1)
        //When comaprison has resolve animationValue2 will be red
        //While animationValue1 will remain green.
        await this.compareValues(sleepTimeRef, currentIndices, color1, color2)

        //The overWriteValue() method will run specificly for merge sort only.
        if (overWriteIndex !== undefined && overWriteHeight !== undefined)
            return this.overWriteValue(sleepTimeRef, currentIndices, overWriteIndex, overWriteHeight);
        ///
        this.swapValues(currentIndices)
        await this.compareValues(sleepTimeRef, currentIndices, color2, color1)
        this.resetColorValues(currentIndices)
    }
}

export type Animations = typeof animations
