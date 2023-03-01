import './Controls.css'
import { FormEvent, useContext, useState, useMemo, useEffect } from 'react';
import { ArrayData } from '../../types/types'
import { ArrayDataContext, UpdateArrayDataContext } from '../../contexts/ArrayContex'
import { UpdateTimeContext, TimeContext } from '../../contexts/TimeContext'
import { IsSortingContext } from '../../contexts/IsSortingContext'
import { increaseArrayQuantity, evaluateSessionStorageValue,shuffle } from '../../utils/utils'

const Controls: React.FC = () => {
    const currentFlipViewStatus = useMemo(() => (evaluateSessionStorageValue('flipViewStatus', false)), [])
    const [flipViewStatus, setFlipView] = useState(currentFlipViewStatus)

    const arrayData = useContext(ArrayDataContext)
    const setArray = useContext(UpdateArrayDataContext)
    const sleepTime = useContext(TimeContext)
    const setSleepTime = useContext(UpdateTimeContext)
    const isSortingStatus = useContext(IsSortingContext)

    useEffect(() => {

        sessionStorage.setItem('flipViewStatus', String(flipViewStatus))
        const barsContainer = document.querySelector('.barsContainer')

        // flipBarsContainer className is toggle here because if i did in the visualizer component
        // there would need to be a render and that would cause the bars to reset to the initial state 
        // and all the the sorted bars would be lost.

        if (!flipViewStatus) {
            barsContainer!.classList.remove('flipBarsContainer')
            return
        }
        barsContainer!.classList.add('flipBarsContainer')

    }, [flipViewStatus])

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

    const handleFreeze = () => {
        if (!sleepTime.isPause) {
            setSleepTime({ ...sleepTime, isPause: true })
            return
        }
        setSleepTime({ ...sleepTime, isPause: false })
    }

    const handleFlipView = () => {
        setFlipView(!flipViewStatus)
    }

    function handleShuffle() {
        if (isSortingStatus) {
            window.location.reload()
            return
        }
        shuffle(setArray)
    }

    return (
        <>
            <div id='controls-container'>
                <div id='range-container'>

                    <div id='rangeLables'>
                        <label htmlFor="Quantity">Quantity</label>
                        <label htmlFor="Speed">Speed</label>
                    </div>

                    <div id='range-inputs-container'>
                        <input
                            className={`${isSortingStatus ? 'disabled-Border-Clr' : ''} `}
                            onInput={handleInpuitQuantity}
                            disabled={isSortingStatus}
                            type="range"
                            name="Quantity"
                            id="Quantity"
                            min="10"
                            value={arrayData.length}
                            max="200"
                        />

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
                </div>
                <div id='shuffle-freeze-flip-view-container'>
                    <div id='shuffle-freeze-container'>
                        <button
                            title='This will also stop the current sorting algo...'
                            onClick={handleShuffle}>Shuffle</button>
                        <button onClick={handleFreeze}>{sleepTime.isPause ? 'Unfreeze' : 'Freeze'}</button>
                    </div>
                    <span onClick={handleFlipView} className='flip-view'>Flip-Bars</span>
                </div>
            </div>
        </>
    )
}

export default Controls
