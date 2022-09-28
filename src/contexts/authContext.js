import React , {createContext, useState, useReducer, useEffect} from 'react';
import {authReducer} from '../reducers/authReducer';

export  const AuthContext = createContext();


  const initialState = {
    userId:'',
    userName:'',
    userEmail:'',
    isLoading : false ,
    authorized : false,
    cookies:false,
    token:'',
    documentUrl:'',
};

const AuthContextProvider = (props) =>{
    const [states, dispatch] = useReducer(authReducer,[],()=>{
       const data = localStorage.getItem('states');
       return data? JSON.parse(data):[]
    })

    useEffect(()=>{
        localStorage.setItem('states',JSON.stringify(states))
    },[states])

    return( 
        <AuthContext.Provider value={{states, dispatch}}>
            {props.children}
        </AuthContext.Provider>
        );

}
export default AuthContextProvider;