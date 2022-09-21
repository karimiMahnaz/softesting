import React, { useContext } from 'react';

import styles from '../styles/aboutUs.module.scss';
import { NavContext } from '../contexts/navContext';
//import { Desktop, Tablet, Mobile, MobileX } from '../contexts/breakPoints';
//import img from "../assets/Page/Aboutuspage-cuate.svg";
import img from "../assets/Page/ArtWallpaper.jpg";
import img4 from "../assets/Page/4-768x553.png";
import img5 from "../assets/Page/19963.jpg";
import img6 from "../assets/Page/SignalR.jpg";
import img7 from "../assets/Page/app-signup.jpg";
import img8 from "../assets/Page/index.jpg";
///import img9 from "../assets/Page/3004485.png";
import flag from "../assets/Icon/icons8-canada-48.png";

import backimg5 from "../assets/Index22.jpg";
import ContactUs from '../pages/contactUs';
import ScrollToTop from '../components/scrollToTop';
import Footer from '../components/footer';

import Map from '../components/MapContainer';
import { VisibilityContext } from '../contexts/visibilityContext';

import icon1 from '../assets/Icon/9797550691600459969.svg'
import icon2 from '../assets/Icon/9528897181581665190.svg'
import icon3 from '../assets/Icon/8264627911581665178.svg'
import icon4 from '../assets/Icon/11721476711581665195.svg'
import icon5 from '../assets/Icon/19276499341600459971.svg'
import icon6 from '../assets/Icon/6063251581583147612.svg'




