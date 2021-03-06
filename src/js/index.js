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
  const authButton = document.querySelector(".header__autorization-button");
  const popupCloseButton = document.querySelector(".popup__close");
  const popupWrapper = document.querySelector(".popup__wrapper");
  const preloader = document.querySelector(".preloader");
  const moreButton = document.querySelector(".articles__more-button");
  const searchFormInput = document.querySelector(".search-form__input");
  const cardListElement = document.querySelector(".articles__container");
  const popupBlock = document.querySelector(".popup");
  const searchFormElement = document.querySelector(".search-form");
  const mobileMenuButton = document.querySelector(
    ".header__mobile-menu-button"
  );

  // functions
  async function search(word) {
    CardList.clear();
    preloader.classList.add("preloader_visible");
    await Api.getNews(word).then((res) => {
      if (res.status == "ok") {
        CardList.renderList(res, word);
        Card._renderIcon(HeaderBlock.isLoggedIn);
      } else {
        cardListElement.textContent =
          "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.";
        cardListElement.classList.add("articles__container_with-error");
        document.querySelector(".articles").classList.add("articles_visible");
      }
    });
    preloader.classList.remove("preloader_visible");
  }

  function submitSigninFormHandler(event) {
    const data = {
      email: event.target.elements.email.value,
      password: event.target.elements.password.value,
    };
    event.preventDefault();
    BaseApi.signin(data).then((res) => {
      if (!res.error) {
        location.reload();
      } else {
        if (res.error == 401) {
          document.querySelector(".signin__form-error").textContent =
            "неверный пароль или почта";
        } else {
          document.querySelector(".signin__form-error").textContent =
            "Ошибка на сервере. Попробуйте повторить позже.";
        }
      }
    });
  }

  function submitSignupFormHandler(event) {
    event.preventDefault();
    const data = {
      email: event.target.elements.email.value,
      password: event.target.elements.password.value,
      name: event.target.elements.name.value,
    };
    BaseApi.signup(data).then((res) => {
      if (res.data) {
        PopupWindow.clearContent();
        PopupWindow.setContent({ contentType: "signup-successful" });
      } else {
        document.querySelector(".signup__form-error").textContent =
          "Ошибка регистрации";
      }
    });
  }

  function authButtonClickHandler(event) {
    PopupWindow.clearContent();
    if (!HeaderBlock.isLoggedIn) {
      PopupWindow.setContent({ contentType: "signin" });
      const signinFormElement = document.forms.signin;
      signinFormElement.addEventListener(
        "submit",
        submitSigninFormHandler.bind(event)
      );
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
  }

  //event listeners
  moreButton.addEventListener("click", () => {
    CardList.showMore();
  });

  authButton.addEventListener("click", authButtonClickHandler.bind(event));

  popupBlock.addEventListener("click", (event) => {
    if (event.target.classList.contains("popup__switch-color-text")) {
      // Логика переключателя форм в попапе - если сейчас форма signup или signup-successful - очисти попап, нарируй signin и повесь на него обработчик. В обратную сторону - аналогично.
      if (
        PopupWindow.content == "signup" ||
        PopupWindow.content == "signup-successful"
      ) {
        PopupWindow.clearContent();
        PopupWindow.setContent({ contentType: "signin" });
        const signinFormElement = document.forms.signin;
        signinFormElement.addEventListener(
          "submit",
          submitSigninFormHandler.bind(event)
        );
      } else {
        PopupWindow.clearContent();
        PopupWindow.setContent({ contentType: "signup" });
        const signupFormElement = document.forms.signup;
        signupFormElement.addEventListener(
          "submit",
          submitSignupFormHandler.bind(event)
        );
      }
    }
  });

  popupCloseButton.addEventListener("click", () => {
    PopupWindow.close();
  });

  popupWrapper.addEventListener("click", () => {
    PopupWindow.close();
  });

  searchFormElement.addEventListener("submit", (event) => {
    event.preventDefault();
    search(searchFormInput.value);
    searchForm._clear;
  });

  cardListElement.addEventListener("click", function addArticle(event) {
    if (event.target.classList.contains("article-card__add-to-collection")) {
      if (HeaderBlock.isLoggedIn) {
        if (
          !event.target.classList.contains(
            "article-card__add-to-collection_enabled"
          )
        ) {
          const ActiveArticleIndex = CardList.articles.findIndex(
            (item) =>
              item.title ==
              event.target.parentElement.parentElement.querySelector(
                ".article-card__title"
              ).textContent
          );
          BaseApi.createArticle(
            CardList.articles[ActiveArticleIndex],
            CardList.keyword
          ).then((res) => {
            CardList.articles[ActiveArticleIndex]._id = res.data._id;
            Card.renderIcon(HeaderBlock.isLoggedIn, event.target);
          });
        } else {
          BaseApi.removeArticle(
            CardList.articles.find(
              (item) =>
                item.title ==
                event.target.parentElement.parentElement.querySelector(
                  ".article-card__title"
                ).textContent
            )._id
          ).then(Card.renderIcon(HeaderBlock.isLoggedIn, event.target));
        }
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

  //functions call

  BaseApi.getMe().then((res) => {
    HeaderBlock.render(res, "main");
  });
})();
