import { ELEMENTS_PER_LINE } from "../constants/constants";

export class NewsCardList {
  constructor(cardInstance) {
    this.element = document.querySelector(".articles__container");
    this.notFound = document.querySelector(".articles-not-found");
    this.moreButton = document.querySelector(".articles__more-button");
    this.cardInstance = cardInstance;
    this.elemsPerPage = 0;
    this.articles = [];
    this.keyword = "";
  }

  renderList(data, keyword) {
    document.querySelector(".articles").classList.add("articles_visible");
    if (data.articles) {
      if (data.articles.length == 0) {
        document
          .querySelector(".articles__title")
          .classList.remove("articles__title_visible");
        this.notFound.classList.add("articles-not-found_visible");
        this.moreButton.classList.remove("articles__more-button_visible");
      } else {
        document
          .querySelector(".articles__title")
          .classList.add("articles__title_visible");
        this.articles = data.articles;
        this.keyword = keyword;
        this.notFound.classList.remove("articles-not-found_visible");
        for (const elem of this.articles) {
          this.addCard(elem);
        }

        this.showMore();
      }
    } else {
      this.articles = data.data;
      for (const elem of this.articles) {
        this.addCard(elem);
      }
      for (let i = 0; i < this.articles.length; i++) {
        this.element.children[i].classList.add("article-card_visible");
      }
    }
  }

  addCard(card) {
    this.element.insertAdjacentHTML(
      "beforeend",
      this.cardInstance.create(card)
    );
  }

  clear() {
    const a = this.element.children.length;
    for (let i = 0; i < a; i++) {
      this.element.removeChild(this.element.children[0]);
    }
    this.elemsPerPage = 0;
    this.articles = [];
    this.keyword = "";
  }

  showMore() {
    this.moreButton.classList.add("articles__more-button_visible");
    for (let i = this.elemsPerPage; i < this.elemsPerPage + ELEMENTS_PER_LINE; i++) {
      if (i < this.element.children.length) {
        this.element.children[i].classList.add("article-card_visible");
        if (i == this.element.children.length - 1) {
          this.moreButton.classList.remove("articles__more-button_visible");
        }
      } else {
        this.moreButton.classList.remove("articles__more-button_visible");
      }
    }
    this.elemsPerPage += ELEMENTS_PER_LINE;
  }
}