const AboutUs = () => {

     const { setOffMenu } = useContext(NavContext);
     const {  setFormsHide } = useContext(VisibilityContext);
 
     document.title= 'SofTesting | AboutUs ';
    //// className={aboutUsFrmShow ? styles.about : styles.inactive}
     return (
          <div onClick={setOffMenu} onMouseDown ={setFormsHide} >
               <div className={styles.img} style={{ backgroundImage: `url(${img})` }}>
                    <div className={styles.subImg}>
                         <h1>About SofTesting</h1>
                         <h2>We Design, Build and Test Software Products </h2>
                         <p>We help organizations deliver high-quality systems and applications quickly<br />
                              and efficiently by offering expert consultancy, services, training, and solutions.</p>
                    </div>
                    {/* <span className={styles.triangle_left}></span> */}
               </div>


               <div className={styles.aboutsection2}>
                    <h3><strong>Our Values</strong></h3>
               </div>

               <div className={styles.values}>
                    <div className={styles.value}>
                         <div className={styles.header} >
                              <img src={icon1} alt="quality" />
                              <h6> Quality </h6>
                         </div>
                    
                              <p className={styles.card_content}>
                                   Quality defines everything we do. It relates to our people, products and practices. For our clients, we help them enhance the customer experience and gain a competitive edge by embedding superior quality in their solutions and delivery.
                              </p>

                    
                    </div>

                    <div className={styles.value}>
                         <div className={styles.header}>
                              <img src={icon2} alt="collaboration" />
                              <h6> Collaboration </h6>
                         </div>
                              <p className={styles.card_content}>
                                   We believe that two minds are better than one. Through internal and external collaboration, we are able to spark ideas and creative solutions that uplift the way we service our employees, clients and stakeholders.
                              </p>

                    </div>

                    <div className={styles.value}>
                         <div className={styles.header}>
                              <img src={icon3} alt="innovation" />
                              <h6> Innovation </h6>
                         </div>

                              <p  className={styles.card_content}>
                                   Through continuous improvement and constant innovation we are able to find ever improved solutions to our clients’ challenges, securing our position at the forefront of our field and sustaining our accelerated growth path.
                              </p>

                    </div>
                    <div className={styles.value}>
                         <div className={styles.header}>
                              <img src={icon4} alt="passion" />
                              <h6> Passion </h6>
                         </div>

                              <p className={styles.card_content}>
                                   Passion binds us and drives us to continuously grow, improve and reach greater heights. Our passion is clearly reflected in the pride we take in our work and our drive to advance ourselves, our clients and our industry.
                              </p>

                    </div>
               </div>

               <ScrollToTop />

               <div className={styles.aboutsection3}>
                    <h3><strong>Our Mission & Vision</strong></h3>
               </div>

               <div className={styles.visions}>
                    <div className={styles.vision}>
                         <div >
                              <img src={icon5} alt="mission" />
                              <h6> Mission </h6>
                         </div>
                         <div className={styles.card_content}>
                              <p>
                                   To lead in various avenues of software development by implementing novel ideas for project development thus delivering customized cost-effective solutions to its prospective and current clients.
                              </p>

                         </div>
                    </div>

                    <div className={styles.vision}>
                         <div >
                              <img src={icon6} alt="vision" />
                              <h6> Vision </h6>
                         </div>

                         <div className={styles.card_content}>
                              <p>
                                   To earn global admiration as a software testing & web development company, by building and maintaining a long lasting relationship with people and technology along with the fabrication of functional software and excellent services.
                              </p>

                         </div>
                    </div>
               </div>
               <div className={styles.section4}>
                    <span className={styles.content4}>
                         <h3>Our Leadership Team</h3>
                         <br />
                         <p>SofTesting was built on the principle that quality people lead to quality outcomes, and that starts with leadership.</p>
                         <p>Our management team reflects SofTesting&apos;s core values of quality, passion, collaboration and innovation. They are supported by highly experienced account directors and specialized technical champions that empower our clients to deliver quality quicker. </p>
                         <p>At SofTesting, we pride ourselves on the quality of our people. And quality starts with leadership. Our senior testing team are active members of the testing community, having founding and leading roles in key industry associations such as the ISTQB, ANZTB, UKITB, ASTQB, TMMi Foundation and many more.</p>
                         <br />
                         <p>We are a young, dynamic and multi-award-winning creative engineering company. Having a comfortable and stimulating work environment is really important to us, and our people are constantly working together to create something unique and exciting.</p>
                    </span>
                    <span className={styles.img4} style={{ backgroundImage: `url(${img4})` }}>

                    </span>
               </div>
               <div className={styles.section5}>
                    <span className={styles.content5}>
                         <h3>Who We Are?</h3>
                         <br />
                         <p>We are believers of change! A change driven by technology and innovation. We help businesses and individuals in adapting as well as adopting digital transformation. Our aim is to change people’s lives and improve businesses with our progressive and innovative technology solutions.</p>
                         <br /> <br /> <br />
                         <h3>What We Do? </h3>
                         <br />
                         <p>We start by listening to the issues, requirements, challenges and objectives. The process continues with an effort to understand the business, market sector and competitors to develop information which is combined with our technical knowledge, expertise and research in order to provide the best solution at the lowest cost.</p>


                    </span>
                    <span className={styles.img5} style={{ backgroundImage: `url(${img5})` }}>

                    </span>
               </div>

               <div className={styles.section6}>
                    <span className={styles.content6}>
                         <h3>How We Do It?</h3>
                         <br />
                         <h3>We take care of you at every step of our product development cycle</h3>
                         <br />
                         <p>There is no singular process that fits every challenge — there are no silver bullets. Organizations are different. People are different. Business challenges are different. And that shapes how we work.</p>
                         <p> Our product development cycle, We take care of you at every step</p>
                         <p>Estimation and planning for your business</p>
                         <p>Analysing and building architecture for scalability, maintenance and quality</p>
                         <p>Design and write the code, develop the product and bring it to life</p>
                         <p>High quality products</p>
                         <br />

                    </span>
                    <span className={styles.img6} style={{ backgroundImage: `url(${img6})` }}>

                    </span>
               </div>
               <div className={styles.section7}>
                    <span className={styles.content7}>
                         <h3>WE&apos;VE BEEN HONORED TO WORK WITH GREAT CLIENTS</h3>
                         <br />
                         <h3>Advice, Trust, Confidence, Partnership</h3>
                         <br />
                         <p>At SofTesting, we don&apos;t just talk about great products. We make them with our clients.</p>
                         <p>Together, we can create solutions that serve not just technology but the humans behind it.</p>
                         <p>An unwavering commitment to drive maximum customer satisfaction, infused with integrity and passion.</p>
                         <p>Latest infrastructure and flexible working hours along with many other privileges that inculcate healthy lifestyle choices.</p>
                         <br /> <br />
                    </span>
                    <span className={styles.img7} style={{ backgroundImage: `url(${img7})` }}>

                    </span>
               </div>

               <div className={styles.section8}>
                    <span className={styles.content8}>
                         <h3>Our History</h3>
                         <br />
                         <h3>SofTesting was founded in 2020</h3>
                         <br /> <br />
                         <p>After More than 20 years Experience in various software copmanies. We started with just 10 employees working passionately with a vision to grow. With utmost dedication, we bagged our first brand project within a month of our incorporation. </p>
                         <br />

                         <p>Set the grounds for success and unprecedented opportunities.</p>
                         <br /><br />
                    </span>
                    <span className={styles.img8} style={{ backgroundImage: `url(${img8})` }}>

                    </span>
               </div>

               <div className={styles.section9}>
                    <span className={styles.content9}>
                         <h3>Office Location</h3>
          
                         <span className={styles.spanflag}>
                              <img className={styles.flag} alt="canada flag" src={flag}></img>
                              <h6 className={styles.address}>Manitoba, Canada</h6>
                         </span>
                         <p>800-136 Market Ave, Winnipeg, MB R3B 0P4.</p>
                         <p>Office: +1 (204) 557-2334</p>
                         <p>hello@SofTestingca.com</p>

                         {/* <p>We are believers of change! A change driven by technology and innovation. We help businesses and individuals in adapting as well as adopting digital transformation. Our aim is to change people’s lives and improve businesses with our progressive and innovative technology solutions.</p> */}

                         <br /> <br /> <br />

                        
                    </span>
                    {/* <span className={styles.img9} style={{ backgroundImage: `url(${img9})` }}> */}
                    <span className={styles.img9}>

                    <Map />

                    </span>
               </div>

               <div id={styles.section10} className={styles.section10} style={{ backgroundImage: `url(${backimg5})` }}>
                    <ContactUs src="body" />
               </div>
               <section  className={styles.footer}>
                   <Footer/>
               </section>
          </div>


     );
}

export default AboutUs;

