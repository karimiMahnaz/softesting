import React, { useState, useEffect } from 'react';

import styles from '../styles/logoShow.module.scss';






export default function LogoShow({images=[], interval=7000}) {
    const [thumbnails, setThumnails] = useState([]);
  
    const [logo, setLogoStyle] = useState(0);

   
    useEffect(() => {
        setThumnails(images);
       // setLogoStyle({
            
          //  left: 
          
       // });
       
    //     // if (logo1 > 0) {
    //     //     setLogo2Style({
    //     //         backgroundImage: "url('" + images[logo1 - 1] + "')"
    //     //     });
    //     // } else {
    //     //     setLogo2Style({
    //     //         backgroundImage: "url('" + images[images.length - 1] + "')"
    //     //     });
    //     // }

    //     // if (logo1 === images.length - 1) {
    //     //     setLogo3Style({
    //     //         backgroundImage: "url('" + images[0] + "')"
    //     //     });
    //     // } else {
    //     //     setLogo3Style({
    //     //         backgroundImage: "url('" + images[logo1 + 1] + "')"
    //     //     });
    //     // }
    //     // if (logo1 === images.length - 2) {
    //     //     setLogo4Style({
    //     //         backgroundImage: "url('" + images[0] + "')"
    //     //     });
    //     // } else {
    //     //     setLogo4Style({
    //     //         backgroundImage: "url('" + images[logo1 + 1] + "')"
    //     //     });
    //     // }

    //     const loop = setInterval(() => {
    //         if (logo1 === images.length - 1) {
    //             setLogo1Style (0);
    //         } else {
               
    //             setLogo1Style (logo1+1);
    //         }
    //     }, interval);
    //    return () => clearInterval(loop);
     }, [images, logo, interval]);

    // // function previous() {
    // //     if (currentSlide > 0) {
    // //         setCurrentSlide(currentSlide - 1);
    // //     } else {
    // //         setCurrentSlide(thumbnails.length - 1);
    // //     }
    // // }

    // function next() {
    //     if (currentSlide === thumbnails.length - 1) {
    //         setCurrentSlide(0);
    //     } else {
    //         setCurrentSlide(currentSlide + 1);
    //     }
     //}
////style={{ backgroundImage: `url(${images[0]})` }}
    return (
        <div className={styles.logoShow}>
           <div className={styles.logo_holder}>

               
                    <div style={{ backgroundImage: `url(${images[0]})` }} className={styles.logo_thumbnail}></div>
                    <div style={{ backgroundImage: `url(${images[1]})` }} className={styles.logo_thumbnail}></div>
                    <div style={{ backgroundImage: `url(${images[2]})` }} className={styles.logo_thumbnail}></div>
                    <div style={{ backgroundImage: `url(${images[3]})` }} className={styles.logo_thumbnail}></div>
                    <div style={{ backgroundImage: `url(${images[4]})` }} className={styles.logo_thumbnail}></div>
                    <div style={{ backgroundImage: `url(${images[5]})` }} className={styles.logo_thumbnail}></div>
                    <div style={{ backgroundImage: `url(${images[6]})` }} className={styles.logo_thumbnail}></div>
                    <div style={{ backgroundImage: `url(${images[7]})` }} className={styles.logo_thumbnail}></div>
                    <div style={{ backgroundImage: `url(${images[8]})` }} className={styles.logo_thumbnail}></div>
                    <div style={{ backgroundImage: `url(${images[9]})` }} className={styles.logo_thumbnail}></div>
                    <div style={{ backgroundImage: `url(${images[10]})` }} className={styles.logo_thumbnail}></div>
                    <div style={{ backgroundImage: `url(${images[11]})` }} className={styles.logo_thumbnail}></div>
                    <div style={{ backgroundImage: `url(${images[12]})` }} className={styles.logo_thumbnail}></div>
                    <div style={{ backgroundImage: `url(${images[13]})` }} className={styles.logo_thumbnail}></div>
                    <div style={{ backgroundImage: `url(${images[14]})` }} className={styles.logo_thumbnail}></div>
                    <div style={{ backgroundImage: `url(${images[15]})` }} className={styles.logo_thumbnail}></div>

              </div>
         
        </div>

    )
}