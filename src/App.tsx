import './App.css';
import ArrayProvider from './contexts/ArrayContex'
import TimeProvider from './contexts/TimeContext'
import Navigation from './components/Navigation/Navigation'
import Controls from './components/Controls'
import BarVisualizer from './components/Visualizers/BarVisualizer/BarVisualizer'


const App = () => {
    return (
        <>
            <ArrayProvider>
                    <TimeProvider>
                        <Navigation />
                        <Controls />
                    </TimeProvider>
                    <BarVisualizer />
            </ArrayProvider>
        </>
    )
}

export default App
