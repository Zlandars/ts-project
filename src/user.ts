import { renderBlock } from './lib.js'

export function renderUserBlock (userName:string = 'Wade Warren', profileLink?:string,favoriteItemsAmount?:number) {
  const favoritesCaption = favoriteItemsAmount < 1 ? 'ничего нет' : favoriteItemsAmount
  const hasFavoriteItems = favoritesCaption !== 'ничего нет' ? true : false

  renderBlock(
    'user-block',
    `
    <div class="header-container">
      <img class="avatar" src="/img/avatar.png" alt="Wade Warren" />
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
