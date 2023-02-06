import { renderBlock } from './lib.js'
import {Hotel} from "./store/domain/hotel";

export function renderSearchStubBlock () {
  renderBlock(
    'search-results-block',
    `
    <div class="before-results-block">
      <img src="img/start-search.png" />
      <p>Чтобы начать поиск, заполните форму и&nbsp;нажмите "Найти"</p>
    </div>
    `
  )
}

export function renderEmptyOrErrorSearchBlock (reasonMessage:string):void {
  renderBlock(
    'search-results-block',
    `
    <div class="no-results-block">
      <img src="img/no-results.png" />
      <p>${reasonMessage}</p>
    </div>
    `
  )
}
export function renderSearchResultsBlock (object:Hotel[], sortOption:string) {
    renderBlock(
    'search-results-block',
    `
    <ul class="results-list">
      ${object.map(item=>{
          return `
        <li class="result">
        <div class="result-container">
          <div class="result-img-container">
            <div class="favorites" id="${item.origId}"></div>
            <img class="result-img" src="${item.image}" alt="">
          </div>	
          <div class="result-info">
            <div class="result-info--header">
              <p>${item.name}</p>
              <p class="price">${item.price}&#8381;</p>
            </div>
            <div class="result-info--map"><i class="map-icon"></i> ${typeof item.remoteness != 'string' ? item.remoteness : '0'} км от вас</div>
            <div class="result-info--descr">
                ${item.description}
            </div>
            <div class="result-info--footer">
              <div>
                <button class="booking" id="${item.origId}">Забронировать</button>
              </div>
            </div>
          </div>
        </div>
      </li>
      `
    })}
    </ul>
    `
  );
    let filter = <HTMLInputElement>document.querySelector('.search-results-filter select');
    if(filter) {
        filter.value = sortOption;
        filter.addEventListener('change', ()=>{
            //  Не получилось. Если кто-то это посмотрит, то исправьте и объясните
            // search(object,()=>{},sortOption)
        })
    }
}
