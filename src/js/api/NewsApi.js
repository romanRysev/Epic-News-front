import { newsServerUrl, newsApiToken } from "../constants/constants";

export class NewsApi {
  constructor() {
    (this.baseUrl = newsServerUrl), (this.ApiToken = newsApiToken);
    this.headers = {
      "Content-Type": "application/json",
    };
  }

  getNews(keyword) {
    return fetch(`${this.baseUrl}?q=${keyword}&apiKey=${this.ApiToken}`, {
      method: "GET",
      headers: this.headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
