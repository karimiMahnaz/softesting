import React, { useContext, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Route, BrowserRouter as Router, Switch, Link, useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import FocusLock from 'react-focus-lock';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Captcha from "react-numeric-captcha";


import styles from '../styles/changePassword.module.scss';

import { Desktop, Tablet, Mobile, MobileX } from '../contexts/breakPoints';
import { VisibilityContext } from '../contexts/visibilityContext';
import img from '../assets/abstract-blue.jpg'

import SignIn from '../pages/signIn';

<title>SofTesting| ChangePassword</title>

///import http from '../services/httpService';

const ChangePassword = () => {

  const { loginFrmShow, setLoginFrmShow, changePassFrmShow, setFormsHide } = useContext(VisibilityContext);
  const { register, handleSubmit, reset, formState: { errors }, isSubmiting } = useForm({
    mode: "onTouched",
    reValidateMode: "onChange"
  });
  const [statusSubmit, setStatusSubmit] = useState("Reset Password");
  const [captchaSuccess, setCaptchaSuccess] = useState(false);
  const [show, setShow] = useState(true);
  toast.configure()

  const history = useHistory();
  const { token } = useParams();

  document.title= 'SofTesting | Change Password ';

  const handleFrmRClose = () => {
    history.push("/");
     setFormsHide();
     setShow(false); 
    }

  useEffect(() => {
    console.log(`issubmitting:${isSubmiting}`)
  }, [isSubmiting])


  const onChangeCaptcha = (status) => {
    if (status) {
      setCaptchaSuccess(status)
    }
    console.log(captchaSuccess);

  }

  const onSubmit = async (data, e) => {
    console.log("onSubmit");

    if (!captchaSuccess) {
      toast.info("Please enter security code", { theme: "dark" });

    } else {


      if (data.newPassword !== data.coNewPassword) {
        toast.info("Confirm Password is not valid", { theme: "dark" });
        return;
      }

      if (data.newPassword === data.currentPassword) {
        toast.info("The new Password must be different from current", { theme: "dark" });
        return;
      }

      setStatusSubmit("Sending...");


      const location = window.location.hostname;

      let url = '';
      if (location ==='localhost') {
        url=`http://${location}:8000/api/user/changePassword`
      } else{
        url='https://api.softestingca.com/api/user/changePassword'
      }
      

      await axios({
        method: "post",
        url: url,
        data: { data, token: token.substr(1) }

      })
        .then((response) => {
          console.log('response.data.status', response.data.message);
          if (response.request.status === 200) {
            toast.success("Password has changed.", { theme: "colored" });
            reset();
            setLoginFrmShow();
            history.push('/src/pages/signIn');
          } else if (response.request.status !== 200) {
            toast.error("Password failed to change.", { theme: "dark" })
          }
        })
        .catch(
          (ex) => {
            console.log(ex)

            toast.error("Failed.", { theme: "dark" });
          });
      setStatusSubmit("Submit");

    }
  };


  return (
    <>
      <Desktop>
        <form className={styles.animate, (changePassFrmShow) ? styles.modal : styles.inActive} onSubmit={handleSubmit(onSubmit)} style={{ backgroundImage: `url(${img})` }}>

          <div className={styles.container}>
            <span id={styles.closeBtn} onClick={handleFrmRClose} className={styles.closeBtn}  >
              <svg id={styles.svg}>
                <line id={styles.line1} x1="0" y1="0" x2="20" y2="20" />
                <line id={styles.line2} x1="20" y1="0" x2="0" y2="20" />
              </svg>

            </span>
            <h1 className ={styles.h1}> SofTesting Change Password</h1>
            <span id={styles.desc}>

            </span>
            <FocusLock>
              <input id={styles.currentPassword} placeholder="Enter Current Password" autoFocus
                className={`${errors.currentPassword ? styles.errorBorder : styles.Border}`}
                defaultValue="" type="password" name="currentPassword"
                {...register('currentPassword', {
                  required: "*",
                  pattern: {
                    value: /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/i,
                    message: "*"
                  }
                })} />

              {errors.currentPassword && <p id={styles.cError} role="alert" >{errors.currentPassword.message}</p>}

              <input id={styles.newPassword} placeholder="Enter New Password" 
                className={`${errors.newPassword ? styles.errorBorder : styles.Border}`}
                defaultValue="" type="password" name="newPassword"
                {...register('newPassword', {
                  required: "*",
                  pattern: {
                    value: /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/i,
                    message: "*"
                  }
                })} />

              {errors.newPassword && <p id={styles.nError} role="alert" >{errors.newPassword.message}</p>}


              <input id={styles.coNewPassword} placeholder="Confirm New Password" 
                className={`${errors.coNewPassword ? styles.errorBorder : styles.Border}`}
                defaultValue="" type="password" name="coNewPassword"
                {...register('coNewPassword', {
                  required: "*",
                  pattern: {
                    value: /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/i,
                    message: "*"
                  }
                })} />

              {errors.coNewPassword && <p id={styles.nError} role="alert" >{errors.coNewPassword.message}</p>}

              <div className={styles.rnc}>
                <Captcha
                  onChange={onChangeCaptcha}
                />
              </div>

              <button type="submit" id={styles.submit} disabled={isSubmiting} onClick={handleSubmit(onSubmit)}>{statusSubmit}</button>
            </FocusLock>
          </div>
        </form>
      </Desktop>
      <Tablet>
        <form className={styles.animate, (changePassFrmShow) ? styles.modal : styles.inActive} onSubmit={handleSubmit(onSubmit)} style={{ backgroundImage: `url(${img})` }}>

          <div className={styles.container}>
            <span id={styles.closeBtn} onClick={handleFrmRClose} className={styles.closeBtn}  >
              <svg id={styles.svg}>
                <line id={styles.line1} x1="0" y1="0" x2="20" y2="20" />
                <line id={styles.line2} x1="20" y1="0" x2="0" y2="20" />
              </svg>

            </span>
            <h1 className ={styles.h1}> SofTesting Change Password</h1>
            <span id={styles.desc}>

            </span>
            <FocusLock>
              <input id={styles.currentPassword} placeholder="Enter Current Password" autoFocus
                className={`${errors.currentPassword ? styles.errorBorder : styles.Border}`}
                defaultValue="" type="password" name="currentPassword"
                {...register('currentPassword', {
                  required: "*",
                  pattern: {
                    value: /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/i,
                    message: "*"
                  }
                })} />

              {errors.currentPassword && <p id={styles.cError} role="alert" >{errors.currentPassword.message}</p>}

              <input id={styles.newPassword} placeholder="Enter New Password" 
                className={`${errors.newPassword ? styles.errorBorder : styles.Border}`}
                defaultValue="" type="password" name="newPassword"
                {...register('newPassword', {
                  required: "*",
                  pattern: {
                    value: /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/i,
                    message: "*"
                  }
                })} />

              {errors.newPassword && <p id={styles.nError} role="alert" >{errors.newPassword.message}</p>}


              <input id={styles.coNewPassword} placeholder="Confirm New Password" 
                className={`${errors.coNewPassword ? styles.errorBorder : styles.Border}`}
                defaultValue="" type="password" name="coNewPassword"
                {...register('coNewPassword', {
                  required: "*",
                  pattern: {
                    value: /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/i,
                    message: "*"
                  }
                })} />

              {errors.coNewPassword && <p id={styles.nError} role="alert" >{errors.coNewPassword.message}</p>}

              <div className={styles.rnc}>
                <Captcha
                  onChange={onChangeCaptcha}
                />
              </div>

              <button type="submit" id={styles.submit} disabled={isSubmiting} onClick={handleSubmit(onSubmit)}>{statusSubmit}</button>
            </FocusLock>
          </div>
        </form>
      </Tablet>
      <Mobile>
        <form className={styles.animate, (changePassFrmShow) ? styles.modal : styles.inActive} onSubmit={handleSubmit(onSubmit)} style={{ backgroundImage: `url(${img})` }}>

          <div className={styles.container}>
            <span id={styles.closeBtn} onClick={handleFrmRClose} className={styles.closeBtn}  >
              <svg id={styles.svg}>
                <line id={styles.line1} x1="0" y1="0" x2="20" y2="20" />
                <line id={styles.line2} x1="20" y1="0" x2="0" y2="20" />
              </svg>

            </span>
            <h1 className ={styles.h1}> SofTesting Change Password</h1>
            <span id={styles.desc}>

            </span>
            <FocusLock>
              <input id={styles.currentPassword} placeholder="Enter Current Password" autoFocus
                className={`${errors.currentPassword ? styles.errorBorder : styles.Border}`}
                defaultValue="" type="password" name="currentPassword"
                {...register('currentPassword', {
                  required: "*",
                  pattern: {
                    value: /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/i,
                    message: "*"
                  }
                })} />

              {errors.currentPassword && <p id={styles.cError} role="alert" >{errors.currentPassword.message}</p>}

              <input id={styles.newPassword} placeholder="Enter New Password" 
                className={`${errors.newPassword ? styles.errorBorder : styles.Border}`}
                defaultValue="" type="password" name="newPassword"
                {...register('newPassword', {
                  required: "*",
                  pattern: {
                    value: /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/i,
                    message: "*"
                  }
                })} />

              {errors.newPassword && <p id={styles.nError} role="alert" >{errors.newPassword.message}</p>}


              <input id={styles.coNewPassword} placeholder="Confirm New Password" 
                className={`${errors.coNewPassword ? styles.errorBorder : styles.Border}`}
                defaultValue="" type="password" name="coNewPassword"
                {...register('coNewPassword', {
                  required: "*",
                  pattern: {
                    value: /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/i,
                    message: "*"
                  }
                })} />

              {errors.coNewPassword && <p id={styles.nError} role="alert" >{errors.coNewPassword.message}</p>}

              <div className={styles.rnc}>
                <Captcha
                  onChange={onChangeCaptcha}
                />
              </div>

              <button type="submit" id={styles.submit} disabled={isSubmiting} onClick={handleSubmit(onSubmit)}>{statusSubmit}</button>
            </FocusLock>
          </div>
        </form>
      </Mobile>
      <MobileX>
        <form className={styles.animate, (changePassFrmShow) ? styles.modal : styles.inActive} onSubmit={handleSubmit(onSubmit)} style={{ backgroundImage: `url(${img})` }}>

          <div className={styles.container}>
            <span id={styles.closeBtn} onClick={handleFrmRClose} className={styles.closeBtn}  >
              <svg id={styles.svg}>
                <line id={styles.line1} x1="0" y1="0" x2="20" y2="20" />
                <line id={styles.line2} x1="20" y1="0" x2="0" y2="20" />
              </svg>

            </span>
            <h1 className ={styles.h1}> SofTesting Change Password</h1>
            <span id={styles.desc}>

            </span>
            <FocusLock>
              <input id={styles.currentPassword} placeholder="Enter Current Password" autoFocus
                className={`${errors.currentPassword ? styles.errorBorder : styles.Border}`}
                defaultValue="" type="password" name="currentPassword"
                {...register('currentPassword', {
                  required: "*",
                  pattern: {
                    value: /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/i,
                    message: "*"
                  }
                })} />

              {errors.currentPassword && <p id={styles.cError} role="alert" >{errors.currentPassword.message}</p>}

              <input id={styles.newPassword} placeholder="Enter New Password" 
                className={`${errors.newPassword ? styles.errorBorder : styles.Border}`}
                defaultValue="" type="password" name="newPassword"
                {...register('newPassword', {
                  required: "*",
                  pattern: {
                    value: /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/i,
                    message: "*"
                  }
                })} />

              {errors.newPassword && <p id={styles.nError} role="alert" >{errors.newPassword.message}</p>}


              <input id={styles.coNewPassword} placeholder="Confirm New Password" 
                className={`${errors.coNewPassword ? styles.errorBorder : styles.Border}`}
                defaultValue="" type="password" name="coNewPassword"
                {...register('coNewPassword', {
                  required: "*",
                  pattern: {
                    value: /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/i,
                    message: "*"
                  }
                })} />

              {errors.coNewPassword && <p id={styles.nError} role="alert" >{errors.coNewPassword.message}</p>}

              <div className={styles.rnc}>
                <Captcha
                  onChange={onChangeCaptcha}
                />
              </div>

              <button type="submit" id={styles.submit} disabled={isSubmiting} onClick={handleSubmit(onSubmit)}>{statusSubmit}</button>
            </FocusLock>
          </div>
        </form>
      </MobileX>
    </>
  );

}


export default ChangePassword;