import { useState, useEffect } from "react";

 const UseMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    window.addEventListener("resize", listener);
    return () => window.removeEventListener("resize", listener);
  }, [matches, query]);

  return matches;
}
export default UseMediaQuery;


// import React, { createContext, useEffect, useState } from 'react';
// import { useMediaQuery } from 'react-responsive';

// export const UseBreakPoints = createContext();


// const [matches, setMatches] = useState(false);

// export const UseBreakPointsProvider = (props) => {
//     const isMobileSmall = useMediaQuery({ query: '(max-width: 325px)' });
//     const isMobileMid = useMediaQuery({ query: '(max-width: 375px)' });
//     const isMobileFloor = useMediaQuery({ query: '(max-width: 425px)' });

//     const isTabletFloor = useMediaQuery({ query: '(max-width: 426px)' });
//     ///const isTabletMid = useMediaQuery({ query: '(max-width: 768px)' });
//     useEffect(() => {
//         IsTabletMid =  () => useMediaQuery({ minWidth: 768, maxWidth: 991 });
//     } , []);

//     const  IsTabletMid = useMediaQuery({ minWidth: 768, maxWidth: 991 });
//         const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 })

//     const isTabletCeil = useMediaQuery({ query: '(max-width: 1024px)' });

//     const isLaptopFloor = useMediaQuery({ query: '(max-width: 1025px)' });
//     const isLaptopCeil = useMediaQuery({ query: '(max-width: 1440px)' });

//     const isXHDFloor = useMediaQuery({ query: '(max-width: 1441px)' });
//     const isXHDCeil = useMediaQuery({ query: '(max-width: 4096px)' });

//     const [Points, setPoint] = useState([
//         { isMobileSmall },
//         { isMobileMid },
//         { isMobileFloor },
//         { isTabletFloor },
//         { IsTabletMid },
//         { isTabletCeil },
//         { isLaptopFloor },
//         { isLaptopCeil },
//         { isXHDFloor },
//         { isXHDCeil }])

//     return (
//         <UseBreakPoints.Provider value={{ Points }}>
//             {props.children}
//         </UseBreakPoints.Provider>
//     );



// };
// export default UseBreakPoints;