import React, { useContext, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
//import FocusLock from 'react-focus-lock';
import { useHistory } from 'react-router-dom';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


//import { Desktop, Tablet, Mobile, MobileX } from '../contexts/breakPoints';
import { VisibilityContext } from '../contexts/visibilityContext';
import { AuthContext } from '../contexts/authContext';

import styles from '../styles/profile.module.scss';


const Profile = () => {
  const [submitStatus, setSubmitStatus] = useState("Submit");
  const { profileFrmShow, setDashboardFrmShow, setFormsHide } = useContext(VisibilityContext);
  const { states } = useContext(AuthContext);
  const { register, handleSubmit, setValue, reset, formState: { errors, isDirty, isValid }, isSubmiting } = useForm({
    mode: "onTouch",
    reValidateMode: "onChange"
  });

  let history = useHistory();
  toast.configure();

  // const handleFrmClose = () => {
  //   history.push("/");
  //   setFormsHide();
  // }
  
  document.title = "SofTesting | Profile";

  const[picture, setPicture] =useState(null);
  const[pictureName, setPictureName] =useState(null);
  const[imageFile, setImageFile] =useState(null);
  const[preview, setPreview]=useState(null);
  const[selectedFiles, setSelectedFiles] = useState([]);
  const[userInfo,setUserInfo]=useState();

 
  const location = window.location.hostname;
  let getUrl='' , urlImage = '';

  if (location ==='localhost') {
    getUrl=  `http://${location}:8000/api/user/getProfile`;
    urlImage=`http://${location}:3000/uploaded-files/`;
       
} else{
    getUrl= `https://api.softestingca.com/api/user/getProfile`;
    urlImage=`https://api.softestingca.com/uploaded-files/`
}
  
const importAll=(r) => {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}

let emailW='' , src = '';
 
  useEffect(()=>{
    console.log(JSON.parse(localStorage.getItem('userEmail')));
  if (JSON.parse(localStorage.getItem('userEmail'))){ emailW= JSON.parse(localStorage.getItem('userEmail')); } 
     console.log(emailW);
   
     axios.get(getUrl , { params: { email:emailW } })
    .then(res => {
    
      const userInfo = res.data;
      setUserInfo({ userInfo });
      setValue('userName', res.data.userName);
      setValue('email', res.data.email);
      setValue('phone', res.data.phone);
      setValue('country', res.data.country);
      setValue('education', res.data.education);
      setValue('companyName', res.data.companyName);
   //   console.log('Value', res.data.role); console.log('Value', res.data.teams);
      if (res.data.role.substr(0,1)==='1') { setValue('requester', true)} else {setValue('requester', false)}
      if (res.data.role.substr(1,1)==='1') { setValue('provider', true)} else {setValue('provider', false)}
      if (res.data.teams.substr(0,1)==='1') { setValue('design', true)} else {setValue('design', false)}
      if (res.data.teams.substr(1,1)==='1') { setValue('develop', true)} else {setValue('develop', false)}
      if (res.data.teams.substr(2,1)==='1') { setValue('security', true)} else {setValue('security', false)}
      if (res.data.teams.substr(3,1)==='1') { setValue('qa', true)} else {setValue('qa', false)}
      

   /// src = require('../uploaded-profile/'+`${ res.data.email.replace(' ', '').trim()+'_profile/'+ res.data.imageName}`).default;
   
  ///     src = require('../uploaded-profile/'+ res.data.email.replace(' ', '').trim()+'_profile/'+ res.data.imageName);
  let  src1='';
  
  if (location ==='localhost') { 
    console.log(res.data.imageName)
    ///  src1 = fetchImages('./uploaded-files/'+ res.data.email.replace(' ', '').trim()+'_profile/'+ res.data.imageName);
 //'http://localhost:3000/uploaded-files/'
 //'https://softestingca/uploaded-files/'
    setImageFile(urlImage + res.data.email.replace(' ', '').trim()+'_profile/'+ res.data.imageName); 
  } else{
    console.log(res.data.imageName)
     console.log(res.data)
     /////src1 = fetchImages('https://api.softestingca.com/uploaded-files/'+ res.data.email.replace(' ', '').trim()+'_profile/'+ res.data.imageName);
     setImageFile(urlImage + res.data.email.replace(' ', '').trim()+'_profile/'+ res.data.imageName); 
  }
 /// console.log('src1',src1);
  //  const blob = new Blob(
  //    [src1], 
  //   {type: 'image/jpeg'});

  //   console.log(blob);
    //   var binaryData = [];
    //   binaryData.push(src1);
   // const blob =  src1.blob();
   //setImageFile(window.URL.createObjectURL(new Blob(binaryData[0], {type: "image/jpeg"})));
 ///     src = window.URL.createObjectURL(new Blob(blob, {type: "image/jpeg"}));
//  const fileReaderInstance = new FileReader();
//  fileReaderInstance.readAsDataURL(blob); 
//  fileReaderInstance.onload = () => {
//     let base64data = fileReaderInstance.result;                
//      console.log(base64data);
    // setImageFile(base64data);
// }
      // setImageFile(URL.createObjectURL(blob));   
     //  setImageFile(URL.createObjectURL(src1));
   })

  },[])

  const fetchImages = async (imageUrl) => {
    let getImageUrl = '';
    if (location ==='localhost') {
       getImageUrl=  `http://localhost:8000/api/user/getProfileImage`
      } else{
       getImageUrl= `https://api.softestingca.com/api/user/getProfileImage`
      }
      //let response = '';
      //, {responseType: 'blob'}
    axios.get(getImageUrl, { params: { url:imageUrl } , responseType:'arraybuffer' })
    .then(res => {
      console.log(res.data.Blob);
        return  res.data.Blob;
        
    })
    .catch(err => {
      console.log(err);
    })
     
}

  const onImageChange=(e)=>{
   
      var picture = e.target.files[0];
          src = window.URL.createObjectURL(picture);
  //    console.log('picture', picture);
      console.log('src',src);
     
      setSelectedFiles(e.target.files[0])
      setImageFile(src); 
      console.log('imageFile',imageFile);
      setPicture(picture);
      setPictureName(picture.name);
   //   console.log('picture.file.name',picture.name); 
  
  }
  
  const onClick = () => { 
    setSelectedFiles(null) ;
    setPictureName(null);
  }

  const onSubmit = (data, e) => {
           setSubmitStatus("Sending");
       
            let url = '', url_file = '', key = '',  url_fileName ='';

            if (location ==='localhost') {

                url=  `http://${location}:8000/api/user/profile`

                if (selectedFiles) {
                    url_file = `http://${location}:8000/api/file`
                    key = 'myFile';
                    url_fileName = `http://${location}:8000/api/user/updateProfile`;
                }
            } else{

                url= `https://api.softestingca.com/api/user/profile`
              
              if (selectedFiles) {
                url_file = 'https://api.softestingca.com/api/file'
                key = 'myFile';
                url_fileName = `https://api.softestingca.com/api/user/updateProfile`;

                 }
            }

            axios({
              method: "post",
              url:url,
              data: data 
          })
          .then(({ data, status }) => {
    
                if (status === 200) {
    
                      toast.success("It's Done.", { theme: "colored" });
    
                  } else  {
                      toast.success("failed to save profile.", { theme: "dark" });
                      return;
                  }
              })
          .catch(  (ex) => { 
            toast.error("failed to save.", { theme: "dark" });
            return;
          })
    
            let formData = new FormData();
            formData.append(`${key}`, selectedFiles);
     
          if (selectedFiles) {
            axios({
              method: "post",
              url: url_file,
              data: formData,
      
              'headers': {
                     'content-type': 'multipart/form-data',
                     'category':  data.email.replace(' ', '').trim() +'_profile'
              }
          })
              .then(response => {
                  console.log('response file', response);
                  console.log('data.email',data.email)
                  console.log('pictureName',pictureName)
                  axios({
                    method: "post",
                    url:url_fileName,
                    data: {email:data.email, imageName:pictureName} 
                })
                    .then( response => {toast.success("ImageName is updated.", { theme: "colored" });})
                    .catch(error =>{
                       toast.error("ImageName failed to updated.", { theme: "dark" });
                       return;})

              })
              .catch(error => {
                  console.log('error file', error.response);
                  console.log('error file', error.request);
                  console.log('error file', error.message);
                  toast.error("File failed to upload.", { theme: "dark" })
              })
      }

    
    setSubmitStatus("Done");

  }
  
  return (
   
        <form  className={profileFrmShow?styles.container:styles.inactive}  onSubmit={handleSubmit(onSubmit)}>
        
         <h1 className = {styles.h1}>software testing</h1>
         {imageFile?<img id={styles.avatar} src={imageFile}/>:<p id={styles.avatar} > No Preview </p>}

         <input type="file" id={styles.fileInPut} accept="image/*" 
         name="fileInput" {...register("fileInput")} onChange={onImageChange} onClick={() => onClick()}/>
    
          <input type={styles.text} id={styles.userName} placeholder="Full Name"
            className={`${errors.userName ? styles.errorBorder : styles.Border}`}
            defaultValue=""  name="userName" autoFocus tabIndex="0"
            {...register('userName', {
              required: "*",
              minLength: (4, "*"),
              maxLength: (120, "*"),
              pattern: {   /*  /^[a-zA-Z]*$/ */
                value: /^([a-zA-Z\s])+$/,
                message: "*"
              }
            })} />
          <input id={styles.email} placeholder="Email Address" disabled
            className={`${errors.email ? styles.errorBorder : styles.Border}`}
            defaultValue="" type="email"  name="email"
            {...register('email', {
              required: "*",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "*"
              }
            })} />
          <input id={styles.phone} placeholder="phone Number(with country code)"
            className={`${errors.phone ? styles.errorBorder : styles.Border}`}
            defaultValue="" type="phone" name="phone" tabIndex="0"
            {...register('phone', {
              required: "*",
              pattern: {
                value: /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i,
                message: "*"
              }
            })} />

          <input  id={styles.country} placeholder="your country"
            className={`${errors.country ? styles.errorBorder : styles.Border}`}
            defaultValue="" type="text" name="country"  tabIndex="0"
            {...register('country', {
              required: "*",
              minLength: (3, "*"),
              maxLength: (50, "*"),
              pattern: {   /*  /^[a-zA-Z]*$/ */
                value: /^([a-zA-Z\s])+$/,
                message: "*"
              }
            })} />
            <input  id={styles.education} placeholder="education"
            className={`${errors.education ? styles.errorBorder : styles.Border}`}
            defaultValue="" type="text" name="education"  tabIndex="0"
            {...register('education', {
              required: "*",
              minLength: (3, "*"),
              maxLength: (100, "*"),
              pattern: {   /*  /^[a-zA-Z]*$/ */
                value: /^([a-zA-Z\s])+$/,
                message: "*"
              }
            })} />

             <input  id={styles.companyName} placeholder="companyName"
            className={`${errors.companyName ? styles.errorBorder : styles.Border}`}
            defaultValue="" type="text" name="companyName"  tabIndex="0"
            {...register('companyName', {
              required: "*",
              minLength: (3, "*"),
              maxLength: (100, "*"),
              pattern: {   /*  /^[a-zA-Z]*$/ */
                value: /^([a-zA-Z\s])+$/,
                message: "*"
              }
            })} />
            <span id ={styles.role}>Your role in SofTesting:</span>
            <input id={styles.requester} name="requester" type='checkbox'  {...register('requester')}/> 
            <span id={styles.requesterLabel}>Service requester</span>
            <input id={styles.provider} name="provider" type='checkbox'  {...register('provider')}/>
            <span id={styles.providerLabel}>Service provider</span>

            <span id ={styles.teams}>Teams:</span>
            <input id={styles.design} name="design" type='checkbox'  {...register('design')}/> 
            <span id={styles.designLabel}>UI/UX Design</span>
            <input id={styles.develop} name="develop" type='checkbox'  {...register('develop')}/>
            <span id={styles.developLabel}>Development</span>
            <input id={styles.security} name="security" type='checkbox'  {...register('security')}/>
            <span id={styles.securityLabel}>Security Testing</span>
            <input id={styles.qa} name="qa" type='checkbox'  {...register('qa')}/>
            <span id={styles.qaLabel}>QA Testing</span>

          {errors.userName && <p id={styles.uError} role="alert" >{errors.userName.message}</p>}
          {errors.email && <p id={styles.eError} role="alert"  >{errors.email.message}</p>}
          {errors.phone && <p id={styles.phError} role="alert"  >{errors.phone.message}</p>}
          {errors.country && <p id={styles.cError} role="alert"  >{errors.country.message}</p>}
          {errors.education && <p id={styles.edError} role="alert"  >{errors.education.message}</p>}
          {errors.companyName && <p id={styles.coError} role="alert"  >{errors.companyName.message}</p>}  
          
          <button type="submit" id={styles.submit} tabIndex="0" onClick={handleSubmit(onSubmit)} disabled={isSubmiting} >{submitStatus}</button>
        
      </form>
   
  );

}


export default Profile;