import { SortingDependencies } from "../types/types"
import { wait } from '../utils/utils'
async function QuickSort(sortingDependencies: SortingDependencies) {

    const auxiliaryArray = sortingDependencies.auxiliaryArray
    const sleepTimeRef = sortingDependencies.sleepTimeRef
    const animations = sortingDependencies.animations

    return quickSort(0, auxiliaryArray.length - 1)

    async function partition(start: number, end: number) {
        console.log('QuickSort')
        let pivot = auxiliaryArray[end]
        let i = start - 1

        // This section of the code will change the color of the pivots to color3
        const { color3 } = animations.colors
        animations.barCollection[end].style.backgroundColor = color3
        await wait(sleepTimeRef)

        for (let j = start; j < end; j++) {

            if (auxiliaryArray[j] <= pivot) {
                i += 1;
                const currentIndices = [j, i]
                await animations.animater(sleepTimeRef, currentIndices);
                [auxiliaryArray[i], auxiliaryArray[j]] = [auxiliaryArray[j], auxiliaryArray[i]];
            }
        }
        await animations.animater(sleepTimeRef, [end, i + 1]);
        animations.resetColorValues([end, end]);
        [auxiliaryArray[i + 1], auxiliaryArray[end]] = [auxiliaryArray[end], auxiliaryArray[i + 1]];
        return i + 1
    }

    // quick sort
    async function quickSort(start: number, end: number) {

        if (start >= end) return
        let pivot = await partition(start, end)
        await quickSort(start, pivot - 1)
        await quickSort(pivot + 1, end)
    }
}

export default QuickSort
