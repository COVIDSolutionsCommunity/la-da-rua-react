import { useState, useCallback, useEffect, useRef } from 'react'
import ReactGA from 'react-ga'

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

export const useDebounce = (value, delay) => {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value)
      }, delay)

      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler)
      }
    },
    [value, delay] // Only re-call effect if value or delay changes
  )

  return debouncedValue
}

export const useReactGA = (route) => {
  useEffect(() => {
    ReactGA.pageview(`/${route}`)
  }, [route])
}
