import "../styles/articles/index.css";
import { MainApi } from "./api/MainApi.js";
import { Header } from "./components/Header";
import { NewsCard } from "./components/NewsCard";
import { NewsCardList } from "./components/NewsCardList";

(function () {
  const HeaderBlock = new Header();
  const Card = new NewsCard("articles");
  const CardList = new NewsCardList(Card);
  const BaseApi = new MainApi();

  const userName = document.querySelector(".saved-top__username");
  const articlesCounter = document.querySelector(".saved-top__counter-value");
  const cardList = document.querySelector(".articles__container");
  const logoutButton = document.querySelector(".header__autorization-button");

  cardList.addEventListener("click", (event) => {
    if (event.target.classList.contains("article-card__delete")) {
      BaseApi.removeArticle(
        CardList.articles.find(
          (item) =>
            item.title ==
            event.target.parentElement.parentElement.querySelector(
              ".article-card__title"
            ).textContent
        )._id
      ).then((res) => {
        location.reload();
      });
    }
  });

  BaseApi.getMe()
    .then((res) => {
      HeaderBlock.render(res, "articles");
      if (!HeaderBlock.isLoggedIn) {
        window.location.href = "index.html";
      }
    })
    .then((res) => {
      BaseApi.getArticles().then((res) => {
        CardList.renderList(res);
        userName.textContent = HeaderBlock.userName;
        articlesCounter.textContent = res.data.length;

        const keywords = res.data.map((item) => {
          return { keyword: item.keyword };
        });
        const keywordsRes = {};
        keywords.forEach((element) => {
          if (!(element.keyword in keywordsRes)) {
            keywordsRes[element.keyword] = 1;
          } else {
            keywordsRes[element.keyword] = keywordsRes[element.keyword] + 1;
          }
        });
        let maxElemFirst = 0;
        let maxElemSecond = 0;
        const res1 = {};
        for (const elem in keywordsRes) {
          if (keywordsRes[elem] >= maxElemFirst) {
            maxElemFirst = keywordsRes[elem];
          }
        }
        console.log(maxElemFirst);
        console.log(keywordsRes);
      });
    });

  logoutButton.addEventListener("click", () => {
    BaseApi.signin({
      email: "logout@logout.ru",
      password: "logoutlogout",
      mode: "logout",
    }).then((res) => {
      window.location.href = "index.html";
    });
  });
})();
