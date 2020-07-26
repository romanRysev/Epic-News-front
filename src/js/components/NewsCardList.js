export class NewsCardList {
  constructor(cardInstance) {
    this.element = document.querySelector(".articles__container");
    this.cardInstance = cardInstance;
    this.elemsPerPage = 3;
    this.articles = [];
  }

  renderList(data) {
    this.articles = data.articles;
    for (const elem of this.articles) {
      this.addCard(elem);
    }

    for (let i = 0; i < 3; i++) {
      this.element.children[i].classList.add('article-card_visible');
    }
  }

  addCard(card) {
    this.element.insertAdjacentHTML(
      "beforeend",
      this.cardInstance.create(card)
    );
  }

  showMore() {
    for (let i = this.elemsPerPage; i <= this.elemsPerPage+3; i++) {
      if(i<=this.element.children.length) {
      this.element.children[i-1].classList.add('article-card_visible');
      };
    }
    this.elemsPerPage += 3;
  }

}
