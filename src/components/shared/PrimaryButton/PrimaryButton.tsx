import { FC, MouseEventHandler } from 'react';
import { IconType } from 'react-icons';
import styles from './primarybutton.module.scss';

interface IPrimaryButton {
  text: string
  icon?: IconType
  onClick?: MouseEventHandler<HTMLButtonElement>
  className?: string
  type?: "button" | "submit" | "reset"
}

export const PrimaryButton: FC<IPrimaryButton> = (props: IPrimaryButton) => {
  return (
    <button className={`${styles['button']} ${props?.className}`} type={props?.type} aria-autocomplete='none' onClick={props.onClick}>
      {props.icon && <props.icon className={styles['button__icon']} />}
      <h3 className={styles['button__text']}>{props.text}</h3>
    </button>
  )
}