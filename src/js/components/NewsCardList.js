export class NewsCardList {
    constructor(cardInstance) {
        this.element = document.querySelector('.articles__container');
        this.cardInstance = cardInstance;
        this.elemsPerPage = 3;
        this.articles = [];
    }

    setArticles(data) {
        this.articles = data.articles;
    }

    addCard(card) {
        this.element.insertAdjacentHTML('beforeend', (this.cardInstance.create(card)));
    }

    renderList() {
        console.log(this.articles);
        console.log(this.elemsPerPage);
        const cardsPerPage = this.articles.slice(this.elemsPerPage-3, this.elemsPerPage)
        for (const elem of cardsPerPage) {
            this.addCard(elem);
          }
          this.elemsPerPage += 3;
    }
}