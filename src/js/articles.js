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

BaseApi.getMe().then((res) => {HeaderBlock.render(res, 'articles');
});

async function a() {
  await BaseApi.getArticles().then((res) => {CardList.renderList(res);
  });
}

a();

})();