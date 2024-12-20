import { useEffect, useState } from 'react'
import { useViewportWidth } from './viewport'

export const useResponsiveMenu = () => {
  const [showMenu, setShowMenu] = useState(false)
  const viewportWidth = useViewportWidth()

  useEffect(() => {
    if (viewportWidth > 640) {
      setShowMenu(false)
    }
  }, [viewportWidth])

  return [showMenu, setShowMenu]
}