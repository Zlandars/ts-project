import { renderBlock } from './lib.js';
import { DateTime } from "./luxon.js";

export function renderSearchFormBlock (dateArrival?:Date | DateTime, dateDeparture?:Date | DateTime):void {
  const nowTime:any = DateTime.now();
  const dateArrivals = typeof dateArrival != "undefined" ? dateArrival : nowTime.plus({days:1});
  const dateDepart = typeof dateDeparture != "undefined"
      ? dateDeparture
      : typeof dateArrival != "undefined"
          ? DateTime.now().set(dateArrival).plus({days: 2})
          : dateArrivals.plus({days: 2});
  const nextMonth = DateTime.now().plus({ months: 1 });
  const lastDayInMonth = nextMonth.set({day: nextMonth.daysInMonth})
  renderBlock(
    'search-form-block',
    `
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
            <input id="check-out-date" type="date" value="${dateDepart.toISODate()}" min="${dateArrivals.plus({days:1}).toISODate()}" max="2023-06-30" name="checkout" />
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
    `
  )
}
