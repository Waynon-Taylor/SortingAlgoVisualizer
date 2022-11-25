import { SortingDependencies } from "../types/types"

async function HeapSort(sortingDependencies: SortingDependencies) {
    const heap = sortingDependencies.auxiliaryArray!
    const sleepTimeRef = sortingDependencies.sleepTimeRef!
    const animater = sortingDependencies.animater!
    
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

            await animater!(sleepTimeRef, largest, parentIndex)

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

            await animater!(sleepTimeRef, 0, i)
            const swap = heap[0];
            heap[0] = heap[i];
            heap[i] = swap;

            await heapify(i, 0)
        }
    }
}

export default HeapSort
