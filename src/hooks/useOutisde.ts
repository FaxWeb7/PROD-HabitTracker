import { useEffect, useRef, useState } from 'react'

interface UseOutsideReturnType {
  ref: React.LegacyRef<HTMLDivElement> | undefined
  isShow: boolean
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>
}

export const useOutside = (initialIsVisible: boolean): UseOutsideReturnType => {
  const [isShow, setIsShow] = useState(initialIsVisible)
  const ref = useRef<HTMLDivElement>(null)

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setIsShow(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [])

  return { ref, isShow, setIsShow }
}
