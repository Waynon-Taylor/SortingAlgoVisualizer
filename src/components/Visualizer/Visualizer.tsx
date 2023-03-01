import './Visualizer.css'
import { useEffect, useContext } from 'react';
import { ArrayData } from '../../types/types'
import { increaseArrayQuantity, evaluateSessionStorageValue } from '../../utils/utils'
import { ArrayDataContext, UpdateArrayDataContext } from '../../contexts/ArrayContex'
import { v4 as ID } from 'uuid'

const Visualizer = () => {
  const array = useContext(ArrayDataContext)
  const setArray = useContext(UpdateArrayDataContext)

  useEffect(() => {
    //handle initial quantity
    const array: ArrayData = [], currentQuantity = 1;
    const quantity = evaluateSessionStorageValue("currentQuantity", 100)
    increaseArrayQuantity({ array, currentQuantity, quantity })
    setArray!(array)
  }, [])

  return (
    <>
      <section>
        <div className={`barsContainer`}>
          {array.map((height) => {
            return (
              <div
                key={ID()}
                title={`${height}`}
                className='bar '
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
