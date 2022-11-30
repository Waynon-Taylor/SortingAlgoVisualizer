import './Visualizer.css'
import { useEffect, useContext } from 'react';
import { ArrayData } from '../../types/types'
import { increaseArrayQuantity } from '../../utils/utils'
import { ArrayDataContext, UpdateArrayDataContext } from '../../contexts/ArrayContex'
// import { FlipViewContext } from '../../contexts/FlipViewContext'
import { v4 as ID } from 'uuid'

const Visualizer = () => {
  const array = useContext(ArrayDataContext)
  const setArray = useContext(UpdateArrayDataContext)
  // const flipViewStatus = useContext(FlipViewContext)

  useEffect(() => {
    //handle initial quantity
    const array: ArrayData = [], currentQuantity = 1
    let quantity = Number(sessionStorage.getItem("currentQuantity"));
    if (!quantity) {
      quantity = 100
      sessionStorage.setItem("currentQuantity", String(quantity));
    };
    increaseArrayQuantity({ array, currentQuantity, quantity })
    setArray!(array)
  }, [])

  console.log('render')
  return (
    <>
      <section>
        {/* <p>{`${array.length}`}</p> */}
        <div className={`barsContainer`}>
          {array.map((height) => {
            return (
              <div
                key={ID()}
                title={`${height}px`}
                className='bar default-bgColor '
                style={{ height: `${height}px` }}>
                {array.length <= 15 ? `${height}` : null}
              </div>)
          })}
        </div>
      </section>
    </>
  );
}
export default Visualizer;
