import { newsServerUrl, newsApiToken } from "../constants/constants";

export class NewsApi {
  constructor() {
    (this.baseUrl = newsServerUrl), (this.ApiToken = newsApiToken);
    this.headers = {
      "Content-Type": "application/json",
    };
  }

  getNews(keyword) {
    const now = new Date();
    const sevenDaysBefore = new Date(now.getTime()-7*24*60*60*1000);
    return fetch(`${this.baseUrl}?q=${keyword}&from=${sevenDaysBefore.getFullYear}-${sevenDaysBefore.getMonth}-${sevenDaysBefore.getDay}&to=${now.getFullYear}-${now.getMonth}-${now.getDay}&language=ru&apiKey=${this.ApiToken}`, {
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
