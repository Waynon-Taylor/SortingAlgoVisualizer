import { SortingDependencies } from "../types/types"
import  {wait} from '../utils/utils'
async function HeapSort(sortingDependencies: SortingDependencies) {
    const heap = sortingDependencies.auxiliaryArray
    const sleepTimeRef = sortingDependencies.sleepTimeRef
    const animations = sortingDependencies.animations

    return heapSort()
    async function heapify(currentIndex: number, parentIndex: number) {

        var largest = parentIndex; // Initialize largest as root
        var l = 2 * parentIndex + 1; // left = 2*i + 1
        var r = 2 * parentIndex + 2; // right = 2*i + 2

        // If left child is larger than root
        if (l < currentIndex! && heap[l] > heap[largest]) {
            largest = l;
        }
        // If right child is larger than largest so far
        if (r < currentIndex && heap[r] > heap[largest]) {
            largest = r;
        }

        if (largest !== parentIndex) {
            const currentIndices = [largest, parentIndex]
            await animations.animater(sleepTimeRef, currentIndices)

            const swap = heap[parentIndex];
            heap[parentIndex] = heap[largest];
            heap[largest] = swap;
            await heapify(currentIndex, largest);
        }
    }
    async function heapSort() {
        const N = heap.length

        for (let i = Math.floor(N / 2) - 1; i >= 0; i--)
            await heapify(N, i);

        for (let i = N - 1; i > 0; i--) {

            const { color3 } = animations.colors
            const currentIndices = [0, i]
            await animations.compareValues(sleepTimeRef, currentIndices, color3, color3)
            animations.swapValues(currentIndices)
            await wait(sleepTimeRef)
            animations.resetColorValues(currentIndices)

            const swap = heap[0];
            heap[0] = heap[i];
            heap[i] = swap;

            await heapify(i, 0)
        }
    }
}

export default HeapSort
