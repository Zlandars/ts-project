"use strict";
exports.__esModule = true;
exports.getFavoriteItems = exports.getFavoritesAmount = void 0;
var search_form_js_1 = require("./search-form.js");
var search_results_js_1 = require("./search-results.js");
var user_js_1 = require("./user.js");
var lib_js_1 = require("./lib.js");
var search_js_1 = require("./search.js");
function getUserData() {
    return localStorage.getItem('user');
}
function getFavoritesAmount() {
    if (localStorage.getItem('favoritesAmount') == null) {
        localStorage.setItem('favoritesAmount', '0');
        return 0;
    }
    return Number(localStorage.getItem('favoritesAmount'));
}
exports.getFavoritesAmount = getFavoritesAmount;
function getFavoriteItems() {
    if (localStorage.getItem('favoriteItems') == null) {
        localStorage.setItem('favoriteItems', null);
    }
    return localStorage.getItem('favoriteItems').split(',');
}
exports.getFavoriteItems = getFavoriteItems;
function cb(err, arr) {
    // const rand = Math.round(Math.random());
    // if (rand == 1) {
    //   return alert(err)
    // }
    // alert(arr)
}
window.addEventListener('DOMContentLoaded', function () {
    (0, user_js_1.renderUserBlock)();
    (0, search_form_js_1.renderSearchFormBlock)();
    (0, search_results_js_1.renderSearchStubBlock)();
    (0, lib_js_1.renderToast)({ text: 'Это пример уведомления. Используйте его при необходимости', type: 'success' }, { name: 'Понял', handler: function () { console.log('Уведомление закрыто'); } });
    var form = document.querySelector('form');
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        // @ts-ignore
        var city = document.querySelector('#city').value;
        // @ts-ignore
        var arrival = new Date(document.querySelector('#check-in-date').value);
        // @ts-ignore
        var depart = new Date(document.querySelector('#check-out-date').value);
        // @ts-ignore
        var maxPrice = document.querySelector('#max-price').value;
        (0, search_js_1["default"])([city, arrival, depart, maxPrice], cb);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxtREFBd0Q7QUFDeEQseURBQTJEO0FBQzNELHFDQUEyQztBQUMzQyxtQ0FBc0M7QUFDdEMseUNBQWlDO0FBR2pDLFNBQVMsV0FBVztJQUNsQixPQUFRLFlBQVksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDdkMsQ0FBQztBQUNELFNBQWdCLGtCQUFrQjtJQUNoQyxJQUFJLFlBQVksQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsSUFBRSxJQUFJLEVBQUU7UUFDakQsWUFBWSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsRUFBQyxHQUFHLENBQUMsQ0FBQztRQUM1QyxPQUFPLENBQUMsQ0FBQztLQUNWO0lBQ0QsT0FBTyxNQUFNLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7QUFDekQsQ0FBQztBQU5ELGdEQU1DO0FBQ0QsU0FBZ0IsZ0JBQWdCO0lBQzlCLElBQUksWUFBWSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsSUFBRSxJQUFJLEVBQUU7UUFDL0MsWUFBWSxDQUFDLE9BQU8sQ0FBQyxlQUFlLEVBQUMsSUFBSSxDQUFDLENBQUM7S0FDNUM7SUFDRCxPQUFPLFlBQVksQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzFELENBQUM7QUFMRCw0Q0FLQztBQUNELFNBQVMsRUFBRSxDQUFDLEdBQVUsRUFBQyxHQUFXO0lBQ2hDLDBDQUEwQztJQUMxQyxtQkFBbUI7SUFDbkIsc0JBQXNCO0lBQ3RCLElBQUk7SUFDSixhQUFhO0FBQ2YsQ0FBQztBQUNELE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRTtJQUMxQyxJQUFBLHlCQUFlLEdBQUUsQ0FBQTtJQUNqQixJQUFBLHNDQUFxQixHQUFFLENBQUE7SUFDdkIsSUFBQSx5Q0FBcUIsR0FBRSxDQUFBO0lBQ3ZCLElBQUEsb0JBQVcsRUFDVCxFQUFDLElBQUksRUFBRSwyREFBMkQsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFDLEVBQ3BGLEVBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsY0FBTyxPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUEsQ0FBQSxDQUFDLEVBQUMsQ0FDckUsQ0FBQTtJQUNELElBQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDNUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxVQUFDLENBQUM7UUFDaEMsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ25CLGFBQWE7UUFDYixJQUFNLElBQUksR0FBVSxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUMxRCxhQUFhO1FBQ2IsSUFBTSxPQUFPLEdBQUcsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3pFLGFBQWE7UUFDYixJQUFNLE1BQU0sR0FBRyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLGlCQUFpQixDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDekUsYUFBYTtRQUNiLElBQU0sUUFBUSxHQUFVLFFBQVEsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLENBQUMsS0FBSyxDQUFDO1FBQ25FLElBQUEsc0JBQU0sRUFBQyxDQUFDLElBQUksRUFBQyxPQUFPLEVBQUMsTUFBTSxFQUFDLFFBQVEsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzVDLENBQUMsQ0FBQyxDQUFBO0FBRUosQ0FBQyxDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyByZW5kZXJTZWFyY2hGb3JtQmxvY2sgfSBmcm9tICcuL3NlYXJjaC1mb3JtLmpzJ1xuaW1wb3J0IHsgcmVuZGVyU2VhcmNoU3R1YkJsb2NrIH0gZnJvbSAnLi9zZWFyY2gtcmVzdWx0cy5qcydcbmltcG9ydCB7IHJlbmRlclVzZXJCbG9jayB9IGZyb20gJy4vdXNlci5qcydcbmltcG9ydCB7IHJlbmRlclRvYXN0IH0gZnJvbSAnLi9saWIuanMnXG5pbXBvcnQgc2VhcmNoIGZyb20gXCIuL3NlYXJjaC5qc1wiO1xuaW1wb3J0IHtQbGFjZX0gZnJvbSBcIi4vaW50ZXJmYWNlc1wiO1xuXG5mdW5jdGlvbiBnZXRVc2VyRGF0YSgpOnVua25vd24ge1xuICByZXR1cm4gIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd1c2VyJyk7XG59XG5leHBvcnQgZnVuY3Rpb24gZ2V0RmF2b3JpdGVzQW1vdW50KCk6bnVtYmVyIHtcbiAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdmYXZvcml0ZXNBbW91bnQnKT09bnVsbCkge1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdmYXZvcml0ZXNBbW91bnQnLCcwJyk7XG4gICAgcmV0dXJuIDA7XG4gIH1cbiAgcmV0dXJuIE51bWJlcihsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZmF2b3JpdGVzQW1vdW50JykpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGdldEZhdm9yaXRlSXRlbXMoKSB7XG4gIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZmF2b3JpdGVJdGVtcycpPT1udWxsKSB7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2Zhdm9yaXRlSXRlbXMnLG51bGwpO1xuICB9XG4gIHJldHVybiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZmF2b3JpdGVJdGVtcycpLnNwbGl0KCcsJyk7XG59XG5mdW5jdGlvbiBjYihlcnI6c3RyaW5nLGFycjpQbGFjZVtdKSB7XG4gIC8vIGNvbnN0IHJhbmQgPSBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkpO1xuICAvLyBpZiAocmFuZCA9PSAxKSB7XG4gIC8vICAgcmV0dXJuIGFsZXJ0KGVycilcbiAgLy8gfVxuICAvLyBhbGVydChhcnIpXG59XG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcbiAgcmVuZGVyVXNlckJsb2NrKClcbiAgcmVuZGVyU2VhcmNoRm9ybUJsb2NrKClcbiAgcmVuZGVyU2VhcmNoU3R1YkJsb2NrKClcbiAgcmVuZGVyVG9hc3QoXG4gICAge3RleHQ6ICfQrdGC0L4g0L/RgNC40LzQtdGAINGD0LLQtdC00L7QvNC70LXQvdC40Y8uINCY0YHQv9C+0LvRjNC30YPQudGC0LUg0LXQs9C+INC/0YDQuCDQvdC10L7QsdGF0L7QtNC40LzQvtGB0YLQuCcsIHR5cGU6ICdzdWNjZXNzJ30sXG4gICAge25hbWU6ICfQn9C+0L3Rj9C7JywgaGFuZGxlcjogKCkgPT4ge2NvbnNvbGUubG9nKCfQo9Cy0LXQtNC+0LzQu9C10L3QuNC1INC30LDQutGA0YvRgtC+Jyl9fVxuICApXG4gIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdmb3JtJyk7XG4gIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGUpPT57XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBjb25zdCBjaXR5OnN0cmluZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjaXR5JykudmFsdWU7XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIGNvbnN0IGFycml2YWwgPSBuZXcgRGF0ZShkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2hlY2staW4tZGF0ZScpLnZhbHVlKTtcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgY29uc3QgZGVwYXJ0ID0gbmV3IERhdGUoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NoZWNrLW91dC1kYXRlJykudmFsdWUpO1xuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBjb25zdCBtYXhQcmljZTpudW1iZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbWF4LXByaWNlJykudmFsdWU7XG4gICAgc2VhcmNoKFtjaXR5LGFycml2YWwsZGVwYXJ0LG1heFByaWNlXSxjYik7XG4gIH0pXG5cbn0pXG5cblxuXG4iXX0=