import React from 'react'
import ResumeIcon from '../icons/resume'
import LinkedinIcon from '../icons/linkedin'
import GithubIcon from '../icons/github'
import GmailIcon from '../icons/gmail'

type Props = {}

const SocialMenuList = [
  {
    icon: <GithubIcon />,
    path: 'https://github.com/phanuwit13',
  },
  {
    icon: <LinkedinIcon />,
    path: 'https://www.linkedin.com/in/phanuwit13/',
  },
  {
    icon: <ResumeIcon />,
    path: 'https://www.canva.com/design/DAGIsQOWOY8/LSBa90rvoLIJwuDG64sNMQ/view?utm_content=DAGIsQOWOY8&utm_campaign=designshare&utm_medium=link&utm_source=editor',
  },
  {
    icon: <GmailIcon />,
    path: 'mailto:big.phanuwit@gmail.com',
  },
]

const SocialMenu = (props: Props) => {
  return (
    <div className='flex gap-12 flex-col absolute left-16 top-1/2 -translate-y-1/2'>
      {SocialMenuList.map((item, index) => {
        return (
          <a href={item.path} target='_blank' key={`social-${index}`}>
            {item.icon}
          </a>
        )
      })}
    </div>
  )
}

export default SocialMenu
