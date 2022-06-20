import React, { useContext, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Route, BrowserRouter , Switch, Link, useHistory, Redirect, withRouter} from 'react-router-dom';
import { useCookies } from 'react-cookie';

import FocusLock from 'react-focus-lock';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';
import { GoogleLogin } from 'react-google-login';
import linkedin, { useLinkedIn } from 'react-linkedin-login-oauth2';

//import { refreshTokenSetup } from '../utils/refreshTokenSetup';

import styles from '../styles/signIn.module.scss';
///import { Desktop, Tablet, Mobile, MobileX } from '../contexts/breakPoints';
import { VisibilityContext } from '../contexts/visibilityContext';
import { AuthContext} from '../contexts/authContext';
import { NavContext } from '../contexts/navContext';
import { LINKEDIN_URL } from '../utils/generic';

import img from '../assets/abstract-blue.jpg'
//import facebook from '../assets/facebook-logo.svg';
import linkedinLogo from '../assets/LinkedIn-Icon-White-Logo.wine.svg';
//import twitter from '../assets/twitter5.svg';
//import google from '../assets/google.svg';

import SignUp from '../pages/signUp';
import ResetPassword from '../pages/resetPassword';

///import http from '../services/httpService';

const SignIn = (props) => {

  const { loginFrmShow, registerFrmShow, setRegisterFrmShow, setResetPassFrmShow, setFormsHide } = useContext(VisibilityContext);
  const { states, dispatch } = useContext(AuthContext);
  const { setOffMenu } = useContext(NavContext);
  const { register, handleSubmit, setValue, formState: { errors }, isSubmiting } = useForm({
    mode: "onTouched",
    reValidateMode: "onChange"
  });
  let history = useHistory();
  const [status, setStatus] = useState("SignIn");
  const [dataForm, setDataForm] = useState('');
  const [reCaptcha, setReCaptcha] = useState('');
  const [emailV, setEmailV] = useState('');
  const [passwordV, setPasswordV] = useState('');
  const [rememberV, setRememberV] = useState('');
  const [cookies, setCookie] = useCookies(['email']);
  const [success, setSuccess] = useState(true);
  const [googleData, setGoogleData] = useState(null);
  // const [reCaptchaResult, setReCaptchaResult] = useState(false);
  // const [googleResult, setGoogleResult] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const reCaptchaRef = useRef(null);

  let reCaptchaResult = false;
  let googleResult = false;

  const inputRefs = [emailRef, passwordRef];

  toast.configure()

 document.title = "SofTesting| Sign In"; 

  const location = window.location.hostname;
  const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const linkedinClientId = process.env.REACT_APP_LINKEDIN_CLIENT_ID;


  const signInWithLinkedin = () => {
    this.popup = window.open(LINKEDIN_URL, '_blank', 'width=600,height=600')
    window.addEventListener('message', this.receiveLinkedInMessage)
  }


  const handleGoogleLogin = () => {
    console.log('reCaptcha', reCaptcha);
    if (!reCaptcha) {
      toast.error("Please Enter ReCaptcha.", { theme: "white" });
    }
  }


  const onLikedinSuccess = (data) => {
    console.log('linkedin data', data);
    alert(data);

  }

  const onFailure = (res) => {
    console.log('Login failed: res: ', res);
  }

  
  const { linkedInLogin } = useLinkedIn({
    clientId: `${linkedinClientId}`,

    onSuccess: (code) => {
      alert('success')
      alert(code)
      console.log(code);

      //   curl --location --request POST 'https://www.linkedin.com/oauth/v2/introspectToken' \
      // --header 'Content-Type: application/x-www-form-urlencoded' \
      // --data-urlencode 'token=AQUSkaVFKXHhLp9JgfYEiHcqKcYSeM8m3zJdFiDQ6412yrbKu3DShVvfu3Gfo4yu6nnnV53bmeDATLcL-7vwffKee-pf90cnf0EF2nFJPGpCtQ2QWl_3zL0XVslNmKUNtWjFKqUzqO_05EqcLz4eol1fPI8xBrUqIUkyyFXXBgd-u-60YyOsRhZTfGcabKTXl9Tk-7tuU-3x7SNy83nW4juWpZJARjQT1dYZ2OUcfivNb2ASqtJGQ3vhRIpmxe89ZFHvhd2BuhYc-LItJlmpv7HXvS5O6NWJ6HoBRVx0SHj4STmbFf6kLH0Ap5KDe3FwDurJrLGWGjGayt3sCkwmwtTYnbmVqw' \
      // --data-urlencode 'client_id=86jqrcjxm27lhj' \
      // --data-urlencode 'client_secret=EV0tmcAWJuTDZ6MA'
    },
    onError: (error) => {
      alert('error')
      console.log(error);
    },
    redirectUri: `${window.location.origin}`,
    // redirectUri:`http://${location}:3000/linkedin`,
  })


  const onGoogleSuccess = (res) => {
    // if (!reCaptcha) {
    //   toast.error("Please Enter ReCaptcha.", { theme: "dark" });
    //   setSuccess(false);
    //   return;
    // }else{
    //   setSuccess(true);
    // }

    console.log('Login Success: currentUser:', res.profileObj);
    setGoogleData(res.profileObj);

    if (googleData) {
      setValue('email', res.profileObj.email);
      setValue('password', res.profileObj.password)

      googleAuthentication(res.profileObj);
      ///  refreshTokenSetup(res);

    }
  }


  let urlReCaptcha = '';
  let urlGoogle='';
  let urlCookie='';
  let urlSignIn='';

  if (location ==='localhost') {
    urlReCaptcha=`http://${location}:8000/api/user/reCaptcha`;
    urlSignIn=`http://${location}:8000/api/user/signIn`;
    urlGoogle=`http://${location}:8000/auth/google`;
    urlCookie=`http://${location}:8000/setCookie`;
    
  } else{
    urlReCaptcha='https://api.softestingca.com/api/user/reCaptcha';
    urlSignIn=`https://api.softestingca.com/api/user/signIn`
    urlGoogle= 'https://api.softestingca.com/auth/google';
    urlCookie='https://api.softestingca.com/setCookie';
  }

  const googleAuthentication = (param) => {

    console.log('param',param);

    // axios({
    //   method: "post",
    //   url: urlReCaptcha,
    //   data: { 'reCaptcha': reCaptcha },

    // })
    //   .then(({ data, status }) => {

    //     if (status === 200) {

    //       reCaptchaResult = true;

    //       if (reCaptchaResult === true && googleResult === true) {
    //         setCookie('email', param.email, { path: '/' });
    //         setCookie('Password', param.password, { path: '/' });
    //         setCookie('name', param.name, { path: '/' });

    //         dispatch({
    //           type:'SignIn',
    //           authorized: true,
    //           userEmail: param.email
    //         })
    //         toast.success("SignIn IS Done no.2", { theme: "colored" });
    //       }

    //       //   toast.success("ReCaptcha is valid.", { theme: "colored" });

    //     }
    //     else {
    //       reCaptchaResult = false;
    //       toast.error(" ReCaptcha is not valid..", { theme: "dark" });

    //     }
    //   })
    //   .catch(
    //     (ex) => {

    //       reCaptchaResult = false;
    //       toast.error("ReCaptcha Failed.", { theme: "dark" });

    //     });


    console.log('tokenId', googleData.googleId)
    axios({
      method: "post",
      url: urlGoogle,
      data: googleData.googleId,
    ///  mode:'same-origin',
    //  withCredentials: true,
     //    headers:{
            // 'Content-Type': 'application/json',
            // 'Accept': 'application/json',
       ///     'X-Requested-With': 'XMLHttpRequest',
       //        "Access-Control-Allow-Origin":"https://softestingca.com"
      //   }
    })
      .then( res => {
        if (res.data.sccess ===true) {
          googleResult = true;
          ///   const googledata2 =  res.json();
          console.log('res', res)

          if (googleResult === true) {
            setCookie('email', param.email, { path: '/' });
            setCookie('Password', param.password, { path: '/' });
            setCookie('name', param.name, { path: '/' });

            dispatch({
              type:'SignIn',
              authorized: true,
              userEmail: param.email
            })

            toast.success("SignIn IS Done no.2", { theme: "colored" });
          }
        }
        else {

          googleResult = false;
          console.log('status', status);
          toast.error(" Failed.", { theme: "dark" });
        }
      })
      .catch(
        (ex) => {

          googleResult = false;
          toast.error("Please SignUp.", { theme: "dark" });
        });

      }

  //   if (googleResult === true) {



  //     axios({
  //       method: "post",
  //       url: urlCookie,
  // ///      data: data, 

  //       withCredentials: false,

  //     })
  //       .then(({ data, status }) => {
  //         console.log('status', status);
  //         if (status === 200) {

  //           toast.success("Cookies Is Saved .", { theme: "colored" });

  //         }
  //         else {
  //           setSuccess(false);
  //           ///      toast.error("Cookies Is Not Saved .", { theme: "dark" });
  //         }
  //       })
  //       .catch(
  //         (ex) => {

  //           setSuccess(false);
  //           ///       toast.error("Cookies failed .", { theme: "dark" });
  //         });
  //   }
  // }


  ///const [mouseDown, setMouseDown] = useState(false);

  //  useEffect(() => {
  //   console.log(document.querySelectorAll("input"));
  //   if (emailRef.current.querySelector("#email")){
  //    setFocus('email')
  //   }
  //   setFocus('email')
  // }, [setFocus]);

  // useEffect(() => {
  //   const handleDocumentMouseUp = event => {

  //       setTimeout(() => setMouseDown(false), 10);

  //   };

  //   document.addEventListener('mouseup', handleDocumentMouseUp);
  //   return () => {
  //     document.removeEventListener('mouseup', handleDocumentMouseUp);
  //   };
  // }, []);

  // const handleMouseDown = event => {
  //     setMouseDown(true);
  //   };

  // const handleClick = useCallback(() => {
  //   console.log('sethasFocus',hasFocus);
  //   if (mouseDown) {
  //   //  onClick();
  //   setFocus('email');
  //   }
  // }, [mouseDown]);




  //  useEffect(()=>{

  //   inputRefs.forEach ((inputRef) => {
  //     console.log('inputRef.current',inputRef);
  //     if (inputRef.current){
  //       console.log('inputRef.current',inputRef);

  //     inputRef.current.addEventListener("mouseup", (event)=>{
  //       inputRef.setFocus();
  //      })

  //     }
  //   })
  //  },[here])


  // const [emailRef, setEmailRef] = useFocus();
  // const [passwordRef, setPasswordRef] = useFocus();

  //const handleKeyDown = (e) =>{

  // if (emailRef.current.value && passwordRef.current.value ==''){
  //   passwordRef.current.setFocus();
  //   }
  // if (passwordRef.current.value && emailRef.current.value ==''){
  //   emailRef.current.setFocus();
  //    }
  //    if (e.charCode === 13 && passwordRef.current) {
  //     setFocus("submit");
  //   }
  // }



  const handleResetPassword = () => {
    setResetPassFrmShow();
    const location = {
      pathname: '/resetpassword',
      state: { fromDashboard: true }
    }

    history.push("/resetpassword");
      
  }

  const handleSignUp = () => {
    setRegisterFrmShow();
    const location = {
      pathname: '/signup',
      state: { fromDashboard: true }
    }
   
    history.push("/signup");
  }


  const handleFrmClose = () => {
      history.push("/");
      setFormsHide(); 
    }


  const onChange = (value) => {

    setReCaptcha(value);
    ///  formData.append('reCaptcha',value)
    /// console.log('reCaptchaRef',reCaptchaRef)
  }
  const onChangeEmail = (e) => {

    setEmailV(e.target.value);
    ///     formData.append('email',e.target.value)
    console.log('eamil', emailV)
  }
  const onChangePassword = (e) => {

    setPasswordV(e.target.value);
    /////      formData.append('password',e.target.value)
    console.log('password', passwordV)
  }
  const onChangeRemember = (e) => {

    setRememberV(e.target.value);
    /////      formData.append('remember',e.target.value)
    console.log('remember', rememberV)
  }
  const onSubmit = async (data, e) => {

    setStatus("Sending...");
    setDataForm(data);

    const formData = new FormData();

    formData.append('email', data.email);



    // setRememberV(data.remember);
    // setEmailV(data.email);
    // setPasswordV(data.password);

    // for (var [key, value] of formData.entries()) {
    //   console.log(key, value);
    // }
    // console.log(...formData);


    //   headers:{
    //     Accept: "application/json",
    //     "Content-Type": "application/'json'; charset=utf-8"
    ///    'content-type': 'multipart/form-data' 
    // }multipart/form-data   application/x-www-form-urlencoded;

    setInterval(() => {
      ///  console.log('Toplearn');
    }, 9000000)
    ////console.log(dataForm);

    var object = {};

    formData.forEach((value, key) => object[key] = value);
    var json = JSON.stringify(object);



    axios({
      method: "post",
      url: urlReCaptcha,
      data: { 'reCaptcha': reCaptcha },
     // mode:'same-origin',
     // withCredentials: true,
      // 'headers': {
      //   'Access-Control-Allow-Origin' : 'https://softestingca.com',
      //  // 'content-type': 'application/json',
      // }

    })
      .then(({ data, status }) => {

        if (status === 200) {

       ///   toast.success("ReCaptcha is valid.", { theme: "colored" });
          setStatus("SignIn")
        }
        else {
          setSuccess(false);
          setStatus("SignIn")
          toast.error(" ReCaptcha is not valid..", { theme: "dark" });
        }
      })
      .catch(
        (ex) => {

          setSuccess(false);
          setStatus("SignIn")
          toast.error("ReCaptcha Failed.", { theme: "dark" });
        });

    if (success === true) {
      axios({
        method: "post",
        url: urlSignIn,
        data: data,
      //  mode:'same-origin',
      //  withCredentials: true,
        // 'headers': {
        //   'Access-Control-Allow-Origin' : 'https://softestingca.com',
        //   'content-type': 'application/json',
        // }
      })
        .then(({ status }) => {
          if (status === 200) {
            setStatus("SignIn")
 
            setCookie('email', data.email, { path: '/' });
            setCookie('Password', data.password, { path: '/' });
        
            dispatch({
              type:'SignIn',
              authorized: true,
              userEmail: data.email
            })
            toast.success("SignIn IS Done.", { theme: "colored" });
           
          }
          else {
            setStatus("SignIn")
            setSuccess(false);
            console.log('status', status);
            toast.error(" Failed.", { theme: "dark" });
          }
        })
        .catch(
          (ex) => {
            console.log(ex)
            setStatus("SignIn")
            setSuccess(false);
            toast.error("SignIn Failed.", { theme: "dark" });
          });
        console.log('cookie will do', success)
      if (success === true) {
 

        // console.log(...formData);
        // console.log(dataForm);
        // console.log(data);
        axios({
          method: "post",
          url: urlCookie,
          data: data,
        //  credentials:'include',
          mode:'same-origin',
          withCredentials: false,
       //   headers:{
            // 'Content-Type': 'application/json',
            // 'Accept': 'application/json',
       //     'Access-Control-Allow-Origin' : 'https://softestingca.com',
      //      'X-Requested-With': 'XMLHttpRequest',
      //    }

        })
          .then(({ data, status }) => {
            console.log('cookiestatus', status);
            if (status === 200) {
              setStatus("SignIn")
        //   toast.success("Cookies Is Saved .", { theme: "colored" });

            }
            else {
              setStatus("SignIn")
              setSuccess(false);
              ///      toast.error("Cookies Is Not Saved .", { theme: "dark" });
            }
          })
          .catch(
            (ex) => {
              setStatus("SignIn")
              setSuccess(false);
          ///         toast.error("Cookies failed .", { theme: "dark" });
            });

      }

    }



    // if (res.status == 200){
    //       console.log('response signIn', res);
    //       alert("SignIn IS Done.");
    //       reset();
    //       setStatus("Submit");

    //   }
    //   else {
    //     console.log('res.message',res.message);
    //     alert(res.message);
    //   }


    ///        alert(err.message);

    ///       }
  }

  ///console.log(window.location.origin);
  return (
   
    <form className={ loginFrmShow ? styles.modal : styles.inactive} onLoad={setOffMenu} onSubmit={handleSubmit(onSubmit)} style={{ backgroundImage: `url(${img})` }}>
   
      <div className={styles.container}>
        <span id={styles.closeBtn} onClick={handleFrmClose} className={styles.closeBtn}  >
          <svg id={styles.svg}>
            <line id={styles.line1} x1="0" y1="0" x2="20" y2="20" />
            <line id={styles.line2} x1="20" y1="0" x2="0" y2="20" />
          </svg>

        </span>

        <FocusLock>
          <h1 className ={styles.h1}> SofTesting Sign In</h1>
          <input id={styles.inemail}
            className={`${errors.email ? styles.errorBorder : styles.Border}`} tabIndex="0" ref={emailRef}
            defaultValue="" type="email" placeholder="Enter Email Address" name="email" onChange={e => setEmailV(e.target.value)}
            {...register('email', {
              required: (true, "*"),
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "*"
              }
            })} />

          <input id={styles.inpassword} tabIndex="0"
            className={`${errors.password ? styles.errorBorder : styles.Border}`} ref={passwordRef}
            defaultValue="" type="password" placeholder="Enter Password" name="password" onChange={e => setPasswordV(passwordRef.current.value)}
            {...register('password', {
              required: (true, "*"),
              pattern: {
                value: /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/i,
                message: "*"
              }
            })} />


          <div id={styles.recaptcha}  tabIndex="0" >
            <ReCAPTCHA
              sitekey={process.env.REACT_APP_LOCAL_SITE_KEY}
              size="normal"
              ref={reCaptchaRef}
              onChange={onChange}
            />
          </div>

          {errors.email && <p id={styles.uError} role="alert" >{errors.email.message}</p>}
          {errors.password && <p id={styles.pError} role="alert"  > {errors.password.message}</p>}
          {errors.reCaptchaRef && <p id={styles.cError} role="alert"  > {errors.reCaptchaRef.message}</p>}

          <input id={styles.inremember} name="remember" type='checkbox' onChange={e => setRememberV(e.target.value)} {...register('remember')} />
          <label id={styles.label}> Remember me </label>
        </FocusLock>


        <BrowserRouter>

          <span id={styles.psw}> <Link to="/resetpassword" onClick={handleResetPassword} >Forgot Password?</Link></span>

          <label id={styles.signLabel} > Create new account?   </label>

          <Link to="/signup" id={styles.signUp} onClick={handleSignUp} > SignUp! </Link>
          <Switch>
          <Route path="/signup" exact>
               
                  {registerFrmShow ? <SignUp /> : null}
              </Route>
              <Route path="/resetpassword" exact>
              
                 <ResetPassword/>
              </Route>
          </Switch>
        </BrowserRouter>
      </div>

      <GoogleLogin
        clientId={googleClientId}
        onSuccess={onGoogleSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        className={styles.google}
        isSignedIn={true}
        buttonText='Google'
      />
      <span className={styles.linkedin} onClick={linkedInLogin}>
        <img border="0" src={linkedinLogo} className={styles.linkedimg}
          alt="Sign in with Linked In"
        />
        <p className={styles.linkedp}>linkedin</p>
      </span>


      <button type="submit" name="submit" id={styles.insubmit} tabIndex="0" onClick={handleSubmit(onSubmit)} disabled={isSubmiting} >{status}</button>
    </form>

  );

}


export default withRouter(SignIn);



// /* <a  onClick= {googleAuthentication}>
      //   <img img border="0" alt="Google" src={google} className={styles.google}></img>
      // </a>
      // <a href="https://www.Twitter.com" >
      //   <img img border="0" alt="Twitter" src={twitter} className={styles.twitter}></img>
      // </a>
      // <a href="https://www.linkedin.com" >
      //   <img img border="0" alt="linkedin" src={linkedin} className={styles.linkedin}></img>
      // </a>
      // <a href="https://www.facebook.com" >
      //   <img img border="0" alt="facebook" src={facebook} className={styles.facebook}></img>
      // </a> */