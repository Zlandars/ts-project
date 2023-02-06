"use strict";
exports.__esModule = true;
exports.toggleFavoriteItem = void 0;
var index_js_1 = require("./index.js");
var user_js_1 = require("./user.js");
function toggleFavoriteItem(e) {
    var likes = (0, index_js_1.getFavoritesAmount)();
    var favorites = (0, index_js_1.getFavoriteItems)();
    console.log(favorites);
    // @ts-ignore
    if (!favorites.includes(e.target.id)) {
        e.target.classList.add('active');
        localStorage.setItem('favoriteItems', "".concat(favorites.join(), ",").concat(e.target.id));
        localStorage.setItem('favoritesAmount', "".concat(++likes));
    }
    else {
        e.target.classList.remove('active');
        favorites = favorites.filter(function (item) {
            return item !== e.target.id;
        });
        localStorage.setItem('favoriteItems', "".concat(favorites.join()));
        localStorage.setItem('favoritesAmount', "".concat(--likes));
    }
    (0, user_js_1.renderUserBlock)();
}
exports.toggleFavoriteItem = toggleFavoriteItem;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9nZ2xlRmF2b3JpdGVJdGVtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidG9nZ2xlRmF2b3JpdGVJdGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHVDQUFnRTtBQUNoRSxxQ0FBMEM7QUFFMUMsU0FBZ0Isa0JBQWtCLENBQUMsQ0FBQztJQUNoQyxJQUFJLEtBQUssR0FBRyxJQUFBLDZCQUFrQixHQUFFLENBQUM7SUFDakMsSUFBSSxTQUFTLEdBQUcsSUFBQSwyQkFBZ0IsR0FBRSxDQUFDO0lBQ25DLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUE7SUFDdEIsYUFBYTtJQUNiLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUU7UUFDbEMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2pDLFlBQVksQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUFDLFVBQUcsU0FBUyxDQUFDLElBQUksRUFBRSxjQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFFLENBQUMsQ0FBQTtRQUMxRSxZQUFZLENBQUMsT0FBTyxDQUFDLGlCQUFpQixFQUFFLFVBQUcsRUFBRSxLQUFLLENBQUUsQ0FBQyxDQUFBO0tBQ3hEO1NBQU07UUFDSCxDQUFDLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDcEMsU0FBUyxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsVUFBUyxJQUFJO1lBQ3RDLE9BQU8sSUFBSSxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFBO1FBQy9CLENBQUMsQ0FBQyxDQUFBO1FBQ0YsWUFBWSxDQUFDLE9BQU8sQ0FBQyxlQUFlLEVBQUMsVUFBRyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUUsQ0FBQyxDQUFBO1FBQzNELFlBQVksQ0FBQyxPQUFPLENBQUMsaUJBQWlCLEVBQUUsVUFBRyxFQUFFLEtBQUssQ0FBRSxDQUFDLENBQUE7S0FDeEQ7SUFDRCxJQUFBLHlCQUFlLEdBQUUsQ0FBQTtBQUNyQixDQUFDO0FBbEJELGdEQWtCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Z2V0RmF2b3JpdGVJdGVtcywgZ2V0RmF2b3JpdGVzQW1vdW50fSBmcm9tIFwiLi9pbmRleC5qc1wiO1xuaW1wb3J0IHtyZW5kZXJVc2VyQmxvY2t9IGZyb20gXCIuL3VzZXIuanNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIHRvZ2dsZUZhdm9yaXRlSXRlbShlKSB7XG4gICAgbGV0IGxpa2VzID0gZ2V0RmF2b3JpdGVzQW1vdW50KCk7XG4gICAgbGV0IGZhdm9yaXRlcyA9IGdldEZhdm9yaXRlSXRlbXMoKTtcbiAgICBjb25zb2xlLmxvZyhmYXZvcml0ZXMpXG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIGlmICghZmF2b3JpdGVzLmluY2x1ZGVzKGUudGFyZ2V0LmlkKSkge1xuICAgICAgICBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2Zhdm9yaXRlSXRlbXMnLGAke2Zhdm9yaXRlcy5qb2luKCl9LCR7ZS50YXJnZXQuaWR9YClcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2Zhdm9yaXRlc0Ftb3VudCcsIGAkeysrbGlrZXN9YClcbiAgICB9IGVsc2Uge1xuICAgICAgICBlLnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcbiAgICAgICAgZmF2b3JpdGVzID0gZmF2b3JpdGVzLmZpbHRlcihmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgICByZXR1cm4gaXRlbSAhPT0gZS50YXJnZXQuaWRcbiAgICAgICAgfSlcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2Zhdm9yaXRlSXRlbXMnLGAke2Zhdm9yaXRlcy5qb2luKCl9YClcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2Zhdm9yaXRlc0Ftb3VudCcsIGAkey0tbGlrZXN9YClcbiAgICB9XG4gICAgcmVuZGVyVXNlckJsb2NrKClcbn1cbiJdfQ==