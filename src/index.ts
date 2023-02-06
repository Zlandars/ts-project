import { renderSearchFormBlock } from './search-form.js'
import { renderSearchStubBlock } from './search-results.js'
import { renderUserBlock } from './user.js'
import { renderToast } from './lib.js'
import search from "./search.js";

export function getFavoritesAmount():number {
  if (localStorage.getItem('favoritesAmount')==null) {
    localStorage.setItem('favoritesAmount','0');
    return 0;
  }
  return Number(localStorage.getItem('favoritesAmount'));
}
export function getFavoriteItems():any {
  let locStore =localStorage.getItem('favoriteItems');
  if (locStore==null) {
    return localStorage.setItem('favoriteItems','');
  }
  return locStore.split(',');
}
window.addEventListener('DOMContentLoaded', () => {
  renderUserBlock()
  renderSearchFormBlock()
  renderSearchStubBlock()
  renderToast(
    {text: 'Это пример уведомления. Используйте его при необходимости', type: 'success'},
    {name: 'Понял', handler: () => {console.log('Уведомление закрыто')}}
  )
  const form = document.querySelector('form');
  function dateTransform(value:string):[number,Date] {
    const date = new Date(value);
    return [date.getTime(),date];
  }
  if (form) {
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      const city:string = (<HTMLInputElement>document.querySelector('#city')).value;
      const arrival = dateTransform((<HTMLInputElement>document.querySelector('#check-in-date')).value);
      const depart = dateTransform((<HTMLInputElement>document.querySelector('#check-out-date')).value);
      const maxPrice = Number((<HTMLInputElement>document.querySelector('#max-price')).value);
      search({city: city,checkInDate: arrival,checkOutDate: depart,maxPrice: maxPrice});
    })
  }
  return console.log('47str, index.ts');
})



