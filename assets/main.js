const APIKEY = "b49d67a78fb04e0b927c43baa1801e78";
const changeLanguageField = document.getElementById("changeLanguage");
const searchField = document.getElementById("searchField");
let searchWord = "";
const articleSection = document.querySelector("section");
let articleCategory = "general";

const wildcardImg = "./assets/img/nijwam-swargiary-FPNnKfjcbNU-unsplash.jpg";

let country = changeLanguageField.value;
let url = "";

const currentDateField = document.getElementById("currentDate");

const GetNewURL = () => {
    url = 'https://newsapi.org/v2/top-headlines?' +
         'q='+searchWord+'&' +
         'country='+country+"&" +
         'category='+articleCategory+'&'+
     //     'from=2023-05-30&' +
     //     'sortBy=popularity&' +
          'apiKey='+APIKEY;
}

const GetNewData = () => {
    event.preventDefault();
    searchWord = searchField.value;
    GetNewURL();
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
       // console.log(data.articles[0]);
       let allArticles = data.articles;
       for(let i = 0; i < allArticles.length; i++){
         console.log(allArticles[i]);
            let newArticle = document.createElement("article");
            let newTitle = document.createElement("h4");
            let newDescription = document.createElement("p");
            let newImage = document.createElement("img");
            let newLink = document.createElement("a");
        
            newTitle.textContent = allArticles[i].title;
            newDescription.textContent = allArticles[i].description;

            if(allArticles[i].urlToImage != null){
                newArticle.style.backgroundImage = "url("+allArticles[i].urlToImage+")";
     //        newImage.setAttribute("src",allArticles[i].urlToImage);
            }else {
                newArticle.style.backgroundImage = "url("+wildcardImg+")";
        //        newImage.setAttribute("src",wildcardImg);
            }

            newLink.setAttribute("href", allArticles[i].url)
            newLink.textContent ="LINK TO ARTICLE";

            newArticle.appendChild(newImage);
            newArticle.appendChild(newTitle);
            newArticle.appendChild(newDescription);
            newArticle.appendChild(newLink);
            articleSection.appendChild(newArticle);
        }
    })  
}
  

const ChangeLanguage = () => {
    event.preventDefault();
    country = changeLanguageField.value;
    articleSection.innerHTML = "";
    GetNewData();
}

const ChangeCategory = (string) => {
    event.preventDefault();
    articleCategory = string;
    articleSection.innerHTML = "";
    GetNewData();
}

const currentDate = new Date().toISOString().split("T"[0])[0];
currentDateField.textContent = currentDate;


