import { renderBlock } from './lib.js';
export function renderSearchStubBlock() {
    renderBlock('search-results-block', `
    <div class="before-results-block">
      <img src="img/start-search.png" />
      <p>Чтобы начать поиск, заполните форму и&nbsp;нажмите "Найти"</p>
    </div>
    `);
}
export function renderEmptyOrErrorSearchBlock(reasonMessage) {
    renderBlock('search-results-block', `
    <div class="no-results-block">
      <img src="img/no-results.png" />
      <p>${reasonMessage}</p>
    </div>
    `);
}
export function renderSearchResultsBlock(object, sortOption) {
    renderBlock('search-results-block', `
    <ul class="results-list">
      ${object.map(item => {
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
      `;
    })}
    </ul>
    `);
    let filter = document.querySelector('.search-results-filter select');
    if (filter) {
        filter.value = sortOption;
        filter.addEventListener('change', () => {
            //  Не получилось. Если кто-то это посмотрит, то исправьте и объясните
            // search(object,()=>{},sortOption)
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLXJlc3VsdHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VhcmNoLXJlc3VsdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLFVBQVUsQ0FBQTtBQUd0QyxNQUFNLFVBQVUscUJBQXFCO0lBQ25DLFdBQVcsQ0FDVCxzQkFBc0IsRUFDdEI7Ozs7O0tBS0MsQ0FDRixDQUFBO0FBQ0gsQ0FBQztBQUVELE1BQU0sVUFBVSw2QkFBNkIsQ0FBRSxhQUFvQjtJQUNqRSxXQUFXLENBQ1Qsc0JBQXNCLEVBQ3RCOzs7V0FHTyxhQUFhOztLQUVuQixDQUNGLENBQUE7QUFDSCxDQUFDO0FBQ0QsTUFBTSxVQUFVLHdCQUF3QixDQUFFLE1BQWMsRUFBRSxVQUFpQjtJQUN2RSxXQUFXLENBQ1gsc0JBQXNCLEVBQ3RCOztRQUVJLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFBLEVBQUU7UUFDZixPQUFPOzs7O3lDQUl3QixJQUFJLENBQUMsTUFBTTsyQ0FDVCxJQUFJLENBQUMsS0FBSzs7OzttQkFJbEMsSUFBSSxDQUFDLElBQUk7aUNBQ0ssSUFBSSxDQUFDLEtBQUs7O3FFQUUwQixPQUFPLElBQUksQ0FBQyxVQUFVLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHOztrQkFFN0csSUFBSSxDQUFDLFdBQVc7Ozs7OENBSVksSUFBSSxDQUFDLE1BQU07Ozs7OztPQU1sRCxDQUFBO0lBQ0gsQ0FBQyxDQUFDOztLQUVELENBQ0YsQ0FBQztJQUNBLElBQUksTUFBTSxHQUFxQixRQUFRLENBQUMsYUFBYSxDQUFDLCtCQUErQixDQUFDLENBQUM7SUFDdkYsSUFBRyxNQUFNLEVBQUU7UUFDUCxNQUFNLENBQUMsS0FBSyxHQUFHLFVBQVUsQ0FBQztRQUMxQixNQUFNLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLEdBQUUsRUFBRTtZQUNsQyxzRUFBc0U7WUFDdEUsbUNBQW1DO1FBQ3ZDLENBQUMsQ0FBQyxDQUFBO0tBQ0w7QUFDTCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcmVuZGVyQmxvY2sgfSBmcm9tICcuL2xpYi5qcydcbmltcG9ydCB7SG90ZWx9IGZyb20gXCIuL3N0b3JlL2RvbWFpbi9ob3RlbFwiO1xuXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyU2VhcmNoU3R1YkJsb2NrICgpIHtcbiAgcmVuZGVyQmxvY2soXG4gICAgJ3NlYXJjaC1yZXN1bHRzLWJsb2NrJyxcbiAgICBgXG4gICAgPGRpdiBjbGFzcz1cImJlZm9yZS1yZXN1bHRzLWJsb2NrXCI+XG4gICAgICA8aW1nIHNyYz1cImltZy9zdGFydC1zZWFyY2gucG5nXCIgLz5cbiAgICAgIDxwPtCn0YLQvtCx0Ysg0L3QsNGH0LDRgtGMINC/0L7QuNGB0LosINC30LDQv9C+0LvQvdC40YLQtSDRhNC+0YDQvNGDINC4Jm5ic3A70L3QsNC20LzQuNGC0LUgXCLQndCw0LnRgtC4XCI8L3A+XG4gICAgPC9kaXY+XG4gICAgYFxuICApXG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJFbXB0eU9yRXJyb3JTZWFyY2hCbG9jayAocmVhc29uTWVzc2FnZTpzdHJpbmcpOnZvaWQge1xuICByZW5kZXJCbG9jayhcbiAgICAnc2VhcmNoLXJlc3VsdHMtYmxvY2snLFxuICAgIGBcbiAgICA8ZGl2IGNsYXNzPVwibm8tcmVzdWx0cy1ibG9ja1wiPlxuICAgICAgPGltZyBzcmM9XCJpbWcvbm8tcmVzdWx0cy5wbmdcIiAvPlxuICAgICAgPHA+JHtyZWFzb25NZXNzYWdlfTwvcD5cbiAgICA8L2Rpdj5cbiAgICBgXG4gIClcbn1cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJTZWFyY2hSZXN1bHRzQmxvY2sgKG9iamVjdDpIb3RlbFtdLCBzb3J0T3B0aW9uOnN0cmluZykge1xuICAgIHJlbmRlckJsb2NrKFxuICAgICdzZWFyY2gtcmVzdWx0cy1ibG9jaycsXG4gICAgYFxuICAgIDx1bCBjbGFzcz1cInJlc3VsdHMtbGlzdFwiPlxuICAgICAgJHtvYmplY3QubWFwKGl0ZW09PntcbiAgICAgICAgICByZXR1cm4gYFxuICAgICAgICA8bGkgY2xhc3M9XCJyZXN1bHRcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInJlc3VsdC1jb250YWluZXJcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicmVzdWx0LWltZy1jb250YWluZXJcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmYXZvcml0ZXNcIiBpZD1cIiR7aXRlbS5vcmlnSWR9XCI+PC9kaXY+XG4gICAgICAgICAgICA8aW1nIGNsYXNzPVwicmVzdWx0LWltZ1wiIHNyYz1cIiR7aXRlbS5pbWFnZX1cIiBhbHQ9XCJcIj5cbiAgICAgICAgICA8L2Rpdj5cdFxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJyZXN1bHQtaW5mb1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJlc3VsdC1pbmZvLS1oZWFkZXJcIj5cbiAgICAgICAgICAgICAgPHA+JHtpdGVtLm5hbWV9PC9wPlxuICAgICAgICAgICAgICA8cCBjbGFzcz1cInByaWNlXCI+JHtpdGVtLnByaWNlfSYjODM4MTs8L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyZXN1bHQtaW5mby0tbWFwXCI+PGkgY2xhc3M9XCJtYXAtaWNvblwiPjwvaT4gJHt0eXBlb2YgaXRlbS5yZW1vdGVuZXNzICE9ICdzdHJpbmcnID8gaXRlbS5yZW1vdGVuZXNzIDogJzAnfSDQutC8INC+0YIg0LLQsNGBPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicmVzdWx0LWluZm8tLWRlc2NyXCI+XG4gICAgICAgICAgICAgICAgJHtpdGVtLmRlc2NyaXB0aW9ufVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicmVzdWx0LWluZm8tLWZvb3RlclwiPlxuICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJib29raW5nXCIgaWQ9XCIke2l0ZW0ub3JpZ0lkfVwiPtCX0LDQsdGA0L7QvdC40YDQvtCy0LDRgtGMPC9idXR0b24+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9saT5cbiAgICAgIGBcbiAgICB9KX1cbiAgICA8L3VsPlxuICAgIGBcbiAgKTtcbiAgICBsZXQgZmlsdGVyID0gPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlYXJjaC1yZXN1bHRzLWZpbHRlciBzZWxlY3QnKTtcbiAgICBpZihmaWx0ZXIpIHtcbiAgICAgICAgZmlsdGVyLnZhbHVlID0gc29ydE9wdGlvbjtcbiAgICAgICAgZmlsdGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpPT57XG4gICAgICAgICAgICAvLyAg0J3QtSDQv9C+0LvRg9GH0LjQu9C+0YHRjC4g0JXRgdC70Lgg0LrRgtC+LdGC0L4g0Y3RgtC+INC/0L7RgdC80L7RgtGA0LjRgiwg0YLQviDQuNGB0L/RgNCw0LLRjNGC0LUg0Lgg0L7QsdGK0Y/RgdC90LjRgtC1XG4gICAgICAgICAgICAvLyBzZWFyY2gob2JqZWN0LCgpPT57fSxzb3J0T3B0aW9uKVxuICAgICAgICB9KVxuICAgIH1cbn1cbiJdfQ==