export class NewsCard {
    constructor() {

    }

    create(props) {
      const {publishedAt, title, source, description, urlToImage, url} = props;

      const template =`
      <div class="article-card">
      <div class="article-card__image" style="background-image: url('${urlToImage}');">
          <button class="article-card__add-to-collection"></button>
      </div>
      <a href="${url}" target="_blank">
      <div class="article-card__text-container">
          <p class="article-card__date">${publishedAt}</p>
          <h3 class="article-card__title">${title}</h3>
          <p class="article-card__text">${description}</p>
          <p class="article-card__text-short">${description}</p>
        </div>
        </a>
      <p class="article-card__source">${source.name}</p>
  </div>`
  return template;
    }

    renderIcon(state) {
        const {isLoggedIn, isSaved} = state

        if(isLoggedIn) {
            if(isSaved) {
                
            }

        }

    }
}