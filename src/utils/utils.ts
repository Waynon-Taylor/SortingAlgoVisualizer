import { ArrayData } from '../types/types'
import { IncreaseArrayQuantity } from '../types/types'

export const increaseArrayQuantity = ({
  array,
  currentQuantity,
  quantity,
  maxRange = 500,
  minRange = 50 }: IncreaseArrayQuantity) => {

  for (let i = currentQuantity; i <= quantity; i++) {
    const randomNumber = generateRandoNumber(maxRange!, minRange!)
    const listData: ArrayData = { height: randomNumber, green: false, red: false }
    array.push(listData)
  };
}

// generateRandoNumber is use to input random values between a given range to
//increase  the quantity of an unsorted array. 
export const generateRandoNumber = (max: number, min: number) => {
  const randomValue = Math.floor(Math.random() * (max - min) + min)
  return randomValue
}

// setTime reverses input range min and max direction
export const setTimer = (currentTime: number) => {
  let initialTime = 0, newTime: number, lowestTime = 2000
  // lowestTime represents the initialTime of 0 on input Range value = 2000
  if (currentTime !== lowestTime) {
    newTime = lowestTime - currentTime
    return newTime
  }
  return initialTime
}
