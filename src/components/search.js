import react, { useContext, useState, useRef, useEffect } from "react";
import { Route, BrowserRouter, useHistory, Switch, Link, withRouter, useRouteMatch } from 'react-router-dom';
import articles from '../utils/articles';

import styles from '../styles/search.module.scss';

const Search = () => {
    const [foundArticle, setFoundArticle] = useState(articles);
    
    const doSearch =() =>{

    }

    return(
        <div className = {styles.container}>
          <input  className = {styles.search} type = "search" onChange = {doSearch} 
              placeholder = "Filter Article" />
        
       

         <div  className = {styles.searchResut}>
             {
             foundArticle && foundArticle.length > 0 ?
              
                  foundArticle.map((article) => (
                    <li> {article.articleName}  </li>

                  )
                  ) : (
                    <h3> No results found</h3>
                  )             
             }
     
         </div>
        </div>
    )
    }

 export default withRouter(Search);