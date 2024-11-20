import React, { useContext, useRef, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useMediaQuery } from "react-responsive";

import styles from "../styles/header.module.scss";
import { Desktop, Tablet, Mobile, MobileX } from "../contexts/breakPoints";
import SignIn from "../pages/signIn";
import Dashboard from "../components/dashboard";

import { VisibilityContext } from "../contexts/visibilityContext";
import { AuthContext } from "../contexts/authContext";
import facebook from "../assets/facebook-logo.svg";
import instagram from "../assets/instagram-logo.svg";
import whatsapp from "../assets/whatsapp-logo.svg";
import linkedin from "../assets/LinkedIn-Icon-White-Logo.wine.svg";
import YouTube from "../assets/youtube-play-button.svg";
import twitter from "../assets/twitter5.svg";
import email from "../assets/purplemail.svg";
import home from "../assets/2341557.png";
import downLoadAppIcon from "../assets/dashboard/download.png";
import search from "../assets/Icon/search.png";
import WhatsApp from "./whatsApp";

const Header = () => {
  const {
    loginFrmShow,
    dashboardFrmShow,
    setDashboardFrmShow,
    setLoginFrmShow,
    setBodyFrmShow,
    setWhatsAppFrmShow,
    whatsAppFrmShow,
    setBlogShow,
  } = useContext(VisibilityContext);
  const { states } = useContext(AuthContext);
  const [downLoadHover, setDownLoadHover] = useState(false);

  const appElement = useRef(null);
  /// let deferredPrompt = null;
  //  const installApp = document.querySelector('.App');
  // if (appElement.current) {

  //     appElement.current.addEventListener('click', () => {
  //          var userAnswer = window.confirm("Do you want to install SofTesting App?");
  //           console.log(userAnswer);
  //           if (userAnswer) {
  //     console.log('deferredPrompt', deferredPrompt);
  //     if (deferredPrompt) {
  //         deferredPrompt.prompt();
  //         deferredPrompt.userChoice.then((choice) => {
  //             console.log(choice);
  //             if (choice.outcome === 'dismissed') {
  //                 console.log('installation was cancelled');
  //             } else {
  //                 console.log('User Added To Home Screen');
  //             }
  //         });
  //         deferredPrompt = null;
  //     }
  //         }
  //    });
  //  }

  const handleBlogShow = () => {
    setBlogShow();
  };

  const handleMouseOver = () => {
    setDownLoadHover(true);
  };
  const handleMouseOut = () => {
    setDownLoadHover(false);
  };

  window.addEventListener("beforeinstallprompt", (event) => {
    console.log("listenner 2 ");
    console.log("beforeinstallprompt run .");
    event.preventDefault();
    window.deferredPrompt = event;
    console.log("saved the install event");
    // return false;
  });

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      console.log("listenner 3 ");
      navigator.serviceWorker
        .register("../../public/sw.js")
        .then(() => {
          console.log("Service worker registered!");
        })
        .catch((e) => {
          console.error("SW Errors while registering!", e);
        });
    });
  }
  const scrollToContactUs = () => {
    window &&
      window.scrollTo({
        top: 5600,
        behavior: "smooth",
      });
  };

  let history = useHistory();

  const handleSignIn = () => {
    ///    history.push("/signin");
    setLoginFrmShow();
  };

  const handleDashboard = () => {
    //   history.push("/dashboard");
    setDashboardFrmShow();
  };

  const handleWhatsApp = () => {
    setWhatsAppFrmShow();
  };
  let auth = false;
  let emailW = "";

  auth = JSON.parse(localStorage.getItem("authorized")) === true ? true : false;
  emailW =
    JSON.parse(localStorage.getItem("authorized")) === true
      ? localStorage
          .getItem("userEmail")
          .replace('"', "")
          .substring(
            0,
            localStorage.getItem("userEmail").replace('"', "").indexOf("@")
          )
      : "";
  // console.log('auth', JSON.stringify(localStorage.getItem('authorized')));
  // console.log('auth', auth);
  // console.log('emailW', JSON.stringify(localStorage.getItem('userEmail')));
  // console.log('emailw',emailW);
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  const handleApp = (e) => {
    e.preventDefault();
    if (isMobile) {
      toast.info("please click 'add to home screen button'.");
    } else {
      var userAnswer = window.confirm("Do you want to install SofTesting App?");
      console.log(userAnswer);
      if (userAnswer) {
        console.log("deferredPrompt", window.deferredPrompt);
        if (window.deferredPrompt) {
          window.deferredPrompt.prompt();
          window.deferredPrompt.userChoice.then((choice) => {
            console.log(choice);
            if (choice.outcome === "dismissed") {
              console.log("installation was cancelled");
            } else {
              console.log("User Added To Home Screen");
            }
          });
          window.deferredPrompt = null;
        }
      }
      setDownLoadHover(false);
    }
  };

  return (
    <div className={styles.header}>
      <Desktop>
        <button className={styles.signIn} onClick={handleSignIn}>
          SignIn
        </button>
        {loginFrmShow ? <SignIn /> : null};
        {/* <button className={styles.signIn} onClick={setRegisterFrmShow}> SignIn </button> 
                                         {registerFrmShow && <SignUp />} */}
        {auth && (
          <a className={styles.welcome} onClick={handleDashboard}>
            Welcome {emailW}
          </a>
        )}
        {dashboardFrmShow ? <Dashboard /> : null};
        <button
          ref={appElement}
          className={styles.App}
          onClick={handleApp}
          onMouseOut={handleMouseOut}
          onMouseOver={handleMouseOver}
        >
          <img
            className={styles.AppIcon}
            src={downLoadAppIcon}
            alt="download"
          />
        </button>
        <Link
          className={styles.search}
          to="/src/components/search"
          target="_blank"
          onClick={handleBlogShow}
        >
          <img className={styles.searchIcon} src={search} alt="search" />
        </Link>
        {downLoadHover && (
          <div className={styles.toolTip}> Download SofTesting App </div>
        )}
        <a id={styles.emailAd} onClick={scrollToContactUs}>
          hello@SofTestingCa.com
        </a>
        <a onClick={scrollToContactUs}>
          <img
            border="0"
            alt="email"
            src={email}
            className={styles.email}
          ></img>
        </a>
        <a
          href="https://www.Twitter.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            border="0"
            alt="Twitter"
            src={twitter}
            className={styles.twitter}
          ></img>
        </a>
        <a
          href="https://www.youtube.com/channel/UCBcHbd6YbpPog5-jR9f9OOA"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            border="0"
            alt="YouTube"
            src={YouTube}
            className={styles.YouTube}
          ></img>
        </a>
        <a
          href="https://linkedin.com/in/mahnaz-karimi-68042a1a7"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            border="0"
            alt="linkedin"
            src={linkedin}
            className={styles.linkedin}
          ></img>
        </a>
        <a
          href="https://www.facebook.com/SofTesting-108404168575498"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            border="0"
            alt="facebook"
            src={facebook}
            className={styles.facebook}
          ></img>
        </a>
        <a
          href="https://www.instagram.com/p/Ce_YjGqtkC6/?igshid=YmMyMTA2M2Y="
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            border="0"
            alt="instagram"
            src={instagram}
            className={styles.instagram}
          ></img>
        </a>
        <img
          border="0"
          alt="whatsapp"
          onClick={handleWhatsApp}
          src={whatsapp}
          className={styles.whatsapp}
        ></img>
        {whatsAppFrmShow ? <WhatsApp /> : null}
        <a href="/" onClick={setBodyFrmShow}>
          <img
            border="0"
            alt="software home"
            src={home}
            className={styles.home}
          ></img>
        </a>
      </Desktop>
      <Tablet>
        <button className={styles.signIn} onClick={handleSignIn}>
          SignIn
        </button>
        {loginFrmShow ? <SignIn /> : null};
        {/* <button className={styles.signIn} onClick={setRegisterFrmShow}> SignIn </button> 
                                         {registerFrmShow && <SignUp />} */}
        {auth && (
          <a className={styles.welcome} onClick={handleDashboard}>
            Welcome {emailW}
          </a>
        )}
        {dashboardFrmShow ? <Dashboard /> : null};
        <button
          ref={appElement}
          className={styles.App}
          onClick={handleApp}
          onMouseOut={handleMouseOut}
          onMouseOver={handleMouseOver}
        >
          <img
            className={styles.AppIcon}
            src={downLoadAppIcon}
            alt="download"
          />
        </button>
        <Link
          className={styles.search}
          to="/src/components/search"
          target="_blank"
          onClick={handleBlogShow}
        >
          <img className={styles.searchIcon} src={search} alt="search" />
        </Link>
        {downLoadHover && (
          <div className={styles.toolTip}> Download SofTesting App </div>
        )}
        <a id={styles.emailAd} onClick={scrollToContactUs}>
          hello@SofTestingCa.com
        </a>
        <a onClick={scrollToContactUs}>
          <img
            border="0"
            alt="email"
            src={email}
            className={styles.email}
          ></img>
        </a>
        <a
          href="https://www.Twitter.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            border="0"
            alt="Twitter"
            src={twitter}
            className={styles.twitter}
          ></img>
        </a>
        <a
          href="https://www.youtube.com/channel/UCBcHbd6YbpPog5-jR9f9OOA"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            border="0"
            alt="YouTube"
            src={YouTube}
            className={styles.YouTube}
          ></img>
        </a>
        <a
          href="https://linkedin.com/in/mahnaz-karimi-68042a1a7"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            border="0"
            alt="linkedin"
            src={linkedin}
            className={styles.linkedin}
          ></img>
        </a>
        <a
          href="https://www.facebook.com/SofTesting-108404168575498"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            border="0"
            alt="facebook"
            src={facebook}
            className={styles.facebook}
          ></img>
        </a>
        <a
          href="https://www.instagram.com/p/Ce_YjGqtkC6/?igshid=YmMyMTA2M2Y="
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            border="0"
            alt="instagram"
            src={instagram}
            className={styles.instagram}
          ></img>
        </a>
        <img
          border="0"
          alt="whatsapp"
          src={whatsapp}
          onClick={handleWhatsApp}
          className={styles.whatsapp}
        ></img>
        {whatsAppFrmShow ? <WhatsApp /> : null}
        <a href="/" onClick={setBodyFrmShow}>
          <img
            border="0"
            alt="software home"
            src={home}
            className={styles.home}
          ></img>
        </a>
      </Tablet>
      <Mobile>
        <button className={styles.signIn} onClick={handleSignIn}>
          SignIn
        </button>
        {loginFrmShow ? <SignIn /> : null};
        {/* <button className={styles.signIn} onClick={setRegisterFrmShow}> SignIn </button> 
                                         {registerFrmShow && <SignUp />} */}
        {auth && (
          <a className={styles.welcome} onClick={handleDashboard}>
            Welcome {emailW}
          </a>
        )}
        {dashboardFrmShow ? <Dashboard /> : null};
        <button
          ref={appElement}
          className={styles.App}
          onClick={handleApp}
          onMouseOut={handleMouseOut}
          onMouseOver={handleMouseOver}
        >
          <img
            className={styles.AppIcon}
            src={downLoadAppIcon}
            alt="download"
          />
        </button>
        <Link
          className={styles.search}
          to="/src/components/search"
          target="_blank"
          onClick={handleBlogShow}
        >
          <img className={styles.searchIcon} src={search} alt="search" />
        </Link>
        {downLoadHover && (
          <div className={styles.toolTip}> Download SofTesting App </div>
        )}
        <a id={styles.emailAd} onClick={scrollToContactUs}>
          hello@SofTestingCa.com
        </a>
        <a onClick={scrollToContactUs}>
          <img
            border="0"
            alt="email"
            src={email}
            className={styles.email}
          ></img>
        </a>
        <a
          href="https://www.Twitter.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            border="0"
            alt="Twitter"
            src={twitter}
            className={styles.twitter}
          ></img>
        </a>
        <a
          href="https://www.youtube.com/channel/UCBcHbd6YbpPog5-jR9f9OOA"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            border="0"
            alt="YouTube"
            src={YouTube}
            className={styles.YouTube}
          ></img>
        </a>
        <a
          href="https://linkedin.com/in/mahnaz-karimi-68042a1a7"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            border="0"
            alt="linkedin"
            src={linkedin}
            className={styles.linkedin}
          ></img>
        </a>
        <a
          href="https://www.facebook.com/SofTesting-108404168575498"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            border="0"
            alt="facebook"
            src={facebook}
            className={styles.facebook}
          ></img>
        </a>
        <a
          href="https://www.instagram.com/p/Ce_YjGqtkC6/?igshid=YmMyMTA2M2Y="
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            border="0"
            alt="instagram"
            src={instagram}
            className={styles.instagram}
          ></img>
        </a>
        <img
          border="0"
          alt="whatsapp"
          src={whatsapp}
          onClick={handleWhatsApp}
          className={styles.whatsapp}
        ></img>
        {whatsAppFrmShow ? <WhatsApp /> : null}
        <a href="/" onClick={setBodyFrmShow}>
          <img
            border="0"
            alt="software home"
            src={home}
            className={styles.home}
          ></img>
        </a>
      </Mobile>

      <MobileX>
        <button className={styles.signIn} onClick={handleSignIn}>
          SignIn
        </button>
        {loginFrmShow ? <SignIn /> : null};
        {/* <button className={styles.signIn} onClick={setRegisterFrmShow}> SignIn </button> 
                                         {registerFrmShow && <SignUp />} */}
        {auth && (
          <a className={styles.welcome} onClick={handleDashboard}>
            Welcome {emailW}
          </a>
        )}
        {dashboardFrmShow ? <Dashboard /> : null};
        <button
          ref={appElement}
          className={styles.App}
          onClick={handleApp}
          onMouseOut={handleMouseOut}
          onMouseOver={handleMouseOver}
        >
          <img
            className={styles.AppIcon}
            src={downLoadAppIcon}
            alt="download"
          />
        </button>
        <Link
          className={styles.search}
          to="/src/components/search"
          target="_blank"
          onClick={handleBlogShow}
        >
          <img className={styles.searchIcon} src={search} alt="search" />
        </Link>
        {downLoadHover && (
          <div className={styles.toolTip}> Download SofTesting App </div>
        )}
        <a id={styles.emailAd} onClick={scrollToContactUs}>
          hello@SofTestingCa.com
        </a>
        <a onClick={scrollToContactUs}>
          <img
            border="0"
            alt="email"
            src={email}
            className={styles.email}
          ></img>
        </a>
        <a
          href="https://www.Twitter.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            border="0"
            alt="Twitter"
            src={twitter}
            className={styles.twitter}
          ></img>
        </a>
        <a
          href="https://www.youtube.com/channel/UCBcHbd6YbpPog5-jR9f9OOA"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            border="0"
            alt="YouTube"
            src={YouTube}
            className={styles.YouTube}
          ></img>
        </a>
        <a
          href="https://linkedin.com/in/mahnaz-karimi-68042a1a7"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            border="0"
            alt="linkedin"
            src={linkedin}
            className={styles.linkedin}
          ></img>
        </a>
        <a
          href="https://www.facebook.com/SofTesting-108404168575498"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            border="0"
            alt="facebook"
            src={facebook}
            className={styles.facebook}
          ></img>
        </a>
        <a
          href="https://www.instagram.com/p/Ce_YjGqtkC6/?igshid=YmMyMTA2M2Y="
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            border="0"
            alt="instagram"
            src={instagram}
            className={styles.instagram}
          ></img>
        </a>
        <img
          border="0"
          alt="whatsapp"
          src={whatsapp}
          onClick={handleWhatsApp}
          className={styles.whatsapp}
        ></img>
        {whatsAppFrmShow ? <WhatsApp /> : null}
        <a href="/" onClick={setBodyFrmShow}>
          <img
            border="0"
            alt="software home"
            src={home}
            className={styles.home}
          ></img>
        </a>
      </MobileX>
    </div>
  );
};

export default Header;
