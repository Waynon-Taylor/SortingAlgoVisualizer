import './App.css';
import ArrayProvider from './contexts/ArrayContex'
import TimeProvider from './contexts/TimeContext'
import DisabledProvider from './contexts/IsSortingContext'
import SortOptions from './components/SortOptions/SortOptions'
import Controls from './components/Controls/Controls'
import Visualizer from './components/Visualizer/Visualizer'
import Footer from './components/Footer/Footer'

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
            <Footer/>
        </>
    )
}

export default App
