import './App.css';
import ArrayProvider from './contexts/ArrayContex'
import TimeProvider from './contexts/TimeContext'
import DisabledProvider from './contexts/DisabledContext'
import FlipViewProvider from './contexts/FlipViewContext'
import SortOptions from './components/SortOptions/SortOptions'
import Controls from './components/Controls/Controls'
import Visualizer from './components/Visualizer/Visualizer'

const App = () => {
    return (
        <>
            <ArrayProvider>
                <FlipViewProvider>
                    <TimeProvider>
                        <DisabledProvider>

                            <SortOptions />
                            <Controls />

                        </DisabledProvider>
                    </TimeProvider>

                    <Visualizer />
                    
                </FlipViewProvider>
            </ArrayProvider>
        </>
    )
}

export default App
