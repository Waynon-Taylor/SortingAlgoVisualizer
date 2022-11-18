import React from 'react'
import { SortingDependencies } from '../types/types'


const BubbleSort: React.FC<{ sortingDependencies: SortingDependencies }> = ({ sortingDependencies }) => {
    const { array,setArray, animater, sleepTimeRef } = sortingDependencies

    async function bubbleSort() {

        let tempArray = [...array]
        for (let i = 0; i < tempArray.length - 1; i++) {
            for (let j = 0; j < tempArray.length - i - 1; j++) {

                if (tempArray[j].height === tempArray[j + 1].height) {
                    // animater(sleepTimeRef, j, j + 1,)
                }

                if (tempArray[j].height > tempArray[j + 1].height) {
     
                    await animater(sleepTimeRef, j, j + 1,);
                    [tempArray[j], tempArray[j + 1]] = [tempArray[j + 1], tempArray[j]];
                } else {
                    // animater(sleepTimeRef, j + 1, j )
                }
            }
        }
        setArray!([...tempArray])
    }

    return (
        <>
            <button onClick={bubbleSort}>BubbleSort</button>
        </>
    )
}

export default BubbleSort
