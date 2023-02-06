import { renderBlock } from './lib.js';
import { DateTime } from "./luxon.js";
export function renderSearchFormBlock(dateArrival, dateDeparture) {
    const nowTime = DateTime.now();
    const dateArrivals = typeof dateArrival != "undefined" ? dateArrival : nowTime.plus({ days: 1 });
    const dateDepart = typeof dateDeparture != "undefined"
        ? dateDeparture
        : typeof dateArrival != "undefined"
            ? DateTime.now().set(dateArrival).plus({ days: 2 })
            : dateArrivals.plus({ days: 2 });
    const nextMonth = DateTime.now().plus({ months: 1 });
    const lastDayInMonth = nextMonth.set({ day: nextMonth.daysInMonth });
    renderBlock('search-form-block', `
    <form>
      <fieldset class="search-filedset">
        <div class="row">
          <div>
            <label for="city">Город</label>
            <input id="city" type="text" value="Санкт-Петербург" />
            <input type="hidden" disabled value="59.9386,30.3141" />
          </div>
          <!--<div class="providers">
            <label><input type="checkbox" name="provider" value="homy" checked /> Homy</label>
            <label><input type="checkbox" name="provider" value="flat-rent" checked /> FlatRent</label>
          </div>-->
        </div>
        <div class="row">
          <div>
            <label for="check-in-date">Дата заезда</label>
            <input id="check-in-date" type="date" value="${dateArrivals.toISODate()}" min="${nowTime.toISODate()}" max="${lastDayInMonth.toISODate()}" name="checkin" />
          </div>
          <div>
            <label for="check-out-date">Дата выезда</label>
            <input id="check-out-date" type="date" value="${dateDepart.toISODate()}" min="${dateArrivals.plus({ days: 1 }).toISODate()}" max="2023-06-30" name="checkout" />
          </div>
          <div>
            <label for="max-price">Макс. цена суток</label>
            <input id="max-price" type="text" value="10000" name="price" class="max-price" required />
          </div>
          <div>
            <div><button type="submit">Найти</button></div>
          </div>
        </div>
      </fieldset>
    </form>
    `);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLWZvcm0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VhcmNoLWZvcm0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUN2QyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBRXRDLE1BQU0sVUFBVSxxQkFBcUIsQ0FBRSxXQUE0QixFQUFFLGFBQThCO0lBQ2pHLE1BQU0sT0FBTyxHQUFPLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUNuQyxNQUFNLFlBQVksR0FBRyxPQUFPLFdBQVcsSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFDLElBQUksRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDO0lBQzlGLE1BQU0sVUFBVSxHQUFHLE9BQU8sYUFBYSxJQUFJLFdBQVc7UUFDbEQsQ0FBQyxDQUFDLGFBQWE7UUFDZixDQUFDLENBQUMsT0FBTyxXQUFXLElBQUksV0FBVztZQUMvQixDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBQyxJQUFJLEVBQUUsQ0FBQyxFQUFDLENBQUM7WUFDakQsQ0FBQyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBQyxJQUFJLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQztJQUN2QyxNQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDckQsTUFBTSxjQUFjLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFDLEdBQUcsRUFBRSxTQUFTLENBQUMsV0FBVyxFQUFDLENBQUMsQ0FBQTtJQUNsRSxXQUFXLENBQ1QsbUJBQW1CLEVBQ25COzs7Ozs7Ozs7Ozs7Ozs7OzsyREFpQnVELFlBQVksQ0FBQyxTQUFTLEVBQUUsVUFBVSxPQUFPLENBQUMsU0FBUyxFQUFFLFVBQVUsY0FBYyxDQUFDLFNBQVMsRUFBRTs7Ozs0REFJeEYsVUFBVSxDQUFDLFNBQVMsRUFBRSxVQUFVLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUU7Ozs7Ozs7Ozs7OztLQVk5SCxDQUNGLENBQUE7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcmVuZGVyQmxvY2sgfSBmcm9tICcuL2xpYi5qcyc7XG5pbXBvcnQgeyBEYXRlVGltZSB9IGZyb20gXCIuL2x1eG9uLmpzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJTZWFyY2hGb3JtQmxvY2sgKGRhdGVBcnJpdmFsPzpEYXRlIHwgRGF0ZVRpbWUsIGRhdGVEZXBhcnR1cmU/OkRhdGUgfCBEYXRlVGltZSk6dm9pZCB7XG4gIGNvbnN0IG5vd1RpbWU6YW55ID0gRGF0ZVRpbWUubm93KCk7XG4gIGNvbnN0IGRhdGVBcnJpdmFscyA9IHR5cGVvZiBkYXRlQXJyaXZhbCAhPSBcInVuZGVmaW5lZFwiID8gZGF0ZUFycml2YWwgOiBub3dUaW1lLnBsdXMoe2RheXM6MX0pO1xuICBjb25zdCBkYXRlRGVwYXJ0ID0gdHlwZW9mIGRhdGVEZXBhcnR1cmUgIT0gXCJ1bmRlZmluZWRcIlxuICAgICAgPyBkYXRlRGVwYXJ0dXJlXG4gICAgICA6IHR5cGVvZiBkYXRlQXJyaXZhbCAhPSBcInVuZGVmaW5lZFwiXG4gICAgICAgICAgPyBEYXRlVGltZS5ub3coKS5zZXQoZGF0ZUFycml2YWwpLnBsdXMoe2RheXM6IDJ9KVxuICAgICAgICAgIDogZGF0ZUFycml2YWxzLnBsdXMoe2RheXM6IDJ9KTtcbiAgY29uc3QgbmV4dE1vbnRoID0gRGF0ZVRpbWUubm93KCkucGx1cyh7IG1vbnRoczogMSB9KTtcbiAgY29uc3QgbGFzdERheUluTW9udGggPSBuZXh0TW9udGguc2V0KHtkYXk6IG5leHRNb250aC5kYXlzSW5Nb250aH0pXG4gIHJlbmRlckJsb2NrKFxuICAgICdzZWFyY2gtZm9ybS1ibG9jaycsXG4gICAgYFxuICAgIDxmb3JtPlxuICAgICAgPGZpZWxkc2V0IGNsYXNzPVwic2VhcmNoLWZpbGVkc2V0XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cImNpdHlcIj7Qk9C+0YDQvtC0PC9sYWJlbD5cbiAgICAgICAgICAgIDxpbnB1dCBpZD1cImNpdHlcIiB0eXBlPVwidGV4dFwiIHZhbHVlPVwi0KHQsNC90LrRgi3Qn9C10YLQtdGA0LHRg9GA0LNcIiAvPlxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJoaWRkZW5cIiBkaXNhYmxlZCB2YWx1ZT1cIjU5LjkzODYsMzAuMzE0MVwiIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPCEtLTxkaXYgY2xhc3M9XCJwcm92aWRlcnNcIj5cbiAgICAgICAgICAgIDxsYWJlbD48aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgbmFtZT1cInByb3ZpZGVyXCIgdmFsdWU9XCJob215XCIgY2hlY2tlZCAvPiBIb215PC9sYWJlbD5cbiAgICAgICAgICAgIDxsYWJlbD48aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgbmFtZT1cInByb3ZpZGVyXCIgdmFsdWU9XCJmbGF0LXJlbnRcIiBjaGVja2VkIC8+IEZsYXRSZW50PC9sYWJlbD5cbiAgICAgICAgICA8L2Rpdj4tLT5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cImNoZWNrLWluLWRhdGVcIj7QlNCw0YLQsCDQt9Cw0LXQt9C00LA8L2xhYmVsPlxuICAgICAgICAgICAgPGlucHV0IGlkPVwiY2hlY2staW4tZGF0ZVwiIHR5cGU9XCJkYXRlXCIgdmFsdWU9XCIke2RhdGVBcnJpdmFscy50b0lTT0RhdGUoKX1cIiBtaW49XCIke25vd1RpbWUudG9JU09EYXRlKCl9XCIgbWF4PVwiJHtsYXN0RGF5SW5Nb250aC50b0lTT0RhdGUoKX1cIiBuYW1lPVwiY2hlY2tpblwiIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJjaGVjay1vdXQtZGF0ZVwiPtCU0LDRgtCwINCy0YvQtdC30LTQsDwvbGFiZWw+XG4gICAgICAgICAgICA8aW5wdXQgaWQ9XCJjaGVjay1vdXQtZGF0ZVwiIHR5cGU9XCJkYXRlXCIgdmFsdWU9XCIke2RhdGVEZXBhcnQudG9JU09EYXRlKCl9XCIgbWluPVwiJHtkYXRlQXJyaXZhbHMucGx1cyh7ZGF5czoxfSkudG9JU09EYXRlKCl9XCIgbWF4PVwiMjAyMy0wNi0zMFwiIG5hbWU9XCJjaGVja291dFwiIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJtYXgtcHJpY2VcIj7QnNCw0LrRgS4g0YbQtdC90LAg0YHRg9GC0L7QujwvbGFiZWw+XG4gICAgICAgICAgICA8aW5wdXQgaWQ9XCJtYXgtcHJpY2VcIiB0eXBlPVwidGV4dFwiIHZhbHVlPVwiMTAwMDBcIiBuYW1lPVwicHJpY2VcIiBjbGFzcz1cIm1heC1wcmljZVwiIHJlcXVpcmVkIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxkaXY+PGJ1dHRvbiB0eXBlPVwic3VibWl0XCI+0J3QsNC50YLQuDwvYnV0dG9uPjwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZmllbGRzZXQ+XG4gICAgPC9mb3JtPlxuICAgIGBcbiAgKVxufVxuIl19