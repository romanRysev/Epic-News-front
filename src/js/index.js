import "../styles/main/index.css";
import { MainApi } from "./api/MainApi.js";
import { NewsApi } from "./api/NewsApi.js";
import { Header } from "./components/Header";
import { Popup } from "./components/Popup";
import { NewsCard } from "./components/NewsCard";
import { NewsCardList } from "./components/NewsCardList";
import { Form } from "./components/Form";

(function () {
  const Api = new NewsApi();
  const HeaderBlock = new Header();
  const PopupWindow = new Popup();
  const Card = new NewsCard("main");
  const CardList = new NewsCardList(Card);
  const BaseApi = new MainApi();
  const searchForm = new Form(document.querySelector(".search-form"));

  const authButton = document.querySelector(".header__autorization-button");
  const popupCloseButton = document.querySelector(".popup__close");
  const preloader = document.querySelector(".preloader");
  const moreButton = document.querySelector(".articles__more-button");
  const searchFormInput = document.querySelector(".search-form__input");
  const cardList = document.querySelector(".articles__container");
  const popupBlock = document.querySelector(".popup");

  async function a(word) {
    preloader.classList.add("preloader_visible");
    await Api.getNews(word).then((res) => {
      CardList.renderList(res, word);
    });
    preloader.classList.remove("preloader_visible");
  }

  BaseApi.getMe().then((res) => {
    HeaderBlock.render(res, "main");
  });

  moreButton.addEventListener("click", () => {
    CardList.showMore();
  });

  authButton.addEventListener("click", () => {
    PopupWindow.clearContent();
    if (!HeaderBlock.isLoggedIn) {
      PopupWindow.setContent({ contentType: "signin" });
      const signinFormElement = document.forms.signin;
      const email = signinFormElement.elements.email;
      const password = signinFormElement.elements.password;
      const signinForm = new Form(signinFormElement);
      signinFormElement.addEventListener("submit", (event) => {
        event.preventDefault();
        const data = { email: email.value, password: password.value };
        BaseApi.signin(data).then((res) => {
          BaseApi.getMe().then((res) => {
            HeaderBlock.render(res, "main");
          });
        });
        signinForm._clear();
        PopupWindow.close();
      });
      PopupWindow.open();
    }
    if (HeaderBlock.isLoggedIn) {
      BaseApi.signin({
        email: "logout@logout.ru",
        password: "logoutlogout",
        mode: "logout",
      }).then((res) => {
        location.reload();
      });
    }
  });

  popupBlock.addEventListener("click", (event) => {
    if (event.target.classList.contains("popup__switch-color-text")) {
      if (PopupWindow.content == "signup") {
        PopupWindow.clearContent();
        PopupWindow.setContent({ contentType: "signin" });
      } else {
        console.log(2);
        PopupWindow.clearContent();
        PopupWindow.setContent({ contentType: "signup" });
      }
    }
  });

  popupCloseButton.addEventListener("click", () => {
    PopupWindow.close();
  });

  searchForm.form.addEventListener("submit", (event) => {
    event.preventDefault();
    a(searchFormInput.value);
    searchForm._clear;
  });

  cardList.addEventListener("click", (event) => {
    if (event.target.classList.contains("article-card__add-to-collection")) {
      BaseApi.createArticle(
        CardList.articles.find(
          (item) =>
            item.title ==
            event.target.parentElement.parentElement.querySelector(
              ".article-card__title"
            ).textContent
        ),
        CardList.keyword
      ).then(Card.renderIcon(HeaderBlock.isLoggedIn, event.target));
    }
  });
  //BaseApi.signup();
  //  BaseApi.signin();
  //BaseApi.getArticles();
  //BaseApi.createArticle();
  //BaseApi.removeArticle('5f1c4ceb21d0ce63f04d0f83');
})();
