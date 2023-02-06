import {renderSearchResultsBlock} from "./search-results.js";
import {toggleFavoriteItem} from "./toggleFavoriteItem.js";
import {renderToast} from "./lib.js";
import {HomyProvider} from "./store/providers/homy/homy-provider.js";
import {SearchFilter} from "./store/domain/searchFilter.js";
import {Hotel} from "./store/domain/hotel.js";
import {SdkProvider} from "./store/providers/sdk/sdk-provider.js";

const sdk = new SdkProvider();
const homy = new HomyProvider();

export function sortByPrice(one: Hotel, two: Hotel):number {
    if (one.price > two.price) {
        return 1
    } else if (one.price < two.price) {
        return -1
    } else {
        return 0
    }
}
export function sortByHighPrice(one: Hotel, two: Hotel):number {
    if (one.price < two.price) {
        return 1
    } else if (one.price > two.price) {
        return -1
    } else {
        return 0
    }
}
export function sortByDistance(one: Hotel, two: Hotel):number {
    if (one.remoteness > two.remoteness) {
        return 1
    } else if (one.remoteness < two.remoteness) {
        return -1
    } else {
        return 0
    }
}
export default function search(arr:SearchFilter,func?:()=>{},sortOption:string = 'Сначала дорогие'):void {
    const mainTimeout = setTimeout(()=>{
        renderToast({type:'error', text:'Обновите страницу для актуализации броней!'}, { name: 'Обновить', handler: location.reload()})
        clearTimeout(mainTimeout)
    },300000)
    const filter: SearchFilter = {
        city: arr.city,
        coordinates: '59.9386,30.3141',
        checkInDate: arr.checkInDate,
        checkOutDate: arr.checkOutDate,
        maxPrice: arr.maxPrice
    }

    Promise.all([
        homy.find(filter),
        sdk.find(filter)
    ]).then(data => {
        let allResults: Hotel[] = [];
        allResults.concat(data[0], data[1]);
            switch (sortOption) {
                case 'Сначала дорогие':
                    renderSearchResultsBlock(allResults.sort(sortByHighPrice),sortOption);
                    break;
                case 'Сначала дешёвые':
                    renderSearchResultsBlock(allResults.sort(sortByPrice),sortOption);
                    break;
                default:
                    renderSearchResultsBlock(allResults.sort(sortByDistance),sortOption);
                    break;
            }
        if (func) {
            const timeOut = setTimeout(()=>{
                func();
                clearTimeout(timeOut);
            },1000)
        }
    })
        .then(()=>{
            const likes = document.querySelectorAll('.favorites');
            likes.forEach(item=>{
                item.addEventListener('click',(e)=>{
                    toggleFavoriteItem(e)
                })
            });
        })
    
    // fetch(`http://localhost:3030/places?coordinates=59.9386,30.3141&checkInDate=${arr.checkInDate}&checkOutDate=${arr.checkOutDate}&maxPrice=${Number(arr.priceLimit)}`)
    //     .then(data=>data.json())
    //     .then(data=> {
    //         if (data.length === 0)
    //             return renderEmptyOrErrorSearchBlock('Результаты отсутствуют')
    //         // @ts-ignore
    //         sdk.search(arr).then(i=> {
    //             data.push(i)
    //         }).then(()=>{
    //             renderSearchResultsBlock(data.flat())
    //         })
    //             .then(()=>{
    //                 const likes = document.querySelectorAll('.favorites');
    //                 likes.forEach(item=>{
    //                     item.addEventListener('click',(e)=>{
    //                         toggleFavoriteItem(e)
    //                     })
    //                 })
    //                 const booking = document.querySelectorAll('li.result');
    //                 booking.forEach(i=>{
    //                     i.addEventListener('click',(e)=>{
    //                         // @ts-ignore
    //                         if(typeof +e.target.id === 'string'){
    //                             // @ts-ignore
    //                             sdk.book(e.target.id,arr.checkInDate,arr.checkOutDate).then(data=>renderToast(`Ваш регистрационный номер ${data}`)).catch(err=>console.log(err))
    //                             return;
    //                         }
    //                         // @ts-ignore
    //                         fetch(`http://localhost:3030/places/${e.target.id}?checkInDate=${arr.checkInDate}&checkOutDate=${arr.checkOutDate}`)
    //                             .then(data=>data.json())
    //                             .then(data=> {
    //                                 clearTimeout(mainTimeout)
    //                                 renderToast({type: 'success', text: `Отель ${data.name} забронирован!`})
    //                             })
    //                             .catch(err=>console.log(err))
    //                     })
    //                 })
    //             })
    //     })
    //     .catch(err => renderEmptyOrErrorSearchBlock(err))
    
}
