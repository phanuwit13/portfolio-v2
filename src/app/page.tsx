'use client'
import classNames from 'classnames'
import { useState } from 'react'
import { bebas_neue } from './fonts'
import ScrollDisplay from '@/components/scroll-display'
import Link from 'next/link'
import EnterButtonEvent from '@/components/enter-button-event'
import SocialMenu from '@/components/social-menu'
import { motion } from 'framer-motion'

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
      <div className='mt-36 mx-auto text-center space-y-24'>
        <div className='space-y-2'>
          <div className='flex gap-5 items-center'>
            <div className='h-3 shadow-[_0_0_4px_#FFFFFF,_0_0_8px_#5100ff] flex-1' />
            <p className='font-death-star text-lg mt-0.5 text-[#CEB7FF] tracking-widest'>
              A passionate web developer
            </p>
          </div>
          <h1 className='font-death-star text-6xl [text-shadow:_0_0_4px_#FFFFFF,_0_0_8px_#5100ff] mix-blend-screen tracking-widest'>
            WELCOME TO MY SITE!
          </h1>
          <div className='flex gap-5 items-center'>
            <p className='font-death-star text-lg mt-0.5 text-[#CEB7FF] tracking-widest'>
              A passionate web developer
            </p>
            <div className='h-3 shadow-[_0_0_4px_#FFFFFF,_0_0_8px_#5100ff] flex-1' />
          </div>
        </div>

        <h1 className='font-death-star text-6xl [text-shadow:_0_0_4px_#FFFFFF,_0_0_8px_#5100ff] mix-blend-screen tracking-widest'>
          I am Phanuwit
        </h1>
      </div>
      {/* <div className='z-10 w-full absolute bottom-[140px] flex justify-center'>
        <motion.div
          className='w-[400px] h-[200px] bg-white'
          // whileTap={{ scale: 0.9 }}
          whileFocus={{ scale: 1.1 }}
          whileTap={{ scaleX: 3 }}
        >
          asdsad
        </motion.div>
      </div> */}

      <div
        className={classNames(
          'max-w-[2000px] min-w-[900px] w-[60%] aspect-square bg-[url("/images/earth.webp")] absolute left-1/2 -translate-x-1/2 -bottom-[600px] xl:-bottom-[40vw] bg-cover mix-blend-lighten',
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
