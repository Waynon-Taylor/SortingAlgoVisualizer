import { FormEvent, useContext } from 'react';
import { ArrayData } from '../types/types'
import { ArrayDataContext, UpdateArrayDataContext } from '../contexts/ArrayContex'
import { UpdateTimeContext, TimeContext } from '../contexts/TimeContext'
import { increaseArrayQuantity } from '../utils/utils'

const Controls: React.FC = () => {
    const arrayData = useContext(ArrayDataContext)
    const setArray = useContext(UpdateArrayDataContext)

    const sleepTime = useContext(TimeContext)
    const setSleepTime = useContext(UpdateTimeContext)

    const handleFreeze = () => {
        if (!sleepTime.isPause) {
            setSleepTime({ ...sleepTime, isPause: true })
            return
        }
        setSleepTime({ ...sleepTime, isPause: false })
    }

    //handle Quantity
    function handleInpuitQuantity(e: FormEvent<HTMLInputElement>) {
        const array = [...arrayData]
        const currentQuantity = Number(sessionStorage.getItem("currentQuantity"));
        const quantity = e.currentTarget.valueAsNumber

        if (quantity > array.length) {
            increaseArrayQuantity({ array, currentQuantity, quantity })
            sessionStorage.setItem("currentQuantity", String(array.length));
            setArray!(array)
        } else {
            for (let i = quantity; i < array.length;)
                array.pop();
            sessionStorage.setItem("currentQuantity", String(array.length));
            setArray!(array)
        }
    }

    return (
        <>
            <div>
                <button onClick={() => location.reload()}>Shuffle</button>
                <button onClick={handleFreeze}>Freeze</button>
                Quantity
                <input
                    onInput={handleInpuitQuantity}
                    type="range"
                    min="10"
                    value={arrayData.length}
                    max="300"
                    step="5"
                    name="Quantity"
                />
                Speed
                <input
                    name="Speed"
                    onInput={(e: React.FormEvent<HTMLInputElement>) => {
                        setSleepTime({
                            ...sleepTime,
                            inputSpeed: e.currentTarget.valueAsNumber
                        })
                    }}
                    type="range"
                    min="0"
                    value={sleepTime.inputSpeed}
                    max="2000"
                    step="400"
                />
            </div>

            <p>Flip View</p>
        </>
    )
}

export default Controls
