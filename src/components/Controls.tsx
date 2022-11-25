import { FormEvent, useContext } from 'react';
import { ArrayDataContext, UpdateArrayDataContext } from '../contexts/ArrayContex'
import { UpdateTimeContext, TimeContext } from '../contexts/TimeContext'
import { DisabledContext } from '../contexts/DisabledContext'
import { increaseArrayQuantity } from '../utils/utils'

const Controls: React.FC = () => {
    const arrayData = useContext(ArrayDataContext)
    const setArray = useContext(UpdateArrayDataContext)
    const sleepTime = useContext(TimeContext)
    const setSleepTime = useContext(UpdateTimeContext)
    const disabledStatus = useContext(DisabledContext)

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
            for (let i = quantity; i < array.length;) array.pop();
            sessionStorage.setItem("currentQuantity", String(array.length));
            setArray!(array)
        }
    }

    const handleInputSpeed = (e: React.FormEvent<HTMLInputElement>) => {
        sessionStorage.setItem("currentSleepTime", JSON.stringify({ ...sleepTime, inputSpeed: e.currentTarget.valueAsNumber }));
        const currentSleepTime = JSON.parse(sessionStorage.getItem("currentSleepTime")!)
        setSleepTime(currentSleepTime)
    }

    return (
        <>
            <div>
                <button onClick={() => window.location.reload()}>Shuffle</button>
                <button onClick={handleFreeze}>{sleepTime.isPause ? 'Unfreeze' : 'Freeze'}</button>
                Quantity
                <input
                    onInput={handleInpuitQuantity}
                    type="range"
                    min="10"
                    value={arrayData.length}
                    max="300"
                    step="5"
                    name="Quantity"
                    disabled={disabledStatus}
                />
                Speed
                <input
                    name="Speed"
                    onInput={handleInputSpeed}
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
