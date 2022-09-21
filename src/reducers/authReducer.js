


export const authReducer=(state, action)=>{
    console.log('action.type', action.type)
    switch(action.type){
       
        case 'ScrollToTop':
            console.log('...state',...state )
            localStorage.setItem("cookies", true);
            return[...state,{
                cookies:true,
             }] ;
            
        case 'SignIn':
          
            localStorage.setItem("userName", JSON.stringify(action.userName));
            localStorage.setItem("userEmail", JSON.stringify(action.userEmail));
            localStorage.setItem("authorized", true);
            return[...state,{
            authorized:true,
            userName:action.userName,
            userEmail:action.userEmail
             }] ;

          case 'SignUp':
          
                localStorage.setItem("userName", JSON.stringify(action.userName));
                localStorage.setItem("userEmail", JSON.stringify(action.userEmail));
                localStorage.setItem("authorized", true);
                return[...state,{
                authorized:true,
                userName:action.userName,
                userEmail:action.userEmail
                 }] ;
      
        case 'SignOut':
            localStorage.removeItem('googleData');
            localStorage.clear();
            return[...state,{
                authorized:false,
                userName:'',
                userEmail:'',
                cookies:false
            }]
  
        default:
         break;
    }
    return state;
}