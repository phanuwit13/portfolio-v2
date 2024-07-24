import React from 'react'

interface Props {
  className?: string
}

const GmailIcon = ({ className }: Props) => {
  return (
    <svg
      width='45px'
      height='45px'
      viewBox='0 0 48 48'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M24 48C10.7452 48 0 37.2548 0 24C0 10.7452 10.7452 0 24 0C37.2548 0 48 10.7452 48 24C48 37.2548 37.2548 48 24 48ZM24.3344 22.653C26.2995 22.653 35.8544 17.28 35.8544 17.28L35.8698 16.32C35.8698 15.2602 35.0096 14.4 33.9469 14.4H14.7219C13.6602 14.4 12.8 15.2602 12.8 16.32V17.1754C12.8 17.1754 22.4595 22.653 24.3344 22.653ZM12.8154 20.16C12.8144 20.16 22.4595 25.293 24.3344 25.293C26.3898 25.293 35.8544 20.16 35.8544 20.16L35.8698 31.68C35.8698 32.7398 35.0096 33.6 33.9469 33.6H14.7219C13.6611 33.6 12.8 32.7398 12.8 31.68L12.8154 20.16Z'
        fill='#CEB7FF'
      />
    </svg>
  )
}

export default GmailIcon
