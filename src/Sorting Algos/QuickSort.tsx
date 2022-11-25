import { SortingDependencies } from "../types/types"

async function QuickSort(sortingDependencies: SortingDependencies) {

    const auxiliaryArray = sortingDependencies.auxiliaryArray!
    const sleepTimeRef = sortingDependencies.sleepTimeRef!
    const animater = sortingDependencies.animater!

    return quickSort(0, auxiliaryArray.length - 1)

    async function partition(start: number, end: number) {
        console.log('QuickSort')
        let pivot = auxiliaryArray[end]
        let i = start - 1
        for (let j = start; j < end; j++) {

            if (auxiliaryArray[j] <= pivot) {
                i += 1;
                await animater!(sleepTimeRef, j, i);
                [auxiliaryArray[i], auxiliaryArray[j]] = [auxiliaryArray[j], auxiliaryArray[i]];
            }
        }
        await animater!(sleepTimeRef, end, i + 1);
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
