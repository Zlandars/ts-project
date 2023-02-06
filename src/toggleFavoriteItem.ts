import {getFavoriteItems, getFavoritesAmount} from "./index.js";
import {renderUserBlock} from "./user.js";

export function toggleFavoriteItem(e:any):void {
    let likes = getFavoritesAmount();
    let favorites = getFavoriteItems();
    if (!favorites.includes(e.target.id)) {
        (<HTMLInputElement>e.target).classList.add('active');
        localStorage.setItem('favoriteItems',`${favorites.join()},${e.target.id}`)
        localStorage.setItem('favoritesAmount', `${++likes}`)
    } else {
        (<HTMLInputElement>e.target).classList.remove('active');
        favorites = favorites.filter(function(item:number) {
            return item !== e.target.id
        })
        localStorage.setItem('favoriteItems',`${favorites.join()}`)
        localStorage.setItem('favoritesAmount', `${--likes}`)
    }
    renderUserBlock()
}