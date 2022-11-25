import './App.css';
import ArrayProvider from './contexts/ArrayContex'
import TimeProvider from './contexts/TimeContext'
import DisabledProvider from './contexts/DisabledContext'
import Navigation from './components/Navigation/Navigation'
import Controls from './components/Controls'
import BarVisualizer from './components/Visualizers/BarVisualizer/BarVisualizer'

const App = () => {
    return (
        <>
            <ArrayProvider>
                <TimeProvider>
                    <DisabledProvider>
                        <Navigation />
                        <Controls />
                    </DisabledProvider>
                </TimeProvider>
                <BarVisualizer />
            </ArrayProvider>
        </>
    )
}

export default App
