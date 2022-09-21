import React, {useRef, useContext, useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { withCookies, useCookies } from 'react-cookie';


import { Desktop, Tablet, Mobile, MobileX } from '../contexts/breakPoints';
import styles from '../styles/onLineChatLogin.module.scss';
import { VisibilityContext } from '../contexts/visibilityContext';
///import OnLineChat from './onLineChat';

import title from '../assets/Icon/4910150761581665181.svg'


const OnLineChatLogin= (props) => {
    const {  setOnLineChatFrmShow, setOffOnLineChatFrmShow, onLineChatLoginFrmShow, setOnLineChatLoginFrmShow } = useContext(VisibilityContext);
    const { register, handleSubmit, formState: { errors }, isSubmiting } = useForm({
        mode: "onTouched",
        reValidateMode: "onChange"
      });

      const [dataForm, setDataForm] = useState('');
      const [emailCookies, setEmailCookie] = useCookies(['email']);
      const [nameCookies, setNameCookie] = useCookies(['name']);
      const userNameRef = useRef();
      const emailRef = useRef();

      let history = useHistory();
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

      const handleClose =()=>{
      ///  history.push("/");
        setOffOnLineChatFrmShow();
      }

      const onSubmit = async (data, e) => {
        setDataForm(data);

        setEmailCookie('email', data.email, { path: '/' });
        setNameCookie('name', data.userName, { path: '/' });

        history.push({
        ///  pathname: "/onLineChat",
          state: {
            name:dataForm.userName,
            email:dataForm.email
          }
        });

        setOnLineChatFrmShow();
    }

    document.title= 'SofTesting | OnLineChat Login';

    return(
      <>
<Desktop>
    <div   className={`${onLineChatLoginFrmShow? styles.onLineChatLogin: styles.inactive}` }  onSubmit={handleSubmit(onSubmit)}  >
        <div id ={styles.header} >
           <span  >
               <img id={styles.title} src={title} />
               Online Chat 
           </span>
           <span id={styles.minBtn1} onClick={handleClose}> </span>     
           <span id={styles.minBtn2} onClick={handleClose}> </span>             
        </div>
       
        <h1  id={styles.h3}>Request OnLine Support Chat </h1>

        <input  id={styles.userName} placeholder="Full Name" 
            className={`${errors.userName ? styles.errorBorder : styles.Border}`}
            defaultValue="" type="text" name="userName" autoFocus tabIndex="0" ref={userNameRef}
            {...register('userName', {
              required: "*",
              minLength: (4, "*"),
              maxLength: (120, "*"),
              pattern: {   /*  /^[a-zA-Z]*$/ */
                value: /^([a-zA-Z\s])+$/,
                message: "*"
              }
            })} />
          <input id={styles.email}  tabIndex="0" ref={emailRef}
            className={`${errors.email ? styles.errorBorder : styles.Border}`} 
            defaultValue="" type="email" placeholder="Email Address" name="email"
            {...register('email', {
              required: "*",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "*"
              }
            })} />
              {errors.userName && <p id={styles.uError} role="alert" >{errors.userName.message}</p>}
              {errors.email && <p id={styles.eError} role="alert"  >{errors.email.message}</p>}

            <button id={styles.submit}  tabIndex="0" onClick={handleSubmit(onSubmit)} disabled={isSubmiting} >Submit</button>
                {/* {onLineChatFrmShow  && <OnLineChat chatData = {dataForm} />} */}
    </div>

    </Desktop>
    <Tablet>

    <div   className={`${onLineChatLoginFrmShow? styles.onLineChatLogin: styles.inactive}` }  onSubmit={handleSubmit(onSubmit)}  >
        <div id ={styles.header} >
           <span  >
               <img id={styles.title} src={title} />
              Online Chat     
           </span>
           <span id={styles.minBtn1} onClick={setOffOnLineChatFrmShow }> </span>     
           <span id={styles.minBtn2} onClick={setOffOnLineChatFrmShow }> </span>             
        </div>
       
        <h3  id={styles.h3}>Request OnLine Support Chat </h3>

        <input  id={styles.userName} placeholder="Full Name" 
            className={`${errors.userName ? styles.errorBorder : styles.Border}`}
            defaultValue="" type="text" name="userName" autoFocus tabIndex="0" ref={userNameRef}
            {...register('userName', {
              required: "*",
              minLength: (4, "*"),
              maxLength: (120, "*"),
              pattern: {   /*  /^[a-zA-Z]*$/ */
                value: /^([a-zA-Z\s])+$/,
                message: "*"
              }
            })} />
          <input id={styles.email} placeholder="Email Address" tabIndex="0" ref={emailRef}
            className={`${errors.email ? styles.errorBorder : styles.Border}`} 
            defaultValue="" type="email" name="email"
            {...register('email', {
              required: "*",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "*"
              }
            })} />
              {errors.userName && <p id={styles.uError} role="alert" >{errors.userName.message}</p>}
              {errors.email && <p id={styles.eError} role="alert"  >{errors.email.message}</p>}

            <button id={styles.submit}  tabIndex="0" onClick={handleSubmit(onSubmit)} disabled={isSubmiting} >Submit</button>
                {/* {onLineChatFrmShow  && <OnLineChat chatData = {dataForm} />} */}
    </div>

    </Tablet>
    <Mobile>
    <div   className={`${onLineChatLoginFrmShow? styles.onLineChatLogin: styles.inactive}` }  onSubmit={handleSubmit(onSubmit)} style={{ width: `${dimensions.width}px`, height: `${dimensions.height-60}px` }}  >
        <div id ={styles.header} style={{ width: `${dimensions.width}px`}}>
           <span  >
               <img id={styles.title} src={title} />
              Online Chat     
           </span>
           <span id={styles.minBtn1} onClick={setOffOnLineChatFrmShow }> </span>     
           <span id={styles.minBtn2} onClick={setOffOnLineChatFrmShow }> </span>             
        </div>
       
        <h3  id={styles.h3}>Request OnLine Support Chat </h3>

        <input  id={styles.userName} placeholder="Full Name" 
            className={`${errors.userName ? styles.errorBorder : styles.Border}`}
            defaultValue="" type="text" name="userName" autoFocus tabIndex="0" ref={userNameRef}
            {...register('userName', {
              required: "*",
              minLength: (4, "*"),
              maxLength: (120, "*"),
              pattern: {   /*  /^[a-zA-Z]*$/ */
                value: /^([a-zA-Z\s])+$/,
                message: "*"
              }
            })} />
          <input id={styles.email}  tabIndex="0" ref={emailRef}
            className={`${errors.email ? styles.errorBorder : styles.Border}`} 
            defaultValue="" type="email" placeholder="Email Address" name="email"
            {...register('email', {
              required: "*",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "*"
              }
            })} />
              {errors.userName && <p id={styles.uError} role="alert" >{errors.userName.message}</p>}
              {errors.email && <p id={styles.eError} role="alert"  >{errors.email.message}</p>}

            <button id={styles.submit}  tabIndex="0" onClick={handleSubmit(onSubmit)} disabled={isSubmiting} >Submit</button>
                {/* {onLineChatFrmShow  && <OnLineChat chatData = {dataForm} />} */}
    </div>

    </Mobile>
    <MobileX>
    <div   className={`${onLineChatLoginFrmShow? styles.onLineChatLogin: styles.inactive}` }  onSubmit={handleSubmit(onSubmit)} style={{ width: `${dimensions.width}px`, height: `${dimensions.height-60}px` }}  >
        <div id ={styles.header} style={{ width: `${dimensions.width}px`}}>
           <span  >
               <img id={styles.title} src={title} />
              Online Chat     
           </span>
           <span id={styles.minBtn1} onClick={setOffOnLineChatFrmShow }> </span>     
           <span id={styles.minBtn2} onClick={setOffOnLineChatFrmShow }> </span>             
        </div>
       
        <h3  id={styles.h3}>Request OnLine Support Chat </h3>

        <input  id={styles.userName} placeholder="Full Name" 
            className={`${errors.userName ? styles.errorBorder : styles.Border}`}
            defaultValue="" type="text" name="userName" autoFocus tabIndex="0" ref={userNameRef}
            {...register('userName', {
              required: "*",
              minLength: (4, "*"),
              maxLength: (120, "*"),
              pattern: {   /*  /^[a-zA-Z]*$/ */
                value: /^([a-zA-Z\s])+$/,
                message: "*"
              }
            })} />
          <input id={styles.email}  tabIndex="0" ref={emailRef}
            className={`${errors.email ? styles.errorBorder : styles.Border}`} 
            defaultValue="" type="email" placeholder="Email Address" name="email"
            {...register('email', {
              required: "*",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "*"
              }
            })} />
              {errors.userName && <p id={styles.uError} role="alert" >{errors.userName.message}</p>}
              {errors.email && <p id={styles.eError} role="alert"  >{errors.email.message}</p>}

            <button id={styles.submit}  tabIndex="0" onClick={handleSubmit(onSubmit)} disabled={isSubmiting} >Submit</button>
                {/* {onLineChatFrmShow  && <OnLineChat chatData = {dataForm} />} */}
    </div>

    </MobileX>
    </>
)

}

export default withCookies(OnLineChatLogin);