import React, { useContext, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { BrowserRouter,  Link, useHistory, withRouter } from 'react-router-dom';
import axios from 'axios';
import FocusLock from 'react-focus-lock';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from '../styles/resetPassword.module.scss';

import { Desktop, Tablet, Mobile, MobileX } from '../contexts/breakPoints';
import { VisibilityContext } from '../contexts/visibilityContext';
import { AuthContext } from '../contexts/authContext';

import img from '../assets/abstract-blue.jpg'

////import SignIn from '../pages/signIn';

///import http from '../services/httpService';




const ResetPassword = () => {

  const {  setLoginFrmShow, setFormsHide } = useContext(VisibilityContext);
  const {  dispatch } = useContext(AuthContext);
  const { register, handleSubmit, setValue, formState: { errors }, isSubmiting } = useForm({
    mode: "onTouched",
    reValidateMode: "onChange"
  });
  const [status, setStatus] = useState("Reset Password");

  toast.configure()

  const history = useHistory();

  document.title = "SofTesting | Reset Password";

  let emailW='';
  useEffect(()=>{
  if (JSON.parse(localStorage.getItem('userEmail'))){ emailW= JSON.parse(localStorage.getItem('userEmail')); } 
     setValue('email', emailW);
  },[] )


  const handleSignIn = () => {
    setLoginFrmShow();
    history.push("/signin");
  }
  const handleFrmRClose = () => {
     history.push("/");
     setFormsHide();
     }

  useEffect(() => {
    console.log(`issubmitting:${isSubmiting}`)
  }, [isSubmiting])



  const onSubmit = async (data, e) => {
    console.log("onSubmit");
    setStatus("Sending...");


    const location = window.location.hostname;
    let url = '';
      if (location ==='localhost') {
        url=`http://${location}:8000/api/user/resetPassword`
      } else{
        url='https://api.softestingca.com/api/user/resetPassword'
      }
      
    
    axios({
      method: "post",
      url: url,
      data: data
    })
      .then((response) => {
        if (response.status === 200) {

          console.log('response', response);
        ///  setToken(response.data.token);
        
        dispatch({
          type:'ResetPassword',
          token: response.data.token,
        })
          console.log('responsetoken', response.data.token);
          toast.success("Message Sent.", { theme: "colored" });
         // reset();
        } else {
          toast.error("Message failed to send.", { theme: "dark" })
        }
      })
      .catch(
        (err) => {
          console.log(err.Error, err.statusCode)

          if (err.Error === 'Request failed with status code 400') {
            toast.error("Email is not registered!", { theme: "dark" });
          } else {
            toast.error("Email is not registered!", { theme: "dark" });
          }

        });
    setStatus("Submit");


  };


  return (
    <>
      <Desktop>
        <form className={styles.modal} onSubmit={handleSubmit(onSubmit)} style={{ backgroundImage: `url(${img})` }}>

          <div className={styles.container}>
            <span id={styles.closeBtn} onClick={handleFrmRClose} className={styles.closeBtn}  >
              <svg id={styles.svg}>
                <line id={styles.line1} x1="0" y1="0" x2="20" y2="20" />
                <line id={styles.line2} x1="20" y1="0" x2="0" y2="20" />
              </svg>

            </span>
            <h1 className ={styles.h1}> SofTesting Reset Password</h1>
            <span id={styles.desc}>
              <p>Please enter the email address that you used to Signup, and <br />
                we will send you an email with a link to reset your password.</p>
            </span>
            <FocusLock>
              <input id={styles.email} placeholder="Enter Email Address" autoFocus
                className={`${errors.email ? styles.errorBorder : styles.Border}`}
                defaultValue="" type="email" name="email" disabled={true}
                {...register('email', {
                  required: "*",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "*"
                  }
                })} />

              {errors.email && <p id={styles.uError} role="alert" >{errors.email.message}</p>}


              <label id={styles.signLabel} > Return to  </label>
              <BrowserRouter>
                <Link id={styles.signIn} to="/signin" onClick={handleSignIn}  > SignIn </Link>
                 {/* <Switch> */}

                {/* </Switch> */}
              </BrowserRouter>
              <button type="submit" id={styles.submit} onClick={handleSubmit(onSubmit)}>{status}</button>
            </FocusLock>
          </div>
        </form>
      </Desktop>
      <Tablet>
        <form className={styles.modal} onSubmit={handleSubmit(onSubmit)} style={{ backgroundImage: `url(${img})` }}>

          <div className={styles.container}>
            <span id={styles.closeBtn} onClick={handleFrmRClose} className={styles.closeBtn}  >
              <svg id={styles.svg}>
                <line id={styles.line1} x1="0" y1="0" x2="20" y2="20" />
                <line id={styles.line2} x1="20" y1="0" x2="0" y2="20" />
              </svg>

            </span>
            <h1 className ={styles.h1}> SofTesting Reset Password</h1>
            <span id={styles.desc}>
              <p>Please enter the email address that you used to Signup, and <br />
                we will send you an email with a link to reset your password.</p>
            </span>
            <FocusLock>
              <input id={styles.email} placeholder="Enter Email Address" autoFocus
                className={`${errors.email ? styles.errorBorder : styles.Border}`}
                defaultValue="" type="email" name="email" disabled={true}
                {...register('email', {
                  required: "*",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "*"
                  }
                })} />

              {errors.email && <p id={styles.uError} role="alert" >{errors.email.message}</p>}


              <label id={styles.signLabel} > Return to  </label>
              <BrowserRouter>
                <Link id={styles.signIn} to="/signin" onClick={handleSignIn}  > SignIn </Link>
                {/* <Switch> */}

                {/* </Switch> */}
              </BrowserRouter>
              <button type="submit" id={styles.submit} onClick={handleSubmit(onSubmit)}>{status}</button>
            </FocusLock>
          </div>
        </form>
      </Tablet>
      <Mobile>
        <form className={styles.modal} onSubmit={handleSubmit(onSubmit)} style={{ backgroundImage: `url(${img})` }}>

          <div className={styles.container}>
            <span id={styles.closeBtn} onClick={handleFrmRClose} className={styles.closeBtn}  >
              <svg id={styles.svg}>
                <line id={styles.line1} x1="0" y1="0" x2="20" y2="20" />
                <line id={styles.line2} x1="20" y1="0" x2="0" y2="20" />
              </svg>

            </span>
            <h1 className ={styles.h1}> SofTesting Reset Password</h1>
            <span id={styles.desc}>
              <p>Please enter the email address that you used to Signup, and <br />
                we will send you an email with a link to reset your password.</p>
            </span>
            <FocusLock>
              <input id={styles.email} placeholder="Enter Email Address" autoFocus
                className={`${errors.email ? styles.errorBorder : styles.Border}`}
                defaultValue="" type="email" name="email"  disabled={true}
                {...register('email', {
                  required: "*",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "*"
                  }
                })} />

              {errors.email && <p id={styles.uError} role="alert" >{errors.email.message}</p>}


              <label id={styles.signLabel} > Return to  </label>
              <BrowserRouter>
                <Link id={styles.signIn} to="/signin" onClick={handleSignIn}  > SignIn </Link>
                {/* <Switch> */}

                {/* </Switch> */}
              </BrowserRouter>
              <button type="submit" id={styles.submit} onClick={handleSubmit(onSubmit)}>{status}</button>
            </FocusLock>
          </div>
        </form>
      </Mobile>
      <MobileX>
        <form className={styles.modal} onSubmit={handleSubmit(onSubmit)} style={{ backgroundImage: `url(${img})` }}>

          <div className={styles.container}>
            <span id={styles.closeBtn} onClick={handleFrmRClose} className={styles.closeBtn}  >
              <svg id={styles.svg}>
                <line id={styles.line1} x1="0" y1="0" x2="20" y2="20" />
                <line id={styles.line2} x1="20" y1="0" x2="0" y2="20" />
              </svg>

            </span>
            <h1 className ={styles.h1}> SofTesting Reset Password</h1>
            <span id={styles.desc}>
              <p>Please enter the email address that you used to Signup, and <br />
                we will send you an email with a link to reset your password.</p>
            </span>
            <FocusLock>
              <input id={styles.email} placeholder="Enter Email Address" autoFocus
                className={`${errors.email ? styles.errorBorder : styles.Border}`}
                defaultValue="" type="email" name="email" disabled={true}
                {...register('email', {
                  required: "*",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "*"
                  }
                })} />

              {errors.email && <p id={styles.uError} role="alert" >{errors.email.message}</p>}


              <label id={styles.signLabel} > Return to  </label>
              <BrowserRouter>
                <Link id={styles.signIn} to="/signin" onClick={handleSignIn}  > SignIn </Link>
                {/* <Switch> */}

                {/* </Switch> */}
              </BrowserRouter>
              <button type="submit" id={styles.submit} onClick={handleSubmit(onSubmit)}>{status}</button>
            </FocusLock>
          </div>
        </form>
      </MobileX>
    </>
  );

}


export default withRouter(ResetPassword);