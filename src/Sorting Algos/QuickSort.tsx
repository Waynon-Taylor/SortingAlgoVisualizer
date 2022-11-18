import { ArrayData, SortingDependencies } from "../types/types"


const QuickSort: React.FC<{ sortingDependencies: SortingDependencies }> = ({ sortingDependencies }) => {
    const { array, setArray, animater, sleepTimeRef } = sortingDependencies

    let auxiliaryArray = [...array]

    async function partition(tempArray: ArrayData[], start: number, end: number) {

        let pivot = array[end].height
        let i = start - 1
        for (let j = start; j < end; j++) {

            if (array[j].height <= pivot) {
                tempArray[j] = { ...tempArray[j], green: true, }
                i += 1;
                await animater(sleepTimeRef, j, i);
                [tempArray[i], tempArray[j]] = [tempArray[j], tempArray[i]];
            }
        }
        await animater(sleepTimeRef, end, i + 1);
        [tempArray[i + 1], tempArray[end]] = [tempArray[end], tempArray[i + 1]];
        auxiliaryArray=tempArray
        return i + 1
    }

    // quick sort
    async function quickSort(start: number, end: number) {

        if (start >= end) return
        let pivot = await partition(array, start, end)

        quickSort(start, pivot - 1)
        quickSort(pivot + 1, end)
    }

    function handleQuickSort() {
        quickSort(0, auxiliaryArray.length - 1)
        // setArray!(auxiliaryArray)
    }

    return (
        <>
            <button onClick={handleQuickSort}>QuickSort</button>
        </>
    )
}
export default QuickSort
