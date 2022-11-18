import { ArrayData, SortingDependencies } from "../types/types"

const barCollection = document.getElementsByClassName('bar') as HTMLCollectionOf<HTMLElement>

const MergeSort: React.FC<{ sortingDependencies: SortingDependencies }> = ({ sortingDependencies }) => {
    const { array, setArray, animater, sleepTimeRef } = sortingDependencies

    const auxiliaryArray = array.slice()

    async function mergeSortHelper(
        mainArray: ArrayData[],
        startIdx: number,
        endIdx: number,
        auxiliaryArray: ArrayData[]) {
        if (startIdx === endIdx) return;
        const middleIdx = Math.floor((startIdx + endIdx) / 2);
        await mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray);
        await mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray);
        await doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray);
    }

    async function doMerge(
        mainArray: ArrayData[],
        startIdx: number,
        middleIdx: number,
        endIdx: number,
        auxiliaryArray: ArrayData[]) {
        let k = startIdx;
        let i = startIdx;
        let j = middleIdx + 1;

        while (i <= middleIdx && j <= endIdx) {

            if (auxiliaryArray[i].height <= auxiliaryArray[j].height) {
                await animater(sleepTimeRef, i, j, auxiliaryArray[i].height, k)
                mainArray[k++] = auxiliaryArray[i++];

            } else {
                await animater(sleepTimeRef, j, i, auxiliaryArray[j].height, k)
                mainArray[k++] = auxiliaryArray[j++];
            }
        }

        while (i <= middleIdx) {
            await animater(sleepTimeRef, i, i, auxiliaryArray[i].height, k)
            mainArray[k++] = auxiliaryArray[i++];
        }
        while (j <= endIdx) {
            await animater(sleepTimeRef, j, j, auxiliaryArray[j].height, k)
            mainArray[k++] = auxiliaryArray[j++];
        }
    }

    function handleMergeSort() {
         mergeSortHelper(array, 0, array.length - 1, auxiliaryArray)
        // setArray!([...auxiliaryArray])
    }

    return (
        <>
            <button onClick={handleMergeSort}>MergeSort</button>
        </>
    )
}

export default MergeSort 
