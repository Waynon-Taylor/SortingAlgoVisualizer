import { ArrayData, SortingDependencies } from "../types/types"

async function MergeSort (sortingDependencies: SortingDependencies){

    const array = sortingDependencies.auxiliaryArray!
    const sleepTimeRef = sortingDependencies.sleepTimeRef!
    const animater = sortingDependencies.animater!

    return mergeSortHelper(array, 0, array.length - 1, array.slice())

    async function mergeSortHelper(
        mainArray: ArrayData,
        startIdx: number,
        endIdx: number,
        auxiliaryArray: ArrayData) {
        const middleIdx = Math.floor((startIdx + endIdx) / 2);
        if (startIdx === endIdx) return;
        await mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray);
        await mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray);
        await doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray);
    }

    async function doMerge(
        mainArray: ArrayData,
        startIdx: number,
        middleIdx: number,
        endIdx: number,
        auxiliaryArray: ArrayData) {
        let k = startIdx;
        let i = startIdx;
        let j = middleIdx + 1;

        while (i <= middleIdx && j <= endIdx) {

            if (auxiliaryArray[i] <= auxiliaryArray[j]) {
                await animater!(sleepTimeRef, i, j, auxiliaryArray[i], k)
                mainArray[k++] = auxiliaryArray[i++];

            } else {
                await animater!(sleepTimeRef, j, i, auxiliaryArray[j], k)
                mainArray[k++] = auxiliaryArray[j++];
            }
        }

        while (i <= middleIdx) {
            await animater!(sleepTimeRef, i, i, auxiliaryArray[i], k)
            mainArray[k++] = auxiliaryArray[i++];
        }
        while (j <= endIdx) {
            await animater!(sleepTimeRef, j, j, auxiliaryArray[j], k)
            mainArray[k++] = auxiliaryArray[j++];
        }
    }
}

export default MergeSort 
