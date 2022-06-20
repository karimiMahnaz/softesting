import React, { useContext, useState, useRef, useEffect } from 'react';
import { Route, BrowserRouter, Switch, Link, useRouteMatch } from 'react-router-dom';
import { CookiesProvider } from "react-cookie";
import { Helmet, HelmetProvider } from 'react-helmet-async';

import Header from './components/header';
import NavBar from './components/navBar';
import Body from './components/body';
import Profile from './pages/profile';
//import Footer from './components/footer';
import Policy from './pages/policy';
import AboutUs from './pages/aboutUs';
import TestArticle1 from './blog/testArticle1';
import TestArticle2 from './blog/testArticle2';
import TestArticle3 from './blog/testArticle3';
import TestArticle4 from './blog/testArticle4';
import TestArticle5 from './blog/testArticle5';
import TestArticle6 from './blog/testArticle6';
import TestArticle7 from './blog/testArticle7';
import TestArticle8 from './blog/testArticle8';
import TestArticle9 from './blog/testArticle9';


import DevelopArticle1 from "./blog/developArticle1";
import DevelopArticle2 from "./blog/developArticle2";
import DevelopArticle3 from "./blog/developArticle3";
import DevelopArticle4 from "./blog/developArticle4";
import DevelopArticle5 from "./blog/developArticle5";
import DevelopArticle6 from "./blog/developArticle6";
//import NotFound from './pages/notFound';

import AuthContextProvider from './contexts/authContext';
import ThemeContextProvider from './contexts/themeContext';
import NavContextProvider from './contexts/navContext';

import VisibilityContextProvider from './contexts/visibilityContext';


function App() {

  ////const[, setDocTitle] = useDocTitle("SofTesting");
  ///let {path, url} = useRouteMatch();
  
 
  return (
    
    <>
     <HelmetProvider>
        <Helmet>
            <title>SofTesting</title>
            <meta name ="Description" content="Software Design, Development & Testing " />
            <meta name="Software Design, Development & Testing" content="SofTesting offers a full range of on-demand QA software testing services.." />
            <meta property="Progressive Web Apps (PWA)" content="Custom Development Services" />
            <meta property="Email" content="hello@SofTestingCa.com" />
          </Helmet>
         {/* <ReactTitle title="SofTesting"/> */}
      </HelmetProvider>
     
     
     <CookiesProvider>
      <AuthContextProvider>
        <VisibilityContextProvider>
          <ThemeContextProvider>
            <NavContextProvider>
               <BrowserRouter >
               <main className="App">
                 <Header /> 
                  <NavBar /> 
                  <Switch>  
                  <Route path='/' exact >
                     <Body />
                  </Route>
                  
                  <Route path='/dashboard' >
                     <Body />
                  </Route>

                  <Route path='/src/pages/profile'>
                     <Body/>
                     <Profile/>
                  </Route>

                  <Route path='/signin' >
                     <Body />
                  </Route>

                  <Route path='/signup' >
                     <Body />
                  </Route>

                  <Route path='/resetpassword' >
                     <Body />
                  </Route>          

                  <Route path='/user/changepassword' >
                     <Body />
                  </Route>   
       
                  <Route path='/src/pages/policy' exact>
                     <Policy />
                  </Route>   

                  <Route path='/src/pages/aboutus' exact >
                     <AboutUs />
                  </Route>   

                  <Route path='/src/blog/testarticle1' exact >
                     <TestArticle1 />
                  </Route>

                  <Route path='/src/blog/testarticle2' exact>
                     <TestArticle2/>
                  </Route>

                  <Route path='/src/blog/testarticle3' exact>
                     <TestArticle3/>
                  </Route>

                  <Route path='/src/blog/testarticle4' exact>
                     <TestArticle4/>
                  </Route>

                  <Route path='/src/blog/testarticle5' exact>
                     <TestArticle5/>
                  </Route>

                  <Route path='/src/blog/testarticle6' exact>
                     <TestArticle6/>
                  </Route>

                  <Route path='/src/blog/testarticle7' exact>
                     <TestArticle7/>
                  </Route>

                  <Route path='/src/blog/testarticle8' exact>
                     <TestArticle8/>
                  </Route>
                  
                  <Route path='/src/blog/testarticle9' exact>
                     <TestArticle9/>
                  </Route>

                  <Route path='/src/blog/developarticle1' exact>
                     <DevelopArticle1/>
                  </Route>
                  <Route path='/src/blog/developarticle2' exact>
                     <DevelopArticle2/>
                  </Route>
                  <Route path='/src/blog/developarticle3' exact>
                     <DevelopArticle3/>
                  </Route>

                  <Route path='/src/blog/developarticle4' exact>
                     <DevelopArticle4/>
                  </Route>
                  <Route path='/src/blog/developarticle5' exact>
                     <DevelopArticle5/>
                  </Route>
                  <Route path='/src/blog/developarticle6' exact>
                     <DevelopArticle6/>
                  </Route>
                  

                  </Switch>
                 </main>
                </BrowserRouter>
            </NavContextProvider>
          </ThemeContextProvider>
        </VisibilityContextProvider>
      </AuthContextProvider>
     </CookiesProvider>
     
    </>
  );
}

export default App;
