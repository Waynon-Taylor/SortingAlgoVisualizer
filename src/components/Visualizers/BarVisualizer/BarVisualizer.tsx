import { useEffect, useContext } from 'react';
import { ArrayData } from '../../../types/types'
import { increaseArrayQuantity } from '../../../utils/utils'
import { ArrayDataContext, UpdateArrayDataContext } from '../../../contexts/ArrayContex'
import { v4 as ID } from 'uuid'

const BarVisualizer = () => {
  const array = useContext(ArrayDataContext)
  const setArray = useContext(UpdateArrayDataContext)

  useEffect(() => {
    //handle initial quantity
    const array: ArrayData[] = [], currentQuantity = 1
    let quantity = Number(sessionStorage.getItem("currentQuantity"));
    console.log(quantity)
    if (!quantity) quantity = 200
    increaseArrayQuantity({ array, currentQuantity, quantity })
    setArray!(array)
  }, [])

  console.log('render')

  return (
    <>
      <section>
        <p>{`quantity: ${array.length}`}</p>
        <div className='barsContainer'>
          {array.map(({ height, green, red }) => {
            return (
              <div
                key={ID()}
                title={`${height}px`}
                className='bar default-bgColor '
                style={{ height: `${height}px` }}>
              </div>)
          })}
        </div>
      </section>
    </>
  );
}
export default BarVisualizer;
