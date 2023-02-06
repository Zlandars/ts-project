import { renderSearchResultsBlock } from "./search-results.js";
import { toggleFavoriteItem } from "./toggleFavoriteItem.js";
import { renderToast } from "./lib.js";
import { HomyProvider } from "./store/providers/homy/homy-provider.js";
import { SdkProvider } from "./store/providers/sdk/sdk-provider.js";
const sdk = new SdkProvider();
const homy = new HomyProvider();
export function sortByPrice(one, two) {
    if (one.price > two.price) {
        return 1;
    }
    else if (one.price < two.price) {
        return -1;
    }
    else {
        return 0;
    }
}
export function sortByHighPrice(one, two) {
    if (one.price < two.price) {
        return 1;
    }
    else if (one.price > two.price) {
        return -1;
    }
    else {
        return 0;
    }
}
export function sortByDistance(one, two) {
    if (one.remoteness > two.remoteness) {
        return 1;
    }
    else if (one.remoteness < two.remoteness) {
        return -1;
    }
    else {
        return 0;
    }
}
export default function search(arr, func, sortOption = 'Сначала дорогие') {
    const mainTimeout = setTimeout(() => {
        renderToast({ type: 'error', text: 'Обновите страницу для актуализации броней!' }, { name: 'Обновить', handler: location.reload() });
        clearTimeout(mainTimeout);
    }, 300000);
    const filter = {
        city: arr.city,
        coordinates: '59.9386,30.3141',
        checkInDate: arr.checkInDate,
        checkOutDate: arr.checkOutDate,
        maxPrice: arr.maxPrice
    };
    Promise.all([
        homy.find(filter),
        sdk.find(filter)
    ]).then(data => {
        let allResults = [];
        allResults.concat(data[0], data[1]);
        switch (sortOption) {
            case 'Сначала дорогие':
                renderSearchResultsBlock(allResults.sort(sortByHighPrice), sortOption);
                break;
            case 'Сначала дешёвые':
                renderSearchResultsBlock(allResults.sort(sortByPrice), sortOption);
                break;
            default:
                renderSearchResultsBlock(allResults.sort(sortByDistance), sortOption);
                break;
        }
        if (func) {
            const timeOut = setTimeout(() => {
                func();
                clearTimeout(timeOut);
            }, 1000);
        }
    })
        .then(() => {
        const likes = document.querySelectorAll('.favorites');
        likes.forEach(item => {
            item.addEventListener('click', (e) => {
                toggleFavoriteItem(e);
            });
        });
    });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NlYXJjaC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsd0JBQXdCLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUM3RCxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUMzRCxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sVUFBVSxDQUFDO0FBQ3JDLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSx5Q0FBeUMsQ0FBQztBQUdyRSxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sdUNBQXVDLENBQUM7QUFFbEUsTUFBTSxHQUFHLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQztBQUM5QixNQUFNLElBQUksR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO0FBRWhDLE1BQU0sVUFBVSxXQUFXLENBQUMsR0FBVSxFQUFFLEdBQVU7SUFDOUMsSUFBSSxHQUFHLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLLEVBQUU7UUFDdkIsT0FBTyxDQUFDLENBQUE7S0FDWDtTQUFNLElBQUksR0FBRyxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxFQUFFO1FBQzlCLE9BQU8sQ0FBQyxDQUFDLENBQUE7S0FDWjtTQUFNO1FBQ0gsT0FBTyxDQUFDLENBQUE7S0FDWDtBQUNMLENBQUM7QUFDRCxNQUFNLFVBQVUsZUFBZSxDQUFDLEdBQVUsRUFBRSxHQUFVO0lBQ2xELElBQUksR0FBRyxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxFQUFFO1FBQ3ZCLE9BQU8sQ0FBQyxDQUFBO0tBQ1g7U0FBTSxJQUFJLEdBQUcsQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLEtBQUssRUFBRTtRQUM5QixPQUFPLENBQUMsQ0FBQyxDQUFBO0tBQ1o7U0FBTTtRQUNILE9BQU8sQ0FBQyxDQUFBO0tBQ1g7QUFDTCxDQUFDO0FBQ0QsTUFBTSxVQUFVLGNBQWMs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QUEyQjtJQUMzQix3QkFBd0I7SUFDeEIsb0RBQW9EO0lBQ3BELGFBQWE7SUFDYiwwQkFBMEI7SUFDMUIseUVBQXlFO0lBQ3pFLHdDQUF3QztJQUN4QywyREFBMkQ7SUFDM0QsZ0RBQWdEO0lBQ2hELHlCQUF5QjtJQUN6QixxQkFBcUI7SUFDckIsMEVBQTBFO0lBQzFFLHVDQUF1QztJQUN2Qyx3REFBd0Q7SUFDeEQsd0NBQXdDO0lBQ3hDLGdFQUFnRTtJQUNoRSw0Q0FBNEM7SUFDNUMsK0tBQStLO0lBQy9LLHNDQUFzQztJQUN0Qyw0QkFBNEI7SUFDNUIsd0NBQXdDO0lBQ3hDLCtJQUErSTtJQUMvSSx1REFBdUQ7SUFDdkQsNkNBQTZDO0lBQzdDLDREQUE0RDtJQUM1RCwyR0FBMkc7SUFDM0csaUNBQWlDO0lBQ2pDLDREQUE0RDtJQUM1RCx5QkFBeUI7SUFDekIscUJBQXFCO0lBQ3JCLGlCQUFpQjtJQUNqQixTQUFTO0lBQ1Qsd0RBQXdEO0FBRTVELENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge3JlbmRlclNlYXJjaFJlc3VsdHNCbG9ja30gZnJvbSBcIi4vc2VhcmNoLXJlc3VsdHMuanNcIjtcbmltcG9ydCB7dG9nZ2xlRmF2b3JpdGVJdGVtfSBmcm9tIFwiLi90b2dnbGVGYXZvcml0ZUl0ZW0uanNcIjtcbmltcG9ydCB7cmVuZGVyVG9hc3R9IGZyb20gXCIuL2xpYi5qc1wiO1xuaW1wb3J0IHtIb215UHJvdmlkZXJ9IGZyb20gXCIuL3N0b3JlL3Byb3ZpZGVycy9ob215L2hvbXktcHJvdmlkZXIuanNcIjtcbmltcG9ydCB7U2VhcmNoRmlsdGVyfSBmcm9tIFwiLi9zdG9yZS9kb21haW4vc2VhcmNoRmlsdGVyLmpzXCI7XG5pbXBvcnQge0hvdGVsfSBmcm9tIFwiLi9zdG9yZS9kb21haW4vaG90ZWwuanNcIjtcbmltcG9ydCB7U2RrUHJvdmlkZXJ9IGZyb20gXCIuL3N0b3JlL3Byb3ZpZGVycy9zZGsvc2RrLXByb3ZpZGVyLmpzXCI7XG5cbmNvbnN0IHNkayA9IG5ldyBTZGtQcm92aWRlcigpO1xuY29uc3QgaG9teSA9IG5ldyBIb215UHJvdmlkZXIoKTtcblxuZXhwb3J0IGZ1bmN0aW9uIHNvcnRCeVByaWNlKG9uZTogSG90ZWwsIHR3bzogSG90ZWwpOm51bWJlciB7XG4gICAgaWYgKG9uZS5wcmljZSA+IHR3by5wcmljZSkge1xuICAgICAgICByZXR1cm4gMVxuICAgIH0gZWxzZSBpZiAob25lLnByaWNlIDwgdHdvLnByaWNlKSB7XG4gICAgICAgIHJldHVybiAtMVxuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiAwXG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIHNvcnRCeUhpZ2hQcmljZShvbmU6IEhvdGVsLCB0d286IEhvdGVsKTpudW1iZXIge1xuICAgIGlmIChvbmUucHJpY2UgPCB0d28ucHJpY2UpIHtcbiAgICAgICAgcmV0dXJuIDFcbiAgICB9IGVsc2UgaWYgKG9uZS5wcmljZSA+IHR3by5wcmljZSkge1xuICAgICAgICByZXR1cm4gLTFcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gMFxuICAgIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiBzb3J0QnlEaXN0YW5jZShvbmU6IEhvdGVsLCB0d286IEhvdGVsKTpudW1iZXIge1xuICAgIGlmIChvbmUucmVtb3RlbmVzcyA+IHR3by5yZW1vdGVuZXNzKSB7XG4gICAgICAgIHJldHVybiAxXG4gICAgfSBlbHNlIGlmIChvbmUucmVtb3RlbmVzcyA8IHR3by5yZW1vdGVuZXNzKSB7XG4gICAgICAgIHJldHVybiAtMVxuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiAwXG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc2VhcmNoKGFycjpTZWFyY2hGaWx0ZXIsZnVuYz86KCk9Pnt9LHNvcnRPcHRpb246c3RyaW5nID0gJ9Ch0L3QsNGH0LDQu9CwINC00L7RgNC+0LPQuNC1Jyk6dm9pZCB7XG4gICAgY29uc3QgbWFpblRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpPT57XG4gICAgICAgIHJlbmRlclRvYXN0KHt0eXBlOidlcnJvcicsIHRleHQ6J9Ce0LHQvdC+0LLQuNGC0LUg0YHRgtGA0LDQvdC40YbRgyDQtNC70Y8g0LDQutGC0YPQsNC70LjQt9Cw0YbQuNC4INCx0YDQvtC90LXQuSEnfSwgeyBuYW1lOiAn0J7QsdC90L7QstC40YLRjCcsIGhhbmRsZXI6IGxvY2F0aW9uLnJlbG9hZCgpfSlcbiAgICAgICAgY2xlYXJUaW1lb3V0KG1haW5UaW1lb3V0KVxuICAgIH0sMzAwMDAwKVxuICAgIGNvbnN0IGZpbHRlcjogU2VhcmNoRmlsdGVyID0ge1xuICAgICAgICBjaXR5OiBhcnIuY2l0eSxcbiAgICAgICAgY29vcmRpbmF0ZXM6ICc1OS45Mzg2LDMwLjMxNDEnLFxuICAgICAgICBjaGVja0luRGF0ZTogYXJyLmNoZWNrSW5EYXRlLFxuICAgICAgICBjaGVja091dERhdGU6IGFyci5jaGVja091dERhdGUsXG4gICAgICAgIG1heFByaWNlOiBhcnIubWF4UHJpY2VcbiAgICB9XG5cbiAgICBQcm9taXNlLmFsbChbXG4gICAgICAgIGhvbXkuZmluZChmaWx0ZXIpLFxuICAgICAgICBzZGsuZmluZChmaWx0ZXIpXG4gICAgXSkudGhlbihkYXRhID0+IHtcbiAgICAgICAgbGV0IGFsbFJlc3VsdHM6IEhvdGVsW10gPSBbXTtcbiAgICAgICAgYWxsUmVzdWx0cy5jb25jYXQoZGF0YVswXSwgZGF0YVsxXSk7XG4gICAgICAgICAgICBzd2l0Y2ggKHNvcnRPcHRpb24pIHtcbiAgICAgICAgICAgICAgICBjYXNlICfQodC90LDRh9Cw0LvQsCDQtNC+0YDQvtCz0LjQtSc6XG4gICAgICAgICAgICAgICAgICAgIHJlbmRlclNlYXJjaFJlc3VsdHNCbG9jayhhbGxSZXN1bHRzLnNvcnQoc29ydEJ5SGlnaFByaWNlKSxzb3J0T3B0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAn0KHQvdCw0YfQsNC70LAg0LTQtdGI0ZHQstGL0LUnOlxuICAgICAgICAgICAgICAgICAgICByZW5kZXJTZWFyY2hSZXN1bHRzQmxvY2soYWxsUmVzdWx0cy5zb3J0KHNvcnRCeVByaWNlKSxzb3J0T3B0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgcmVuZGVyU2VhcmNoUmVzdWx0c0Jsb2NrKGFsbFJlc3VsdHMuc29ydChzb3J0QnlEaXN0YW5jZSksc29ydE9wdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICBpZiAoZnVuYykge1xuICAgICAgICAgICAgY29uc3QgdGltZU91dCA9IHNldFRpbWVvdXQoKCk9PntcbiAgICAgICAgICAgICAgICBmdW5jKCk7XG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVPdXQpO1xuICAgICAgICAgICAgfSwxMDAwKVxuICAgICAgICB9XG4gICAgfSlcbiAgICAgICAgLnRoZW4oKCk9PntcbiAgICAgICAgICAgIGNvbnN0IGxpa2VzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmZhdm9yaXRlcycpO1xuICAgICAgICAgICAgbGlrZXMuZm9yRWFjaChpdGVtPT57XG4gICAgICAgICAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsKGUpPT57XG4gICAgICAgICAgICAgICAgICAgIHRvZ2dsZUZhdm9yaXRlSXRlbShlKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSlcbiAgICBcbiAgICAvLyBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDozMDMwL3BsYWNlcz9jb29yZGluYXRlcz01OS45Mzg2LDMwLjMxNDEmY2hlY2tJbkRhdGU9JHthcnIuY2hlY2tJbkRhdGV9JmNoZWNrT3V0RGF0ZT0ke2Fyci5jaGVja091dERhdGV9Jm1heFByaWNlPSR7TnVtYmVyKGFyci5wcmljZUxpbWl0KX1gKVxuICAgIC8vICAgICAudGhlbihkYXRhPT5kYXRhLmpzb24oKSlcbiAgICAvLyAgICAgLnRoZW4oZGF0YT0+IHtcbiAgICAvLyAgICAgICAgIGlmIChkYXRhLmxlbmd0aCA9PT0gMClcbiAgICAvLyAgICAgICAgICAgICByZXR1cm4gcmVuZGVyRW1wdHlPckVycm9yU2VhcmNoQmxvY2soJ9Cg0LXQt9GD0LvRjNGC0LDRgtGLINC+0YLRgdGD0YLRgdGC0LLRg9GO0YInKVxuICAgIC8vICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgIC8vICAgICAgICAgc2RrLnNlYXJjaChhcnIpLnRoZW4oaT0+IHtcbiAgICAvLyAgICAgICAgICAgICBkYXRhLnB1c2goaSlcbiAgICAvLyAgICAgICAgIH0pLnRoZW4oKCk9PntcbiAgICAvLyAgICAgICAgICAgICByZW5kZXJTZWFyY2hSZXN1bHRzQmxvY2soZGF0YS5mbGF0KCkpXG4gICAgLy8gICAgICAgICB9KVxuICAgIC8vICAgICAgICAgICAgIC50aGVuKCgpPT57XG4gICAgLy8gICAgICAgICAgICAgICAgIGNvbnN0IGxpa2VzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmZhdm9yaXRlcycpO1xuICAgIC8vICAgICAgICAgICAgICAgICBsaWtlcy5mb3JFYWNoKGl0ZW09PntcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLChlKT0+e1xuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIHRvZ2dsZUZhdm9yaXRlSXRlbShlKVxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAvLyAgICAgICAgICAgICAgICAgfSlcbiAgICAvLyAgICAgICAgICAgICAgICAgY29uc3QgYm9va2luZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpLnJlc3VsdCcpO1xuICAgIC8vICAgICAgICAgICAgICAgICBib29raW5nLmZvckVhY2goaT0+e1xuICAgIC8vICAgICAgICAgICAgICAgICAgICAgaS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsKGUpPT57XG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHR5cGVvZiArZS50YXJnZXQuaWQgPT09ICdzdHJpbmcnKXtcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZGsuYm9vayhlLnRhcmdldC5pZCxhcnIuY2hlY2tJbkRhdGUsYXJyLmNoZWNrT3V0RGF0ZSkudGhlbihkYXRhPT5yZW5kZXJUb2FzdChg0JLQsNGIINGA0LXQs9C40YHRgtGA0LDRhtC40L7QvdC90YvQuSDQvdC+0LzQtdGAICR7ZGF0YX1gKSkuY2F0Y2goZXJyPT5jb25zb2xlLmxvZyhlcnIpKVxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDozMDMwL3BsYWNlcy8ke2UudGFyZ2V0LmlkfT9jaGVja0luRGF0ZT0ke2Fyci5jaGVja0luRGF0ZX0mY2hlY2tPdXREYXRlPSR7YXJyLmNoZWNrT3V0RGF0ZX1gKVxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihkYXRhPT5kYXRhLmpzb24oKSlcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZGF0YT0+IHtcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChtYWluVGltZW91dClcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbmRlclRvYXN0KHt0eXBlOiAnc3VjY2VzcycsIHRleHQ6IGDQntGC0LXQu9GMICR7ZGF0YS5uYW1lfSDQt9Cw0LHRgNC+0L3QuNGA0L7QstCw0L0hYH0pXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jYXRjaChlcnI9PmNvbnNvbGUubG9nKGVycikpXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICB9KVxuICAgIC8vICAgICAgICAgICAgICAgICB9KVxuICAgIC8vICAgICAgICAgICAgIH0pXG4gICAgLy8gICAgIH0pXG4gICAgLy8gICAgIC5jYXRjaChlcnIgPT4gcmVuZGVyRW1wdHlPckVycm9yU2VhcmNoQmxvY2soZXJyKSlcbiAgICBcbn1cbiJdfQ==