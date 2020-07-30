export class NewsCardList {
  constructor(cardInstance) {
    this.element = document.querySelector(".articles__container");
    this.notFound = document.querySelector(".articles-not-found");
    this.moreButton = document.querySelector(".articles__more-button");
    this.cardInstance = cardInstance;
    this.elemsPerPage = 3;
    this.articles = [];
    this.keyword = "";
  }

  renderList(data, keyword) {
    if (data.articles) {
      if(data.articles.length ==0) {      this.clear();
        this.notFound.classList.add("articles-not-found_visible");} else {
        this.articles = data.articles;
        this.keyword = keyword;
        for (const elem of this.articles) {
          this.addCard(elem);
        }

        for (let i = 0; i < 3; i++) {
          this.element.children[i].classList.add("article-card_visible");
        }

        this.moreButton.classList.add('articles__more-button_visible');}

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
    for (let i =0; i<a; i++) {
    this.element.removeChild(this.element.children[0]);
    }
    this.elemsPerPage = 3;
    this.articles = [];
    this.keyword = "";
  }

  showMore() {
    for (let i = this.elemsPerPage; i <= this.elemsPerPage + 3; i++) {
      if (i <= this.element.children.length) {
        this.element.children[i - 1].classList.add("article-card_visible");
      }
    }
    this.elemsPerPage += 3;
  }
}
