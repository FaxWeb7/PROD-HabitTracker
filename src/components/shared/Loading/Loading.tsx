import { FC } from 'react';
import { PulseLoader } from 'react-spinners';

interface ILoadingProps {
  size?: number
}

export const Loading: FC<ILoadingProps> = (props: ILoadingProps) => {
  return (
    <PulseLoader color="#2E2E2E" size={props.size || 10} />
  )
}