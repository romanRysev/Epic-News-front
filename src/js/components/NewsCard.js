export class NewsCard {
  constructor(page) {
    this.page = page;
  }

  create(props) {
    let template = "";
    if (this.page == "main") {
      const {
        publishedAt,
        title,
        source,
        description,
        urlToImage,
        url,
      } = props;
      template = `
      <div class="article-card">
      <div class="article-card__image" style="background-image: url('${urlToImage}');">
          <button class="article-card__add-to-collection"></button>
          <div class="article-card__tip"></div>
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
  </div>`;
    } else {
      console.log(props);

      const publishedAt = props.date;
      const title = props.title;
      const source = props.source;
      const description = props.text;
      const urlToImage = props.image;
      const url = props.link;
      template = `
      <div class="article-card">
      <div class="article-card__image" style="background-image: url('${urlToImage}');">
          <button class="article-card__add-to-collection"></button>
          <div class="article-card__tip"></div>
      </div>
      <a href="${url}" target="_blank">
      <div class="article-card__text-container">
          <p class="article-card__date">${publishedAt}</p>
          <h3 class="article-card__title">${title}</h3>
          <p class="article-card__text">${description}</p>
          <p class="article-card__text-short">${description}</p>
        </div>
        </a>
      <p class="article-card__source">${source}</p>
  </div>`;
    }

    return template;
  }

  renderIcon(isLoggedIn, iconElement) {
    if (isLoggedIn) {
      iconElement.classList.toggle("article-card__add-to-collection_enabled");
    } else {
      iconElement.nextSibling.textContent = "Войдите, чтобы сохранять статьи";
    }
  }
}
