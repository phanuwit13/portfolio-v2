import React, { Dispatch, SetStateAction, useCallback, useEffect } from 'react'
import EnterIcon from '../icons/enter'

type Props = {
  scrolling: boolean
  setScrolling: Dispatch<SetStateAction<boolean>>
  setCurrentComponent: Dispatch<SetStateAction<number>>
}

const EnterButtonEvent = ({
  scrolling,
  setScrolling,
  setCurrentComponent,
}: Props) => {
  const handleKeydown = useCallback(
    (event: KeyboardEvent) => {
      if (scrolling) return
      setScrolling(true)
      if (event.code === 'Enter') {
        setCurrentComponent((prev) => (prev === 4 ? 1 : Math.min(prev + 1, 5)))
      }

      setTimeout(() => {
        setScrolling(false)
      }, 1500)
    },
    [scrolling, setCurrentComponent, setScrolling]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeydown)

    return () => {
      window.removeEventListener('keydown', handleKeydown)
    }
  }, [ handleKeydown])

  return (
    <div className='font-bebas-neue text-[40px] text-[#CEB7FF] absolute bottom-5 left-16 animate-bounce transition duration-700 ease-in-out flex flex-col items-center'>
      PRESS
      <EnterIcon classNames='w-[68px]' />
    </div>
  )
}

export default EnterButtonEvent
