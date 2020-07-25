import '../styles/main/index.css';
import {MainApi} from './api/MainApi.js'
import {NewsApi} from './api/NewsApi.js'
import {Header} from './components/Header'
import {Popup} from './components/Popup'
import {NewsCard} from './components/NewsCard'
import {NewsCardList} from './components/NewsCardList'
import {Form} from './components/Form'

(function () {
const Api = new NewsApi();
const HeaderBlock = new Header();
const PopupWindow = new Popup();
const Card = new NewsCard();
const CardList = new NewsCardList(Card);
const BaseApi = new MainApi();

const authButton = document.querySelector('.header__autorization-button');
const popupCloseButton = document.querySelector('.popup__close');
const preloader = document.querySelector('.preloader');
const moreButton = document.querySelector('.articles__more-button');
const searchForm = new Form (document.querySelector('.search-form'));
const searchFormInput = document.querySelector('.search-form__input');

HeaderBlock.render({ isLoggedIn: true, userName: 'Roman' });


async function a(word) {
    preloader.classList.add('preloader_visible');
await Api.getNews(word).then((res) => {CardList.setArticles(res);CardList.renderList();});
    preloader.classList.remove('preloader_visible');
}

moreButton.addEventListener('click', () => {CardList.renderList()})
authButton.addEventListener('click', () => {PopupWindow.clearContent(); PopupWindow.setContent({contentType: 'signup-successful'}); PopupWindow.open()})
popupCloseButton.addEventListener('click', () => {PopupWindow.close()})

searchForm.form.addEventListener('submit', (event) => {
  event.preventDefault();
  a(searchFormInput.value);
  searchForm._clear;
});

//BaseApi.signup();

//BaseApi.signin();
//BaseApi.getMe();
//BaseApi.getArticles();
//BaseApi.createArticle();
//BaseApi.removeArticle('5f1c4ceb21d0ce63f04d0f83');
}) ()