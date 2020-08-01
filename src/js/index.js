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
  const searchForm = new Form();
  const signinForm = new Form();
  const signupForm = new Form();
  const authButton = document.querySelector(".header__autorization-button");
  const popupCloseButton = document.querySelector(".popup__close");
  const preloader = document.querySelector(".preloader");
  const moreButton = document.querySelector(".articles__more-button");
  const searchFormInput = document.querySelector(".search-form__input");
  const cardList = document.querySelector(".articles__container");
  const popupBlock = document.querySelector(".popup");
  const searchFormElement = document.querySelector(".search-form");
  const mobileMenuButton = document.querySelector(
    ".header__mobile-menu-button"
  );

  async function a(word) {
    CardList.clear();
    preloader.classList.add("preloader_visible");
    await Api.getNews(word).then((res) => {
      CardList.renderList(res, word);
      Card._renderIcon(HeaderBlock.isLoggedIn);
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
      signinFormElement.addEventListener("submit", (event) => {
        event.preventDefault();
        const data = { email: email.value, password: password.value };
        BaseApi.signin(data).then((res) => {
          location.reload();
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
      if (
        PopupWindow.content == "signup" ||
        PopupWindow.content == "signup-successful"
      ) {
        PopupWindow.clearContent();
        PopupWindow.setContent({ contentType: "signin" });
        const signinFormElement = document.forms.signin;
        const email = signinFormElement.elements.email;
        const password = signinFormElement.elements.password;
        signinFormElement.addEventListener("submit", (event) => {
          event.preventDefault();
          const data = { email: email.value, password: password.value };
          BaseApi.signin(data).then((res) => {
            location.reload();
          });
          signinForm._clear();
          PopupWindow.close();
        });
      } else {
        PopupWindow.clearContent();
        PopupWindow.setContent({ contentType: "signup" });
        const signupFormElement = document.forms.signup;
        const email = signupFormElement.elements.email;
        const password = signupFormElement.elements.password;
        const name = signupFormElement.elements.name;
        signupFormElement.addEventListener("submit", (event) => {
          event.preventDefault();
          const data = {
            email: email.value,
            password: password.value,
            name: name.value,
          };
          BaseApi.signup(data).then((res) => {
            PopupWindow.clearContent();
            PopupWindow.setContent({ contentType: "signup-successful" });
          });
        });
      }
    }
  });

  popupCloseButton.addEventListener("click", () => {
    PopupWindow.close();
  });

  searchFormElement.addEventListener("submit", (event) => {
    event.preventDefault();
    a(searchFormInput.value);
    searchForm._clear;
  });

  cardList.addEventListener("click", (event) => {
    if (event.target.classList.contains("article-card__add-to-collection")) {
      if (HeaderBlock.isLoggedIn) {
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
      } else {
        Card.renderIcon(HeaderBlock.isLoggedIn, event.target);
      }
    }
  });

  popupBlock.addEventListener("input", (event) => {
    const errorElement = event.target.nextElementSibling;
    signinForm.setSubmitButtonState(
      signinForm.checkInputValidity(event, errorElement),
      event
    );
  });

  mobileMenuButton.addEventListener("click", () => {
    document
      .querySelector(".header__right-side")
      .classList.toggle("header__right-side_mobile-menu-is-opened");
    document
      .querySelector(".top-section")
      .classList.toggle("top-section_mobile-menu-is-opened");
    document
      .querySelector(".header")
      .classList.toggle("header_mobile-menu-is-opened");
  });

  //BaseApi.signup();
  //  BaseApi.signin();
  //BaseApi.getArticles();
  //BaseApi.createArticle();
  //BaseApi.removeArticle('5f1c4ceb21d0ce63f04d0f83');
})();
