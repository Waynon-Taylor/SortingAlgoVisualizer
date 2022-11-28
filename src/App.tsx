import './App.css';
import ArrayProvider from './contexts/ArrayContex'
import TimeProvider from './contexts/TimeContext'
import DisabledProvider from './contexts/DisabledContext'
import SortOptions from './components/SortOptions/SortOptions'
import Controls from './components/Controls/Controls'
import Visualizer from './components/Visualizer/Visualizer'

const App = () => {
    return (
        <>
            <ArrayProvider>
                <TimeProvider>
                    <DisabledProvider>
                        <SortOptions />
                        <Controls />
                    </DisabledProvider>
                </TimeProvider>
                <Visualizer />
            </ArrayProvider>
        </>
    )
}

export default App
