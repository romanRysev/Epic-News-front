export async function search(word) {
  CardList.clear();
  preloader.classList.add("preloader_visible");
  await Api.getNews(word).then((res) => {
    if (res.status == "ok") {
      CardList.renderList(res, word);
      Card._renderIcon(HeaderBlock.isLoggedIn);
    } else {
      cardListElement.textContent =
        "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.";
      cardListElement.classList.add("articles__container_with-error");
      document.querySelector(".articles").classList.add("articles_visible");
    }
  });
  preloader.classList.remove("preloader_visible");
}