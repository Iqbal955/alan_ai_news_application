import React, { useState, useEffect } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import NewsCards from './components/NewsCards/NewsCards'
import useStyles from './styles.js';
import wordsToNumbers from 'words-to-numbers';
const alanKey = "d1102e3ce737558a4c785f2221edb0e42e956eca572e1d8b807a3e2338fdd0dc/stage";


const App = () => {
    
  const [newsArticles, setNewsArticles] = useState([])
  const [activeArticle, setActiveArticle] = useState(-1);
    const classes = useStyles(); 
  useEffect(() => {
    alanBtn({
        key: alanKey,
        onCommand: ({command, articles, number}) => {
          if(command === "newHeadlines") {
              setNewsArticles(articles);

          }

          else if(command === "highlight") {
            setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);

          }

          else if(command === 'open' ) {

            const parsedNumber = number.length > 2 ? wordsToNumbers(number, {fuzzy: true}) : number;
            const article = articles[parsedNumber - 1];


            if(parsedNumber > 20) {

              alanBtn().playText("We do not have that many articles")
            }
            else if(article) {
            window.open(article.url, '_blank')
            alanBtn().playText('Opening, you betta show sum patience');
          }
        }
        }

    })

  }, [])

console.log(newsArticles)

  return(
    <div>
      <div className={classes.logoContainer}>
        <img src="https://thehappynewspaper.com/wp-content/themes/thehappynewspaper/assets/img/m_logo.png" className={classes.alanLogo} alt="logo"/>
      </div>
      <NewsCards articles={newsArticles} activeArticle={activeArticle}/>

    </div>
  )

}

export default App;