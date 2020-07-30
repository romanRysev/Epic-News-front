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

  BaseApi.getMe().then((res) => {
    HeaderBlock.render(res, "articles");
  });

  BaseApi.getArticles().then((res) => {
    if (!HeaderBlock.isLoggedIn) {
      window.location.href = "index.html";
    }
    CardList.renderList(res);
    userName.textContent = HeaderBlock.userName;
    articlesCounter.textContent = res.data.length;
  });
})();
