import { NEWS_SERVER_URL, NEWS_API_TOKEN } from "../constants/constants";

export class NewsApi {
  constructor() {
    this.baseUrl = NEWS_SERVER_URL;
    this.ApiToken = NEWS_API_TOKEN;
    this.headers = {
    //  "Content-Type": "application/json",
    };
  }

  getNews(keyword) {
    const now = new Date();
    const sevenDaysBefore = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const date = () => {
      return (`${this.baseUrl}?q=${keyword}&from=${sevenDaysBefore.toISOString().slice(0, -1)}&to=${now.toISOString().slice(0, -1)}&language=ru&apiKey=${this.ApiToken}`)
    }

console.log(date())
    return fetch(
      date(),
      {
        method: "GET",
        headers: this.headers,
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        return err;
      });
  }
}
