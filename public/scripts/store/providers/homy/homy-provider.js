import { Hotel } from "../../domain/hotel.js";
import { Requester } from "../../utils/requester.js";
export class HomyProvider {
    find(filter) {
        return Requester.fetchAsJson(HomyProvider.apiUrl + '/places?' + this.convertFilterToQueryString(filter))
            .then(response => {
            // Делал по примеру и не придумал лучшего костыля, чтобы и ошибку обработать  в одном интерфейсе
            // @ts-ignore
            response.items = response;
            this.assertIsValidResponse(response);
            return this.convertHotelListResponse(response);
        });
    }
    getById(id) {
        return Requester.fetchAsJson(HomyProvider.apiUrl + '/places/' + id)
            .then(response => {
            this.assertIsValidResponse(response);
            return this.convertHotelResponse(response.item);
        });
    }
    assertIsValidResponse(response) {
        if (response.error != null) {
            throw new Error(response.error);
        }
    }
    convertFilterToQueryString(filter) {
        return `coordinates=${filter.coordinates}&checkInDate=${filter.checkInDate[0]}&checkOutDate=${filter.checkOutDate[0]}&maxPrice=${filter.maxPrice}`;
    }
    convertHotelListResponse(response) {
        return response.items.map(item => {
            return this.convertHotelResponse(item);
        });
    }
    convertHotelResponse(item) {
        return new Hotel(HomyProvider.provider, item.id, item.image, item.name, item.description, item.remoteness, item.bookedDate, item.price);
    }
}
HomyProvider.provider = 'homy';
HomyProvider.apiUrl = 'http://localhost:3030';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9teS1wcm92aWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9zdG9yZS9wcm92aWRlcnMvaG9teS9ob215LXByb3ZpZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxLQUFLLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUc1QyxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFHbkQsTUFBTSxPQUFPLFlBQVk7SUFJZCxJQUFJLENBQUMsTUFBb0I7UUFDbkMsT0FBTyxTQUFTLENBQUMsV0FBVyxDQUFvQixZQUFZLENBQUMsTUFBTSxHQUFHLFVBQVUsR0FBRyxJQUFJLENBQUMsMEJBQTBCLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDdEgsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ3BCLGdHQUFnRztZQUNoRyxhQUFhO1lBQ2IsUUFBUSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUM7WUFDMUIsSUFBSSxDQUFDLHFCQUFxQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3JDLE9BQU8sSUFBSSxDQUFDLHdCQUF3QixDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzVDLENBQUMsQ0FBQyxDQUFBO0lBQ0gsQ0FBQztJQUVNLE9BQU8sQ0FBQyxFQUFVO1FBQzVCLE9BQU8sU0FBUyxDQUFDLFdBQVcsQ0FBZ0IsWUFBWSxDQUFDLE1BQU0sR0FBRyxVQUFVLEdBQUcsRUFBRSxDQUFDO2FBQzdFLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUNwQixJQUFJLENBQUMscUJBQXFCLENBQUMsUUFBUSxDQUFDLENBQUE7WUFDcEMsT0FBTyxJQUFJLENBQUMsb0JBQW9CLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQzVDLENBQUMsQ0FBQyxDQUFBO0lBQ0gsQ0FBQztJQUVPLHFCQUFxQixDQUFDLFFBQTJDO1FBQzVFLElBQUksUUFBUSxDQUFDLEtBQUssSUFBSSxJQUFJLEVBQUU7WUFDeEIsTUFBTSxJQUFJLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUE7U0FDbEM7SUFDRSxDQUFDO0lBRU8sMEJBQTBCLENBQUMsTUFBb0I7UUFDMUQsT0FBTyxlQUFlLE1BQU0sQ0FBQyxXQUFXLGdCQUFnQixNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxpQkFBaUIsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsYUFBYSxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUE7SUFDL0ksQ0FBQztJQUVPLHdCQUF3QixDQUFDLFFBQTJCO1FBQy9ELE9BQU8sUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDN0IsT0FBTyxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDMUMsQ0FBQyxDQUFDLENBQUE7SUFDQyxDQUFDO0lBRU8sb0JBQW9CLENBQUMsSUFBZTtRQUMvQyxPQUFPLElBQUksS0FBSyxDQUNaLFlBQVksQ0FBQyxRQUFRLEVBQ3JCLElBQUksQ0FBQyxFQUFFLEVBQ1AsSUFBSSxDQUFDLEtBQUssRUFDVixJQUFJLENBQUMsSUFBSSxFQUNULElBQUksQ0FBQyxXQUFXLEVBQ2hCLElBQUksQ0FBQyxVQUFVLEVBQ2YsSUFBSSxDQUFDLFVBQVUsRUFDZixJQUFJLENBQUMsS0FBSyxDQUNiLENBQUE7SUFDRSxDQUFDOztBQWpEYSxxQkFBUSxHQUFHLE1BQU0sQ0FBQztBQUNqQixtQkFBTSxHQUFHLHVCQUF1QixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtIb3RlbH0gZnJvbSBcIi4uLy4uL2RvbWFpbi9ob3RlbC5qc1wiO1xuaW1wb3J0IHtQcm92aWRlcn0gZnJvbSBcIi4uLy4uL2RvbWFpbi9wcm92aWRlci5qc1wiO1xuaW1wb3J0IHtTZWFyY2hGaWx0ZXJ9IGZyb20gXCIuLi8uLi9kb21haW4vc2VhcmNoRmlsdGVyLmpzXCI7XG5pbXBvcnQge1JlcXVlc3Rlcn0gZnJvbSBcIi4uLy4uL3V0aWxzL3JlcXVlc3Rlci5qc1wiO1xuaW1wb3J0IHtIb3RlbExpc3RSZXNwb25zZSwgSG90ZWxSZXNwb25zZSwgSG90ZWwgYXMgSG9teUhvdGVsfSBmcm9tIFwiLi9yZXNwb25zZS5qc1wiO1xuXG5leHBvcnQgY2xhc3MgSG9teVByb3ZpZGVyIGltcGxlbWVudHMgUHJvdmlkZXIge1xuICAgIHB1YmxpYyBzdGF0aWMgcHJvdmlkZXIgPSAnaG9teSc7XG4gICAgcHJpdmF0ZSBzdGF0aWMgYXBpVXJsID0gJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAzMCc7XG4gICAgXG4gICAgcHVibGljIGZpbmQoZmlsdGVyOiBTZWFyY2hGaWx0ZXIpOiBQcm9taXNlPEhvdGVsW10+IHtcblx0cmV0dXJuIFJlcXVlc3Rlci5mZXRjaEFzSnNvbjxIb3RlbExpc3RSZXNwb25zZT4oSG9teVByb3ZpZGVyLmFwaVVybCArICcvcGxhY2VzPycgKyB0aGlzLmNvbnZlcnRGaWx0ZXJUb1F1ZXJ5U3RyaW5nKGZpbHRlcikpXG5cdCAgICAudGhlbihyZXNwb25zZSA9PiB7XG5cdFx0Ly8g0JTQtdC70LDQuyDQv9C+INC/0YDQuNC80LXRgNGDINC4INC90LUg0L/RgNC40LTRg9C80LDQuyDQu9GD0YfRiNC10LPQviDQutC+0YHRgtGL0LvRjywg0YfRgtC+0LHRiyDQuCDQvtGI0LjQsdC60YMg0L7QsdGA0LDQsdC+0YLQsNGC0YwgINCyINC+0LTQvdC+0Lwg0LjQvdGC0LXRgNGE0LXQudGB0LVcblx0XHQvLyBAdHMtaWdub3JlXG5cdFx0cmVzcG9uc2UuaXRlbXMgPSByZXNwb25zZTtcblx0XHR0aGlzLmFzc2VydElzVmFsaWRSZXNwb25zZShyZXNwb25zZSk7XG5cdFx0cmV0dXJuIHRoaXMuY29udmVydEhvdGVsTGlzdFJlc3BvbnNlKHJlc3BvbnNlKTtcblx0ICAgIH0pXG4gICAgfVxuICAgIFxuICAgIHB1YmxpYyBnZXRCeUlkKGlkOiBzdHJpbmcpOiBQcm9taXNlPEhvdGVsPiB7XG5cdHJldHVybiBSZXF1ZXN0ZXIuZmV0Y2hBc0pzb248SG90ZWxSZXNwb25zZT4oSG9teVByb3ZpZGVyLmFwaVVybCArICcvcGxhY2VzLycgKyBpZClcblx0ICAgIC50aGVuKHJlc3BvbnNlID0+IHtcblx0XHR0aGlzLmFzc2VydElzVmFsaWRSZXNwb25zZShyZXNwb25zZSlcblx0XHRyZXR1cm4gdGhpcy5jb252ZXJ0SG90ZWxSZXNwb25zZShyZXNwb25zZS5pdGVtKVxuXHQgICAgfSlcbiAgICB9XG4gICAgXG4gICAgcHJpdmF0ZSBhc3NlcnRJc1ZhbGlkUmVzcG9uc2UocmVzcG9uc2U6IEhvdGVsTGlzdFJlc3BvbnNlIHwgSG90ZWxSZXNwb25zZSk6IHZvaWQge1xuXHRpZiAocmVzcG9uc2UuZXJyb3IgIT0gbnVsbCkge1xuXHQgICAgdGhyb3cgbmV3IEVycm9yKHJlc3BvbnNlLmVycm9yKVxuXHR9XG4gICAgfVxuICAgIFxuICAgIHByaXZhdGUgY29udmVydEZpbHRlclRvUXVlcnlTdHJpbmcoZmlsdGVyOiBTZWFyY2hGaWx0ZXIpOiBzdHJpbmcge1xuXHRyZXR1cm4gYGNvb3JkaW5hdGVzPSR7ZmlsdGVyLmNvb3JkaW5hdGVzfSZjaGVja0luRGF0ZT0ke2ZpbHRlci5jaGVja0luRGF0ZVswXX0mY2hlY2tPdXREYXRlPSR7ZmlsdGVyLmNoZWNrT3V0RGF0ZVswXX0mbWF4UHJpY2U9JHtmaWx0ZXIubWF4UHJpY2V9YFxuICAgIH1cbiAgICBcbiAgICBwcml2YXRlIGNvbnZlcnRIb3RlbExpc3RSZXNwb25zZShyZXNwb25zZTogSG90ZWxMaXN0UmVzcG9uc2UpOiBIb3RlbFtdIHtcblx0cmV0dXJuIHJlc3BvbnNlLml0ZW1zLm1hcChpdGVtID0+IHtcblx0ICAgIHJldHVybiB0aGlzLmNvbnZlcnRIb3RlbFJlc3BvbnNlKGl0ZW0pXG5cdH0pXG4gICAgfVxuICAgIFxuICAgIHByaXZhdGUgY29udmVydEhvdGVsUmVzcG9uc2UoaXRlbTogSG9teUhvdGVsKTogSG90ZWwge1xuXHRyZXR1cm4gbmV3IEhvdGVsKFxuXHQgICAgSG9teVByb3ZpZGVyLnByb3ZpZGVyLFxuXHQgICAgaXRlbS5pZCxcblx0ICAgIGl0ZW0uaW1hZ2UsXG5cdCAgICBpdGVtLm5hbWUsXG5cdCAgICBpdGVtLmRlc2NyaXB0aW9uLFxuXHQgICAgaXRlbS5yZW1vdGVuZXNzLFxuXHQgICAgaXRlbS5ib29rZWREYXRlLFxuXHQgICAgaXRlbS5wcmljZVxuXHQpXG4gICAgfVxufSJdfQ==