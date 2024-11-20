import React, { useContext } from 'react';

import facebook from '../assets/facebook-logo.svg';
import instagram from '../assets/instagram-logo.svg';
import whatsapp from '../assets/whatsapp-logo.svg';
import linkedin from '../assets/LinkedIn-Icon-White-Logo.wine.svg';
import YouTube from '../assets/youtube-play-button.svg';
import email from '../assets/purplemail.svg';
import twitter from '../assets/twitter5.svg';

import styles from '../styles/mediaLogo.module.scss';
import { VisibilityContext } from '../contexts/visibilityContext';
import WhatsApp from './whatsApp';



const MediaLogo = () => {


    const { setWhatsAppFrmShow , whatsAppFrmShow } = useContext(VisibilityContext);

    const handleWhatsApp = () =>{
        setWhatsAppFrmShow();
        console.log(whatsAppFrmShow);
    }

    const scrollToContactUs = () => {
        window && window.scrollTo({
            top: 5500,
            behavior: "smooth"
        });
    };

   return(<>
                            
                            <a  id = {styles.emailAd} onClick={scrollToContactUs}>
                                  hello@SofTestingCa.com
                             </a>
                             <a onClick={scrollToContactUs}>
                                    <img  border="0" alt="email" src={email} width="18px" height="18px" className={styles.email}></img>                       
                              </a>
                              
                              <a href="https://www.Twitter.com"  target="_blank"  rel="noreferrer">
                                    <img  border="0" alt="Twitter" src={twitter}  className={styles.twitter}></img>
                              </a>
                            <a href="https://www.youtube.com/channel/UCBcHbd6YbpPog5-jR9f9OOA" target="_blank" rel="noopener noreferrer">
                                <img  border="0" alt="YouTube" src={YouTube} width="25px" height="25px" className={styles.YouTube}></img>
                            </a>
                            <a href="https://linkedin.com/in/mahnaz-karimi-68042a1a7" target="_blank" rel="noopener noreferrer">
                                <img  border="0" alt="linkedin" src={linkedin} width="25px" height="25px" className={styles.linkedin}></img>
                            </a>
                            <a href="https://www.facebook.com/SofTesting-108404168575498" target="_blank" rel="noopener noreferrer">
                                <img  border="0" alt="facebook" src={facebook} width="25px" height="25px" className={styles.facebook}></img>
                            </a>
                            <a href="https://www.instagram.com/p/Ce_YjGqtkC6/?igshid=YmMyMTA2M2Y=" target="_blank" rel="noopener noreferrer">
                                <img  border="0" alt="instagram" src={instagram} width="25px" height="25px" className={styles.instagram}></img>
                            </a>
                           
                              <img  border="0" alt="whatsapp" src={whatsapp} onClick = {handleWhatsApp}  width="25px" height="25px" className={styles.whatsapp}></img>
                                   {whatsAppFrmShow? <WhatsApp/>:null}
   </> 
    )
}
export default MediaLogo;