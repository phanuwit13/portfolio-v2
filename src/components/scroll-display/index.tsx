import React, { Dispatch, SetStateAction, useCallback, useEffect } from 'react'
import ScrollIcon from '../icons/scroll'

type Props = {
  scrolling: boolean
  setScrolling: Dispatch<SetStateAction<boolean>>
  setCurrentComponent: Dispatch<SetStateAction<number>>
}

const ScrollDisplay = ({
  scrolling,
  setScrolling,
  setCurrentComponent,
}: Props) => {
  const handleWheel = useCallback(
    (event: WheelEvent) => {
      if (scrolling) return
      setScrolling(true)
      if (event.deltaY > 0) {
        setCurrentComponent((prev) => (prev === 4 ? 1 : Math.min(prev + 1, 5)))
      } else {
        setCurrentComponent((prev) => Math.max(prev - 1, 1))
      }

      setTimeout(() => {
        setScrolling(false)
      }, 1500)
    },
    [scrolling, setCurrentComponent, setScrolling]
  )

  useEffect(() => {
    window.addEventListener('wheel', handleWheel)

    return () => {
      window.removeEventListener('wheel', handleWheel)
    }
  }, [handleWheel])

  return (
    <div className='font-bebas-neue text-[40px] text-[#CEB7FF] absolute bottom-5 right-16 animate-bounce transition duration-700 ease-in-out flex flex-col items-center'>
      SCROLL
      <ScrollIcon classNames='w-[59px]' />
    </div>
  )
}

export default ScrollDisplay
