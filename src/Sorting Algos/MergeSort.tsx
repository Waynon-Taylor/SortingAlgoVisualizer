import { ArrayData, SortingDependencies } from "../types/types"

async function MergeSort (sortingDependencies: SortingDependencies){

    const array = sortingDependencies.auxiliaryArray!
    const sleepTimeRef = sortingDependencies.sleepTimeRef
    const animations = sortingDependencies.animations

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
            let currentIndices = [i, j]

            if (auxiliaryArray[i] <= auxiliaryArray[j]) {
                await animations.animater(sleepTimeRef, currentIndices, k, auxiliaryArray[i])
                mainArray[k++] = auxiliaryArray[i++];
                
            } else {
                currentIndices = [j, i]
                await animations.animater(sleepTimeRef, currentIndices,k , auxiliaryArray[j])
                mainArray[k++] = auxiliaryArray[j++];
            }
        }

        while (i <= middleIdx) {
            await animations.animater(sleepTimeRef, [i, i], k,auxiliaryArray[i] )
            mainArray[k++] = auxiliaryArray[i++];
        }
        while (j <= endIdx) {
            await animations.animater(sleepTimeRef, [j, j], k,auxiliaryArray[j] )
            mainArray[k++] = auxiliaryArray[j++];
        }
    }
}

export default MergeSort 
