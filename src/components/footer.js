

import React, { useState,  useContext } from 'react';
import styles from '../styles/footer.module.scss';
import {  BrowserRouter, Switch, Link,  withRouter } from 'react-router-dom';

import { Desktop, Tablet, Mobile, MobileX } from '../contexts/breakPoints';
import SofTestingLogo from './sofTestingLogo';
import MediaLogo from './mediaLogo';
import { LoginContext } from '../contexts/loginContext';

import { VisibilityContext } from '../contexts/visibilityContext';

const Footer = () => {


    const { bodyFrmShow, policyFrmShow, setPolicyFrmShow, aboutUsFrmShow, blogShow, setAboutUsFrmShow, setFormsHide, setAllFormsHide, scrollToTop } = useContext(VisibilityContext);

    const [footer, setFooter] = useState(false);
    
    ///const history = useHistory();

    const location = window.location.hostname;

    let urlSitemap, urlPolicy, urlAbout ;

    if (location === 'localhost') {
        urlSitemap =  'http://localhost:3000/sitemap.xml';
        urlPolicy = "/src/pages/policy"
        urlAbout = "/src/pages/aboutus"
} else {
        urlSitemap = 'https://softestingca.com/sitemap.xml';
        urlPolicy = "/src/pages/policy"
        urlAbout = "/src/pages/aboutus"
}
    const handlePolicy = () => {
        if (!policyFrmShow){
            setPolicyFrmShow();
          ///  history.push("/policy");
        }
    }

    const handleAbout = () => {
        setAboutUsFrmShow();
    ////   history.push("src/pages/aboutUs");
    }

    const scrollToContactUs = () => {
        window && window.scrollTo({
            top: 5600,
            behavior: "smooth"
        });
    };

    //   const[pressed,setPressed] = useState(false);
    //   useEffect(()=> {
    //     window.onpopstate=() =>{ setPressed(true);  }
    //   },[])
    //     //   policyFrmShow? styles.policy: aboutUsFrmShow? styles.aboutUs:

    //     useEffect(() => {
    //        /// window.history.pushState(null, null, window.location.pathname);//or//
    //          window.history.pushState(null, null, window.location.href);

    //             window.addEventListener('popstate' , () => { if (!bodyFrmShow) {setBodyFrmShow()} 
    //             if (aboutFrmShow) {setBodyFrmShow()}   if (policyFrmShow) {setBodyFrmShow()}  })
    //             }, []);


    const { isLoading } = LoginContext;
  ///policyFrmShow ? styles.policyFooter : aboutUsFrmShow ? styles.aboutUsFooter : bodyFrmShow && !blogShow ? styles.footer :styles.articleFooter
    return (
        <BrowserRouter>
            <footer className={styles.articleFooter} >
                <Desktop>
                    <Link id={styles.link0} to="/">
                        <SofTestingLogo />
                    </Link>
                    <MediaLogo />

                    <ul className={styles.footer_testServices}>

                        <li><strong> Testing & QA Services </strong></li>
                        <li>Manual Testing</li>
                        <li>Automated Testing</li>
                        <li>Web Applications Testing</li>
                        <li>Web Security Testing</li>
                        <li>Mobile Applications Testing</li>
                        <li>Integaration Testing</li>

                    </ul>

                    <ul className={styles.footer_developServices}>

                        <li><strong> Development Services </strong></li>
                        <li>Custom Web Development</li>
                        <li>Custom Software Development</li>
                        <li>PWA Development</li>
                        <li>Mobile App Development</li>
                        <li>UI/UX Design</li>
                        <li>Technical SEO Services</li>

                    </ul>

                    <div className={styles.footer_Services}>


                        <Link id={styles.who} to={`${urlAbout}`}  target="_blank" onClick={handleAbout}>WHO WE ARE</Link>
                        <Link id={styles.what} to={`${urlAbout}`} target="_blank" onClick={handleAbout}>WHAT WE DO</Link>
                        <Link id={styles.how} to={`${urlAbout}`}  target="_blank" onClick={handleAbout}>HOW WE DO IT</Link>
                        <a id={styles.proposal} onClick={scrollToContactUs}>REQUEST A PROPOSAL </a>
                        <a id={styles.joinUs} onClick={scrollToContactUs}>JOIN US</a>
                        <a id={styles.blog} >BLOG</a>

                    </div>

                    <div className={styles.copyright}> &#9400; Copyright 2021 by SofTesting | <Link id={styles.policy} to= {`${urlPolicy}`} target="_blank" onClick={handlePolicy}>Privacy Policy</Link> | <a id={styles.sitmap} href={`${urlSitemap}`}  target="_blank" rel="noreferrer" >Sitemap</a> </div>

                 
                      

                       {/*  <Route path="href="http://localhost:3000/src/pages/aboutUs" target="_blank" onClick={handleBlogShow} exact>
                            {aboutUsFrmShow ? <AboutUs /> : null}
                        </Route> */}

                        {/* <Route path="/sitemap" exact>
                        </Route> */}
                        {/* <Route path="/contactP"  exact> 
                              `${contactFrmShow? <ContactUs src= "REQUEST A PROPOSAL" /> :null}`
                        </Route>
                        <Route path="/contactJ"  exact> 
                              `${contactFrmShow? <ContactUs src= "JOIN US" /> :null}`
                        </Route> */}
                



                </Desktop>

                <Tablet>
                <Link id={styles.link0} to="/">
                        <SofTestingLogo />
                    </Link>
                    <MediaLogo />

                    <ul className={styles.footer_testServices}>

                        <li><strong> Testing & QA Services </strong></li>
                        <li>Manual Testing</li>
                        <li>Automated Testing</li>
                        <li>Web Applications Testing</li>
                        <li>Web Security Testing</li>
                        <li>Mobile Applications Testing</li>
                        <li>Integaration Testing</li>

                    </ul>

                    <ul className={styles.footer_developServices}>

                        <li><strong> Development Services </strong></li>
                        <li>Custom Web Development</li>
                        <li>Custom Software Development</li>
                        <li>PWA Development</li>
                        <li>Mobile App Development</li>
                        <li>UI/UX Design</li>
                        <li>Technical SEO Services</li>

                    </ul>

                   
                    <div className={styles.footer_Services}>


                        <Link id={styles.who} to={`${urlAbout}`}  target="_blank" onClick={handleAbout}>WHO WE ARE</Link>
                        <Link id={styles.what} to={`${urlAbout}`} target="_blank" onClick={handleAbout}>WHAT WE DO</Link>
                        <Link id={styles.how} to={`${urlAbout}`}  target="_blank" onClick={handleAbout}>HOW WE DO IT</Link>
                        <a id={styles.proposal} onClick={scrollToContactUs}>REQUEST A PROPOSAL </a>
                        <a id={styles.joinUs} onClick={scrollToContactUs}>JOIN US</a>
                        <a id={styles.blog} >BLOG</a>

                    </div>

                    <div className={styles.copyright}> &#9400; Copyright 2021 by SofTesting | <Link id={styles.policy} to= {`${urlPolicy}`} target="_blank" onClick={handlePolicy}>Privacy Policy</Link> | <a id={styles.sitmap} href={`${urlSitemap}`}  target="_blank" rel="noreferrer" >Sitemap</a> </div>

                    {/* <Switch> */}

                        {/* <Route path="/aboutUs" exact>
                            {aboutUsFrmShow ? <AboutUs /> : null}
                        </Route> */}

                        {/* <Route path="/sitemap" exact>
                        </Route> */}
                        {/* <Route path="/contactP"  exact> 
                              `${contactFrmShow? <ContactUs src= "REQUEST A PROPOSAL" /> :null}`
                        </Route>
                        <Route path="/contactJ"  exact> 
                              `${contactFrmShow? <ContactUs src= "JOIN US" /> :null}`
                        </Route> */}
            {/*     </Switch> */}

                </Tablet>
                <Mobile>


                <Link id={styles.link0} to="/">
                        <SofTestingLogo />
                    </Link>
                    <MediaLogo />

                    <ul className={styles.footer_testServices}>

                        <li><strong> Testing & QA Services </strong></li>
                        <li>Manual Testing</li>
                        <li>Automated Testing</li>
                        <li>Web Applications Testing</li>
                        <li>Web Security Testing</li>
                        <li>Mobile Applications Testing</li>
                        <li>Integaration Testing</li>

                    </ul>

                    <ul className={styles.footer_developServices}>

                        <li><strong> Development Services </strong></li>
                        <li>Custom Web Development</li>
                        <li>Custom Software Development</li>
                        <li>PWA Development</li>
                        <li>Mobile App Development</li>
                        <li>UI/UX Design</li>
                        <li>Technical SEO Services</li>

                    </ul>

                   
                    <div className={styles.footer_Services}>


                        <Link id={styles.who} to={`${urlAbout}`}  target="_blank" onClick={handleAbout}>WHO WE ARE</Link>
                        <Link id={styles.what} to={`${urlAbout}`} target="_blank" onClick={handleAbout}>WHAT WE DO</Link>
                        <Link id={styles.how} to={`${urlAbout}`}  target="_blank" onClick={handleAbout}>HOW WE DO IT</Link>
                        <a id={styles.proposal} onClick={scrollToContactUs}>REQUEST A PROPOSAL </a>
                        <a id={styles.joinUs} onClick={scrollToContactUs}>JOIN US</a>
                        <a id={styles.blog} >BLOG</a>

                    </div>

                    <div className={styles.copyright}> &#9400; Copyright 2021 by SofTesting | <Link id={styles.policy} to= {`${urlPolicy}`} target="_blank" onClick={handlePolicy}>Privacy Policy</Link> | <a id={styles.sitmap} href={`${urlSitemap}`}  target="_blank" rel="noreferrer" >Sitemap</a> </div>

                    {/* <Switch>
                       

                        <Route path="/aboutUs" exact>
                            {aboutUsFrmShow ? <AboutUs /> : null}
                        </Route> */}

                        {/* <Route path="/sitemap" exact>
                        </Route> */}
                        {/* <Route path="/contactP"  exact> 
                              `${contactFrmShow? <ContactUs src= "REQUEST A PROPOSAL" /> :null}`
                        </Route>
                        <Route path="/contactJ"  exact> 
                              `${contactFrmShow? <ContactUs src= "JOIN US" /> :null}`
                        </Route> */}
                 


                </Mobile>



                <MobileX>

                <Link id={styles.link0} to="/">
                        <SofTestingLogo />
                    </Link>
                    <MediaLogo />

                    <ul className={styles.footer_testServices}>

                        <li><strong> Testing & QA Services </strong></li>
                        <li>Manual Testing</li>
                        <li>Automated Testing</li>
                        <li>Web Applications Testing</li>
                        <li>Web Security Testing</li>
                        <li>Mobile Applications Testing</li>
                        <li>Integaration Testing</li>

                    </ul>

                    <ul className={styles.footer_developServices}>

                        <li><strong> Development Services </strong></li>
                        <li>Custom Web Development</li>
                        <li>Custom Software Development</li>
                        <li>PWA Development</li>
                        <li>Mobile App Development</li>
                        <li>UI/UX Design</li>
                        <li>Technical SEO Services</li>

                    </ul>

                    
                    <div className={styles.footer_Services}>


                        <Link id={styles.who} to={`${urlAbout}`}  target="_blank" onClick={handleAbout}>WHO WE ARE</Link>
                        <Link id={styles.what} to={`${urlAbout}`} target="_blank" onClick={handleAbout}>WHAT WE DO</Link>
                        <Link id={styles.how} to={`${urlAbout}`}  target="_blank" onClick={handleAbout}>HOW WE DO IT</Link>
                        <a id={styles.proposal} onClick={scrollToContactUs}>REQUEST A PROPOSAL </a>
                        <a id={styles.joinUs} onClick={scrollToContactUs}>JOIN US</a>
                        <a id={styles.blog} >BLOG</a>

                    </div>

                    <div className={styles.copyright}> &#9400; Copyright 2021 by SofTesting | <Link id={styles.policy} to= {`${urlPolicy}`} target="_blank" onClick={handlePolicy}>Privacy Policy</Link> | <a id={styles.sitmap} href={`${urlSitemap}`}  target="_blank" rel="noreferrer" >Sitemap</a> </div>

                    {/* <Switch>
        

                        <Route path="/aboutUs" exact>
                            {aboutUsFrmShow ? <AboutUs /> : null}
                        </Route> */}

                        {/* <Route path="/sitemap" exact>
                        </Route> */}
                        {/* <Route path="/contactP"  exact> 
                              `${contactFrmShow? <ContactUs src= "REQUEST A PROPOSAL" /> :null}`
                        </Route>
                        <Route path="/contactJ"  exact> 
                              `${contactFrmShow? <ContactUs src= "JOIN US" /> :null}`
                        </Route> */}
                 
                </MobileX>
            </footer>
        </BrowserRouter>
    );

}




export default withRouter(Footer);
