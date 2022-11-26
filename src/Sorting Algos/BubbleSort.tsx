import { SortingDependencies } from '../types/types'

async function BubbleSort(sortingDependencies: SortingDependencies) {
    const tempArray = sortingDependencies.auxiliaryArray!
    const sleepTimeRef = sortingDependencies.sleepTimeRef!
    const animations = sortingDependencies.animations

    return bubbleSort()
    async function bubbleSort() {

        for (let i = 0; i < tempArray.length - 1; i++) {
            for (let j = 0; j < tempArray.length - i - 1; j++) {

                if (tempArray[j] === tempArray[j + 1]) {
                    const { color1 } = animations.colors
                    const compareIndex = { index1: j, index2: j + 1 }
                    await animations.compareValues(sleepTimeRef, compareIndex, color1, color1)
                    animations.resetColorValues(j, j + 1)
                    continue
                }
                if (tempArray[j] > tempArray[j + 1]) {
                    await animations.animater(sleepTimeRef, j + 1, j);
                    [tempArray[j], tempArray[j + 1]] = [tempArray[j + 1], tempArray[j]];
                } else {
                    const compareIndex = { index1: j, index2: j + 1 }
                    const { color1, color2 } = animations.colors
                    await animations.compareValues(sleepTimeRef, compareIndex, color1, color1)
                    await animations.compareValues(sleepTimeRef, compareIndex, color1, color2)
                    animations.resetColorValues(j, j + 1)
                }
            }
        }
    }
}

export default BubbleSort
