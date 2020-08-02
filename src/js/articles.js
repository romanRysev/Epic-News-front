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
  const keywordBlock = document.querySelector(".saved-top__keywords");
  const mobileMenuButton = document.querySelector('.header__mobile-menu-button');

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
        if (res) {
          CardList.renderList(res);
          userName.textContent = HeaderBlock.userName;
          articlesCounter.textContent = res.data.length;
          //-------------- слова
          const keywords = res.data.map((item) => {
            return { keyword: item.keyword };
          });

          const keywordsRes = [];
          keywords.forEach((element) => {
            let i = keywordsRes.findIndex((item) => {
              return item.keyword == element.keyword;
            });

            if (i == -1) {
              let res = {};
              res.keyword = element.keyword;
              res.counter = 1;
              keywordsRes.push(res);
              return;
            } else {
              keywordsRes[i].counter++;
            }
          });

          const keywordElements = document.querySelectorAll(
            ".saved-top__keyword"
          );
          const keywordOthersElement = document.querySelector(
            ".saved-top__keyword-others"
          );

          if (keywordsRes.length > 3) {
            let maxElemFirst = { counter: 0, keyword: "" };
            let maxInd = 0;
            let maxElemSecond = { counter: 0, keyword: "" };

            keywordsRes.forEach((elem, ind) => {
              if (elem.counter >= maxElemFirst.counter) {
                maxElemFirst = elem;
                maxInd = ind;
              }
            });
            keywordsRes.splice(maxInd, 1);
            keywordsRes.forEach((elem, ind) => {
              if (elem.counter >= maxElemSecond.counter) {
                maxElemSecond = elem;
                maxInd = ind;
              }
            });

            keywordElements[0].textContent = maxElemFirst.keyword;
            keywordElements[1].textContent = maxElemSecond.keyword;

            keywordOthersElement.textContent = ` и ${
              keywordsRes.length - 1
            } другим`;
          } else {
            switch (keywordsRes.length) {
              case 0:
                keywordBlock.remove();
                break;
              case 1:
                keywordElements[0].textContent = keywordsRes[0].keyword;
                break;
              case 2:
                let maxElem = { counter: 0, keyword: "" };
                let maxInd = 0;

                keywordsRes.forEach((elem, ind) => {
                  if (elem.counter >= maxElem.counter) {
                    maxElem = elem;
                    maxInd = ind;
                  }
                });
                keywordsRes.splice(maxInd, 1);
                keywordElements[0].textContent = maxElem.keyword;
                keywordElements[1].textContent = keywordsRes[0].keyword;
                break;
              case 3:
                let maxElemFirst = { counter: 0, keyword: "" };
                maxInd = 0;
                let maxElemSecond = { counter: 0, keyword: "" };

                keywordsRes.forEach((elem, ind) => {
                  if (elem.counter >= maxElemFirst.counter) {
                    maxElemFirst = elem;
                    maxInd = ind;
                  }
                });
                keywordsRes.splice(maxInd, 1);
                keywordsRes.forEach((elem, ind) => {
                  if (elem.counter >= maxElemSecond.counter) {
                    maxElemSecond = elem;
                    maxInd = ind;
                  }
                });
                keywordsRes.splice(maxInd, 1);
                keywordElements[0].textContent = maxElemFirst.keyword;
                keywordElements[1].textContent = `${maxElemSecond.keyword}, `;

                keywordOthersElement.textContent = keywordsRes[0].keyword;

                break;
            }
          }

          //-----------------------
        } else {
          cardList.textContent =
            "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.";
          cardList.classList.add("articles__container_with-error");
          document.querySelector(".articles").classList.add("articles_visible");
        }
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

  mobileMenuButton.addEventListener("click", () => {
    document
      .querySelector(".header__right-side")
      .classList.toggle("header__right-side_mobile-menu-is-opened");
    document
      .querySelector(".header")
      .classList.toggle("header_theme_white");
    document
      .querySelector(".header")
      .classList.toggle("header_mobile-menu-is-opened");
  });
})();
