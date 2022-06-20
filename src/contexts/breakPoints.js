import { useMediaQuery } from 'react-responsive';


export const Desktop = ({ children }) => {
    const isDesktop = useMediaQuery({ minWidth: 992 })
    return isDesktop ? children : null
  }
  export const Tablet = ({ children }) => {
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 })
    return isTablet ? children : null
  }
  export const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ minWidth: 411 , maxWidth: 767 })
    return isMobile ? children : null
  }
  export const MobileX = ({ children }) => {
    const isMobileX = useMediaQuery({ minWidth: 280 , maxWidth:410})
    return isMobileX ? children : null
  }

  
