import { useEffect, useState } from 'react'

export const useViewportWidth = () => {
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleViewportResize = () => {
      setViewportWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleViewportResize)

    return () => {
      window.removeEventListener('resize', handleViewportResize)
    }
  }, [])

  return viewportWidth
}