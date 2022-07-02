import react, {  useState,  useContext } from "react";
import { Route, BrowserRouter, useHistory, Switch, Link, withRouter, useRouteMatch } from 'react-router-dom';
///import articles from '../utils/articles';

import styles from '../styles/search.module.scss';
import img from "../assets/background/2.jpg";
import searchIcon from "../assets/Icon/search1.png";
import { VisibilityContext } from '../contexts/visibilityContext';
import { NavContext } from '../contexts/navContext';

const Search = () => {
   

    const articles =[
      {
        "id":1,
        "articleName":"Scale your testing capacity",
        "path":"/src/blog/testArticle1"
      },
      {
          "id":2,
          "articleName":"Increase product quality",
          "path":"/src/blog/testArticle2"
      },
      {
          "id":3,
          "articleName":"Achieve faster time-to-market",
          "path":"/src/blog/testArticle3"
      },
      {
          "id":4,
          "articleName":"Save costs and launch quickly",
          "path":"/src/blog/developArticle4"
      },
      {
          "id":5,
          "articleName":"Full control over development",
          "path":"/src/blog/developArticle5"
      },
      {
          "id":6,
          "articleName":"Support after launch",
          "path":"/src/blog/developArticle6"
      },
      {
          "id":7,
          "articleName":"Mobile Applications Testing" ,
          "path":"/src/blog/testArticle4"
      },
      {
          "id":8,
          "articleName":"Desktop Testing",
          "path":"/src/blog/testArticle6"
      },
      {
          "id":9,
          "articleName":"Web Applications Testing",
          "path":"/src/blog/testArticle5"
      },
      {
          "id":10,
          "articleName":"Manual Testing",
          "path":"/src/blog/testArticle7"
      },
      {
          "id":11,
          "articleName":"Automated Testing",
          "path":"/src/blog/testArticle8"
      },
      {
          "id":12,
          "articleName":"Web Security Testing",
          "path":"/src/blog/testArticle9"
      },
      {
          "id":13,
          "articleName":"Web Applications Testing",
          "path":"/src/blog/testArticle5"
      },
      {
          "id":14,
          "articleName":"Mobile App Development",
          "path":"/src/blog/developArticle1"
      },
      {
          "id":15,
          "articleName":"Web Design & Development",
          "path":"/src/blog/developArticle2"
      },
      {
          "id":16,
          "articleName":"Database Development",
          "path":"/src/blog/developArticle3"
      }
  
  ]

  const [foundArticles, setFoundArticles] = useState(articles);
  const [articleName, setArticleName] = useState('');
  const { setBlogShow,  setFormsHide } = useContext(VisibilityContext);
  const { setOffMenu } = useContext(NavContext);
  document.title= 'SofTesting | Search Articles ';

  const handleBlogShow=()=>{
    setBlogShow();
   }

    const doSearch =(e) =>{
       const keyword = e.target.value;

       if (keyword !==''){

        const results = articles.filter((article) =>{
          return article.articleName.toLowerCase().includes(keyword.toLowerCase());
        });

        setFoundArticles(results);

       } else{
        setFoundArticles(articles);
       }

       setArticleName(keyword);
    }

    return(
        <div className = {styles.container}  style={{ backgroundImage: `url(${img})` }} onClick={setFormsHide } onMouseEnter={setOffMenu}>    
          <input  className = {styles.searchInput} type = "text" onChange = {(e)=>doSearch(e)} 
               placeholder = "Filter Article" style={{backgroundImage: `url(${searchIcon})`}} />  
        
     
         <div  className = {styles.searchResut}>
             {
             foundArticles && foundArticles.length > 0 ?
              
                  foundArticles.map((article) => (
                    <li key={article.id} className = {styles.article}>
                      <Link to={`${article.path}`}  className = {styles.articleName}  target="_blank" onClick={handleBlogShow}>
                       {article.articleName} 
                       </Link>
                    </li>

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