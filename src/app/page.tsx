'use client'
import classNames from 'classnames'
import { useState } from 'react'
import { bebas_neue } from './fonts'
import ScrollDisplay from '@/components/scroll-display'
import Link from 'next/link'
import EnterButtonEvent from '@/components/enter-button-event'
import SocialMenu from '@/components/social-menu'

export default function Home() {
  const [currentComponent, setCurrentComponent] = useState(1)
  const [scrolling, setScrolling] = useState(false)

  return (
    <main
      className={classNames(
        bebas_neue.variable,
        'flex min-h-screen w-full bg-[url("/images/bg-1.png")] bg-cover bg-center bg-black relative overflow-hidden'
      )}
    >
      <Link
        href='/contact'
        className='text-white text-[40px] font-bebas-neue right-[60px] top-11 absolute'
      >
        CONTACT ME
      </Link>
      <div
        className={classNames(
          'w-[1000px] h-[1000px] bg-[url("/images/earth.png")] absolute left-1/2 -translate-x-1/2 -bottom-[60%] bg-cover mix-blend-lighten',
          {
            'rotate-0 transition duration-[1500ms] ease-in-out':
              currentComponent === 1,
            '-rotate-90 transition duration-[1500ms] ease-in-out':
              currentComponent === 2,
            '-rotate-180 transition duration-[1500ms] ease-in-out':
              currentComponent === 3,
            '-rotate-[270deg] transition duration-[1500ms] ease-in-out':
              currentComponent === 4,
          }
        )}
      />
      <SocialMenu />
      <EnterButtonEvent
        setCurrentComponent={setCurrentComponent}
        scrolling={scrolling}
        setScrolling={setScrolling}
      />
      <ScrollDisplay
        setCurrentComponent={setCurrentComponent}
        scrolling={scrolling}
        setScrolling={setScrolling}
      />
    </main>
  )
}
