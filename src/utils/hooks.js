import { useState, useCallback, useEffect, useRef } from 'react'

export const useModal = (initialMode = false) => {
  const [modalOpen, setModalOpen] = useState(initialMode)
  const handleModal = useCallback(() => {
    setModalOpen((prevState) => !prevState)
  }, [])
  return [modalOpen, handleModal]
}

export const useResizer = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640)

  const handleSizeChange = useCallback(() => {
    return setIsMobile(window.innerWidth < 640)
  }, [])

  useEffect(() => {
    window.addEventListener('resize', handleSizeChange)

    return () => {
      window.removeEventListener('resize', handleSizeChange)
    }
  }, [isMobile, handleSizeChange])

  return isMobile
}

export const usePrevious = (value) => {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = useRef()

  // Store current value in ref
  useEffect(() => {
    ref.current = value
  }, [value]) // Only re-run if value changes

  // Return previous value (happens before update in useEffect above)
  return ref.current
}
