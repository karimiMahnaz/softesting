import React, { useEffect, useState, useContext, useRef } from "react";
import { useHistory } from 'react-router-dom';

import styles from '../styles/scrollToTop.module.scss';
import { VisibilityContext } from '../contexts/visibilityContext';
import { AuthContext } from '../contexts/authContext';
import { Desktop, Tablet, Mobile, MobileX } from '../contexts/breakPoints';

import icon16 from '../assets/Icon/Arrow/up-arrow4.png'
import chat from '../assets/Icon/chat2.svg'

import OnLineChat from './onLineChat';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [acceptCookie, setAcceptCookie] = useState(false);
  const { states, dispatch } = useContext(AuthContext);

  const { onLineChatFrmShow, loginFrmShow, contactFrmShow, setOnLineChatFrmShow, setWhatsAppFrmShow, setOffWhatsAppFrmShow } = useContext(VisibilityContext);
  const [dimensions, setDimensions] = React.useState({
    height: window.innerHeight,
    width: window.innerWidth
  });

  function debounce(fn, ms) {
    let timer
    return _ => {
      clearTimeout(timer)
      timer = setTimeout(_ => {
        timer = null
        fn.apply(this, arguments)
      }, ms)
    };
  }

  useEffect(() => {
    const debouncedHandleResize = debounce(function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth
      })
    }, 1000)

    window.addEventListener('resize', debouncedHandleResize)

    return _ => {
      window.removeEventListener('resize', debouncedHandleResize)

    }
  })

  let history = useHistory();
  const handleOnLineChat = () => {
    //// history.push("/OnLineChat");
    setOnLineChatFrmShow();
  }
  // Show button when page is scorlled upto given distance

  const toggleVisibility = () => {
    if (window && window.pageYOffset > 300 && (window.pageYOffset < 5200 || window.pageYOffset > 5900)) {
      setIsVisible(true);
      setOffWhatsAppFrmShow();
    } else {
      setIsVisible(false);
    }

  };

  // Set the top cordinate to 0
  // make scrolling smooth
  const scrollToTop = () => {
    window && window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const scrollToContactUs = () => {

    window && window.scrollTo({
      top: 5600,
      behavior: "smooth"
    });

  };

  function allStorage() {

    var values = [],
      keys = Object.keys(localStorage),
      i = keys.length;

    while (i-- && keys[i] === 'cookies') {
      values.push(localStorage.getItem(keys[i]));
      break;
    }

    return values;
  }

  const handleAcceptCookie = () => {
    setAcceptCookie(true);
    dispatch({
      type: 'ScrollToTop',
      cookies: true

    })

    setAcceptCookie(localStorage.getItem('cookies'));
    console.log('states', localStorage.getItem('cookies'))
    console.log('allStorage', allStorage())
  }

  useEffect(() => {
    Window && window.addEventListener("scroll", toggleVisibility);
  }, []);

  ///`${onLineChatFrmShow? styles.active: styles.inactive}`

  return (
    <>
      <Desktop>
        <div id={styles.container}  >
          {isVisible && !contactFrmShow && !loginFrmShow &&
            <div id={styles.supportChat} className={styles.active} >
              <img src={chat} alt="chat" onClick={handleOnLineChat} ></img>
              {onLineChatFrmShow && <OnLineChat />}
            </div>}


          {isVisible && !onLineChatFrmShow && !contactFrmShow && !loginFrmShow &&
            <div className={styles.contactus2} onClick={scrollToContactUs} style={{ left: `${dimensions.width - 100}px` }}>
              <span id={styles.contactus2} onClick={scrollToContactUs}> Contact Us </span>
            </div>}



          {isVisible && !onLineChatFrmShow && !contactFrmShow && !loginFrmShow &&
            <div className={styles.upscroll} onClick={scrollToTop} style={{ left: `${dimensions.width - 90}px` }}>
              <img src={icon16} className={styles.upscroll} alt="up logo " onClick={scrollToTop} ></img>
            </div>}

          {isVisible && !onLineChatFrmShow && !contactFrmShow && !loginFrmShow &&
            <div className={localStorage.getItem('cookies') ? styles.inactive : styles.cookie}  >
             <p> Our website uses cookies to ensure you get the best experience.<br />
              By browsing the website you agree to our use of cookies.
              Please note, we do not collect sensitive data and child data.</p>
              <button className={styles.acceptCookie} onClick={handleAcceptCookie}>Accept</button>
            </div>}
        </div>

      </Desktop>
      <Tablet>
        <div id={styles.container}  >
          {isVisible && !contactFrmShow && !loginFrmShow &&
            <div id={styles.supportChat} className={styles.active} >
              <img src={chat} alt="chat" onClick={handleOnLineChat} ></img>
              {onLineChatFrmShow && <OnLineChat />}
            </div>}


          {isVisible && !onLineChatFrmShow && !contactFrmShow && !loginFrmShow &&
            <div className={styles.contactus2} onClick={scrollToContactUs} style={{ left: `${dimensions.width - 100}px` }}>
              <span id={styles.contactus2} onClick={scrollToContactUs}> Contact Us </span>
            </div>}



          {isVisible && !onLineChatFrmShow && !contactFrmShow && !loginFrmShow &&
            <div className={styles.upscroll} onClick={scrollToTop} style={{ left: `${dimensions.width - 90}px` }}>
              <img src={icon16} className={styles.upscroll} alt="up logo " onClick={scrollToTop} ></img>
            </div>}

          {isVisible && !onLineChatFrmShow && !contactFrmShow && !loginFrmShow &&
            <div className={localStorage.getItem('cookies') ? styles.inactive : styles.cookie}  >
              <p> Our website uses cookies to ensure you get the best experience.<br />
              By browsing the website you agree to our use of cookies.
              Please note, we do not collect sensitive data and child data. </p>
              <button className={styles.acceptCookie} onClick={handleAcceptCookie}>Accept</button>
            </div>}
        </div>

      </Tablet>
      <Mobile>
        <div id={styles.container}  >
          {isVisible && !onLineChatFrmShow && !contactFrmShow && !loginFrmShow &&
            <div className={localStorage.getItem('cookies') ? styles.inactive : styles.cookie}  >
             <p> Our website uses cookies to ensure you get the best experience.<br />
              By browsing the website you agree to our use of cookies.
              Please note, we do not collect sensitive data and child data. </p>
              <button className={styles.acceptCookie} onClick={handleAcceptCookie}>Accept</button>
            </div>}
        </div>
      </Mobile>
      <MobileX>
        <div id={styles.container}  >
          {isVisible && !onLineChatFrmShow && !contactFrmShow && !loginFrmShow &&
            <div className={localStorage.getItem('cookies') ? styles.inactive : styles.cookie}  >
             <p> Our website uses cookies to ensure you get the best experience.<br />
              By browsing the website you agree to our use of cookies.
              Please note, we do not collect sensitive data and child data.</p>
              <button className={styles.acceptCookie} onClick={handleAcceptCookie}>Accept</button>
            </div>}
        </div>
      </MobileX>
    </>

  );
}

export default ScrollToTop;