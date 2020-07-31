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
          <div class="article-card__tip">Войдите, чтобы сохранять статьи</div>
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
      const publishedAt = props.date;
      const title = props.title;
      const source = props.source;
      const description = props.text;
      const urlToImage = props.image;
      const url = props.link;
      const keyword = props.keyword;
      template = `
      <div class="article-card">
      <div class="article-card__image" style="background-image: url('${urlToImage}');">
          <div class="article-card__keyword">${keyword}</div>
          <button class="article-card__delete"></button>
          <div class="article-card__tip article-card__tip_showed">Убрать из сохранённых</div>
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
      //iconElement.parentNode.querySelector(".article-card__tip").textContent = "Войдите, чтобы сохранять статьи";
      //iconElement.parentNode.querySelector(".article-card__tip").classList.add('article-card__tip_showed');
    }
  }

  _renderIcon(isLoggedIn) {
    if (!isLoggedIn) {
      document.querySelectorAll(".article-card__tip").forEach(elem => {elem.classList.add('article-card__tip_showed')});
      //document.querySelectorAll(".article-card__tip").classList.add('article-card__tip_showed');
    }
  }
}
