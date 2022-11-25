import { SortingDependencies } from '../types/types'

async function BubbleSort(sortingDependencies: SortingDependencies) {
    const tempArray = sortingDependencies.auxiliaryArray!
    const sleepTimeRef = sortingDependencies.sleepTimeRef!
    const animater = sortingDependencies.animater!

    return bubbleSort()
    async function bubbleSort() {

        for (let i = 0; i < tempArray.length - 1; i++) {
            for (let j = 0; j < tempArray.length - i - 1; j++) {

                // if (tempArray[j] === tempArray[j + 1]) continue

                if (tempArray[j] > tempArray[j + 1]) {

                    await animater!(sleepTimeRef, j + 1, j);
                    [tempArray[j], tempArray[j + 1]] = [tempArray[j + 1], tempArray[j]];
                } else {
                    // animater(sleepTimeRef, j, j + 1, tempArray[j], j)
                }
            }
        }
    }
}

export default BubbleSort
