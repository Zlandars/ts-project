import { renderBlock } from './lib.js';
import { getFavoritesAmount } from './index.js';
export function renderUserBlock(userName = 'Eugen', profileLink = '/') {
    const likes = getFavoritesAmount();
    // @ts-ignore
    const favoritesCaption = likes == 0 ? 'ничего нет' : likes;
    const hasFavoriteItems = favoritesCaption !== 'ничего нет' ? true : false;
    const userAva = "/img/avatar.png";
    localStorage.setItem('user', `{username: "${userName}", avatarUrl: "${userAva}"}`);
    // @ts-ignore
    renderBlock('user-block', `
    <div class="header-container">
      <img class="avatar" src=${userAva} alt="Wade Warren" />
      <div class="info">
          <a class="name" href='${profileLink ? profileLink : ''}'>${userName}</a>
          <p class="fav">
            <i class="heart-icon${hasFavoriteItems ? ' active' : ''}"></i>${favoritesCaption}
          </p>
      </div>
    </div>
    `);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91c2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxVQUFVLENBQUE7QUFDdEMsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sWUFBWSxDQUFBO0FBRTdDLE1BQU0sVUFBVSxlQUFlLENBQUUsV0FBa0IsT0FBTyxFQUFFLGNBQXFCLEdBQUc7SUFDbEYsTUFBTSxLQUFLLEdBQUcsa0JBQWtCLEVBQUUsQ0FBQztJQUNuQyxhQUFhO0lBQ2IsTUFBTSxnQkFBZ0IsR0FBRyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUMzRCxNQUFNLGdCQUFnQixHQUFHLGdCQUFnQixLQUFLLFlBQVksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUE7SUFDekUsTUFBTSxPQUFPLEdBQUcsaUJBQWlCLENBQUM7SUFDbEMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUMsZUFBZSxRQUFRLGtCQUFrQixPQUFPLElBQUksQ0FBQyxDQUFBO0lBQ2pGLGFBQWE7SUFDYixXQUFXLENBQ1QsWUFBWSxFQUNaOztnQ0FFNEIsT0FBTzs7a0NBRUwsV0FBVyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxRQUFROztrQ0FFM0MsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxTQUFTLGdCQUFnQjs7OztLQUl2RixDQUNGLENBQUE7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcmVuZGVyQmxvY2sgfSBmcm9tICcuL2xpYi5qcydcbmltcG9ydCB7Z2V0RmF2b3JpdGVzQW1vdW50fSBmcm9tICcuL2luZGV4LmpzJ1xuXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyVXNlckJsb2NrICh1c2VyTmFtZTpzdHJpbmcgPSAnRXVnZW4nLCBwcm9maWxlTGluazpzdHJpbmcgPSAnLycpIHtcbiAgY29uc3QgbGlrZXMgPSBnZXRGYXZvcml0ZXNBbW91bnQoKTtcbiAgLy8gQHRzLWlnbm9yZVxuICBjb25zdCBmYXZvcml0ZXNDYXB0aW9uID0gbGlrZXMgPT0gMCA/ICfQvdC40YfQtdCz0L4g0L3QtdGCJyA6IGxpa2VzO1xuICBjb25zdCBoYXNGYXZvcml0ZUl0ZW1zID0gZmF2b3JpdGVzQ2FwdGlvbiAhPT0gJ9C90LjRh9C10LPQviDQvdC10YInID8gdHJ1ZSA6IGZhbHNlXG4gIGNvbnN0IHVzZXJBdmEgPSBcIi9pbWcvYXZhdGFyLnBuZ1wiO1xuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndXNlcicsYHt1c2VybmFtZTogXCIke3VzZXJOYW1lfVwiLCBhdmF0YXJVcmw6IFwiJHt1c2VyQXZhfVwifWApXG4gIC8vIEB0cy1pZ25vcmVcbiAgcmVuZGVyQmxvY2soXG4gICAgJ3VzZXItYmxvY2snLFxuICAgIGBcbiAgICA8ZGl2IGNsYXNzPVwiaGVhZGVyLWNvbnRhaW5lclwiPlxuICAgICAgPGltZyBjbGFzcz1cImF2YXRhclwiIHNyYz0ke3VzZXJBdmF9IGFsdD1cIldhZGUgV2FycmVuXCIgLz5cbiAgICAgIDxkaXYgY2xhc3M9XCJpbmZvXCI+XG4gICAgICAgICAgPGEgY2xhc3M9XCJuYW1lXCIgaHJlZj0nJHtwcm9maWxlTGluayA/IHByb2ZpbGVMaW5rIDogJyd9Jz4ke3VzZXJOYW1lfTwvYT5cbiAgICAgICAgICA8cCBjbGFzcz1cImZhdlwiPlxuICAgICAgICAgICAgPGkgY2xhc3M9XCJoZWFydC1pY29uJHtoYXNGYXZvcml0ZUl0ZW1zID8gJyBhY3RpdmUnIDogJyd9XCI+PC9pPiR7ZmF2b3JpdGVzQ2FwdGlvbn1cbiAgICAgICAgICA8L3A+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICBgXG4gIClcbn1cbiJdfQ==