import { FC, MouseEventHandler } from 'react'
import { IconType } from 'react-icons'
import styles from './primarybutton.module.scss'

interface IPrimaryButton {
  text: string
  icon?: IconType
  onClick?: MouseEventHandler<HTMLButtonElement>
  className?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

export const PrimaryButton: FC<IPrimaryButton> = (props: IPrimaryButton) => {
  return (
    <button className={`${styles['button']} ${props?.className}`} type={props?.type} onClick={props.onClick} disabled={props?.disabled}>
      {props.icon && <props.icon className={styles['button__icon']} />}
      <p className={styles['button__text']}>{props.text}</p>
    </button>
  )
}
