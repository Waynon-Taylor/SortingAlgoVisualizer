import { SleepTime } from './types/types'
import { wait } from './utils/utils'

type CurrentIndices = number[]

type Color1 = 'green'
type Color2 = 'red'
type Color3 = 'yellow'
type colorOptions = Color1 | Color2 | Color3

export const animations = {

    barCollection: document.getElementsByClassName('bar') as HTMLCollectionOf<HTMLElement>,
    colors: {
        color1: 'green' as Color1,
        color2: 'red' as Color2,
        color3: 'yellow' as Color3
    },

    selectBarElement: function (currentIndices: CurrentIndices) {
        const [index1, index2] = currentIndices
        const barOneElement = this.barCollection[index1]
        const barTwoElement = this.barCollection[index2]
        return { barOneElement, barTwoElement }
    },

    compareValues: async function (
        sleepTimeRef: SleepTime,
        currentIndices: CurrentIndices,
        color1: colorOptions, color2: colorOptions) {

        const { barOneElement, barTwoElement } = this.selectBarElement(currentIndices)
        barOneElement.style.backgroundColor = color1
        barTwoElement.style.backgroundColor = color2
        await wait(sleepTimeRef)
    },

    resetColorValues: function (currentIndices: CurrentIndices,) {
        const { barOneElement, barTwoElement } = this.selectBarElement(currentIndices)
        barOneElement.style.backgroundColor = 'grey'
        barTwoElement.style.backgroundColor = 'grey'
    },

    updateInnerText: function (height: string) {
        if (this.barCollection.length <= 30) {
            const px = 2
            return height.substring(0, height.length - px)
        }
        return ''
    },

    swapValues: function (currentIndices: CurrentIndices) {
        const { barOneElement, barTwoElement } = this.selectBarElement(currentIndices)
        const barOneHeight = barOneElement.style.height
        const barTwoHeight = barTwoElement.style.height

        barOneElement.style.height = barTwoHeight
        barTwoElement.style.height = barOneHeight
        //
        barOneElement.innerText = this.updateInnerText(barOneHeight)
        barTwoElement.innerText = this.updateInnerText(barTwoHeight)
    },

    overWriteValue: async function (
        sleepTimeRef: SleepTime,
        currentIndices: CurrentIndices,
        overWriteIndex: number, overWriteHeight: number) {
        const [index1, index2] = currentIndices
        this.resetColorValues([index1, index1])

        const overWriteElement = this.barCollection[overWriteIndex]
        overWriteElement.style.backgroundColor = this.colors.color1
        overWriteElement.style.height = `${overWriteHeight}px`
        overWriteElement.innerText = this.updateInnerText(`${overWriteHeight}px`)

        await wait(sleepTimeRef)
        this.resetColorValues([index2, overWriteIndex])
    },

    animater: async function (
        sleepTimeRef: SleepTime,
        currentIndices: CurrentIndices,
        overWriteIndex?: number, overWriteHeight?: number) {

        const { color1, color2 } = this.colors
        //When comapring both values or element has the same color green.
        await this.compareValues(sleepTimeRef, currentIndices, color1, color1)
        //When comaprison has resolved value2 will be red
        //While value1 will remain green.
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
