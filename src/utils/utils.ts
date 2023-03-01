import { IncreaseArrayQuantity, SleepTime, ArrayData } from '../types/types'

export function evaluateSessionStorageValue<T>(key: string, InitializeValue: T): T {
  let value = sessionStorage.getItem(key)
  if (typeof value === 'string') {
    return JSON.parse(value)
  }
  sessionStorage.setItem(key, JSON.stringify(InitializeValue))
  return InitializeValue
}

export const increaseArrayQuantity = ({
  array,
  currentQuantity,
  quantity,
  maxRange = 500,
  minRange = 50 }: IncreaseArrayQuantity) => {

  for (let i = currentQuantity; i <= quantity; i++) {
    const randomNumber = generateRandoNumber(maxRange!, minRange!)
    const height = randomNumber
    array.push(height)
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

export async function wait(sleepTimeRef: SleepTime) {
  const pausetime = 250
  while (sleepTimeRef.isPause)
    await new Promise(resolve => setTimeout(() => resolve(null), pausetime))
  return new Promise(resolve => setTimeout(() => resolve(null), sleepTimeRef.inputSpeed))
}

export function shuffle(setArray: React.Dispatch<React.SetStateAction<ArrayData>> | null, maxQuantity?: number) {
  const array: ArrayData = [], currentQuantity = 1
  let quantity = Number(sessionStorage.getItem("currentQuantity"))

  if (typeof maxQuantity === 'number') {
    if (quantity > maxQuantity){
      quantity = maxQuantity
    }
  }

  increaseArrayQuantity({ array, currentQuantity, quantity })
  setArray!(array)
}
