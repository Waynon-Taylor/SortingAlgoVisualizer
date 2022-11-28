import './Controls.css'
import { FormEvent, useContext } from 'react';
import { ArrayDataContext, UpdateArrayDataContext } from '../../contexts/ArrayContex'
import { UpdateTimeContext, TimeContext } from '../../contexts/TimeContext'
import { DisabledContext } from '../../contexts/DisabledContext'
import { increaseArrayQuantity } from '../../utils/utils'

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
            <div id='controls-container'>
                <button onClick={() => window.location.reload()}>Shuffle</button>
                <button onClick={handleFreeze}>{sleepTime.isPause ? 'Unfreeze' : 'Freeze'}</button>

                <label htmlFor="Quantity">Quantity</label>
                <input
                    onInput={handleInpuitQuantity}
                    disabled={disabledStatus}
                    type="range"
                    name="Quantity"
                    id="Quantity"
                    min="10"
                    value={arrayData.length}
                    max="300"
                    step="5"
                />

                <label htmlFor="Speed">Speed</label>
                <input
                    onInput={handleInputSpeed}
                    value={sleepTime.inputSpeed}
                    type="range"
                    name="Speed"
                    id="Speed"
                    min="0"
                    max="2000"
                    step="400"
                />
            </div>

            <p>Flip View</p>
        </>
    )
}

export default Controls
