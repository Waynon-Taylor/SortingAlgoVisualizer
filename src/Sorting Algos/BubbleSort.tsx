import { SortingDependencies } from '../types/types'

async function BubbleSort(sortingDependencies: SortingDependencies) {
    const tempArray = sortingDependencies.auxiliaryArray!
    const sleepTimeRef = sortingDependencies.sleepTimeRef
    const animations = sortingDependencies.animations

    return bubbleSort()
    async function bubbleSort() {

        for (let i = 0; i < tempArray.length - 1; i++) {
            for (let j = 0; j < tempArray.length - i - 1; j++) {

                let currentIndices = [j, j + 1]

                if (tempArray[j] === tempArray[j + 1]) {
                    const { color1 } = animations.colors
                    await animations.compareValues(sleepTimeRef, currentIndices, color1, color1)
                    animations.resetColorValues(currentIndices)
                    continue
                }
                if (tempArray[j] > tempArray[j + 1]) {
                    currentIndices = [j + 1, j]
                    await animations.animater(sleepTimeRef, currentIndices);
                    [tempArray[j], tempArray[j + 1]] = [tempArray[j + 1], tempArray[j]];
                } else {
                    const { color1, color2 } = animations.colors
                    await animations.compareValues(sleepTimeRef, currentIndices, color1, color1)
                    await animations.compareValues(sleepTimeRef, currentIndices, color1, color2)
                    animations.resetColorValues(currentIndices)
                }
            }
        }
    }
}

export default BubbleSort
