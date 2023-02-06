import { renderBlock } from './lib.js'
import {getFavoritesAmount} from './index.js'

export function renderUserBlock (userName:string = 'Eugen', profileLink:string = '/') {
  const likes = getFavoritesAmount();
  // @ts-ignore
  const favoritesCaption = likes == 0 ? 'ничего нет' : likes;
  const hasFavoriteItems = favoritesCaption !== 'ничего нет' ? true : false
  const userAva = "/img/avatar.png";
  localStorage.setItem('user',`{username: "${userName}", avatarUrl: "${userAva}"}`)
  // @ts-ignore
  renderBlock(
    'user-block',
    `
    <div class="header-container">
      <img class="avatar" src=${userAva} alt="Wade Warren" />
      <div class="info">
          <a class="name" href='${profileLink ? profileLink : ''}'>${userName}</a>
          <p class="fav">
            <i class="heart-icon${hasFavoriteItems ? ' active' : ''}"></i>${favoritesCaption}
          </p>
      </div>
    </div>
    `
  )
}
