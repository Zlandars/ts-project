import { Requester } from "../../utils/requester.js";
import { FlatRentSdk } from "../../../flat-rent-sdk.js";
import { Hotel } from "../../domain/hotel.js";
const sdk = new FlatRentSdk();
export class SdkProvider {
    find(filter) {
        // @ts-ignore
        return sdk.search(filter).then(response => {
            // @ts-ignore
            response.items = response;
            this.assertIsValidResponse(response);
            return this.convertHotelListResponse(response);
        });
    }
    getById(id) {
        // @ts-ignore
        return Requester.fetchAsJson(sdk.get(id))
            .then(response => {
            console.log(response);
            this.assertIsValidResponse(response);
            return this.convertHotelResponse(response.item);
        });
    }
    assertIsValidResponse(response) {
        if (response.error != null) {
            throw new Error(response.error);
        }
    }
    //
    // private convertFilterToQueryString(filter: SearchFilter): string {
    // return `coordinates=${filter.coordinates}&checkInDate=${filter.checkInDate}&checkOutDate=${filter.checkOutDate}&maxPrice=${filter.maxPrice}`
    // }
    //
    convertHotelListResponse(response) {
        return response.items.map(item => {
            return this.convertHotelResponse(item);
        });
    }
    convertHotelResponse(item) {
        return new Hotel(SdkProvider.provider, item.id, item.photos[0] == null ? '/img/error.jpg' : item.photos[0], item.title, item.details, item.coordinates, item.bookedDate == null ? [0, 0] : item.bookedDate, item.totalPrice);
    }
}
SdkProvider.provider = 'sdk';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2RrLXByb3ZpZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL3N0b3JlL3Byb3ZpZGVycy9zZGsvc2RrLXByb3ZpZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUVuRCxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFFdEQsT0FBTyxFQUFDLEtBQUssRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBRTVDLE1BQU0sR0FBRyxHQUFHLElBQUksV0FBVyxFQUFFLENBQUM7QUFFOUIsTUFBTSxPQUFPLFdBQVc7SUFHYixJQUFJLENBQUMsTUFBb0I7UUFDbkMsYUFBYTtRQUNiLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDekMsYUFBYTtZQUNiLFFBQVEsQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDO1lBQzFCLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNyQyxPQUFPLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM1QyxDQUFDLENBQUMsQ0FBQTtJQUNILENBQUM7SUFFTSxPQUFPLENBQUMsRUFBVTtRQUM1QixhQUFhO1FBQ2IsT0FBTyxTQUFTLENBQUMsV0FBVyxDQUFnQixHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQ25ELElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUNwQixPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFBO1lBQ3JCLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxRQUFRLENBQUMsQ0FBQTtZQUNwQyxPQUFPLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDNUMsQ0FBQyxDQUFDLENBQUE7SUFDSCxDQUFDO0lBRU8scUJBQXFCLENBQUMsUUFBMkM7UUFDNUUsSUFBSSxRQUFRLENBQUMsS0FBSyxJQUFJLElBQUksRUFBRTtZQUN4QixNQUFNLElBQUksS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQTtTQUNsQztJQUNFLENBQUM7SUFDRCxFQUFFO0lBQ0YscUVBQXFFO0lBQ3hFLCtJQUErSTtJQUM1SSxJQUFJO0lBQ0osRUFBRTtJQUNNLHdCQUF3QixDQUFDLFFBQTJCO1FBQy9ELE9BQU8sUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDN0IsT0FBTyxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDMUMsQ0FBQyxDQUFDLENBQUE7SUFDQyxDQUFDO0lBRU8sb0JBQW9CLENBQUMsSUFBYztRQUM5QyxPQUFPLElBQUksS0FBSyxDQUNaLFdBQVcsQ0FBQyxRQUFRLEVBQ3BCLElBQUksQ0FBQyxFQUFFLEVBQ1AsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUMxRCxJQUFJLENBQUMsS0FBSyxFQUNWLElBQUksQ0FBQyxPQUFPLEVBQ1osSUFBSSxDQUFDLFdBQVcsRUFDaEIsSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUNqRCxJQUFJLENBQUMsVUFBVSxDQUNsQixDQUFBO0lBQ0UsQ0FBQzs7QUFqRGEsb0JBQVEsR0FBRyxLQUFLLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1Byb3ZpZGVyfSBmcm9tIFwiLi4vLi4vZG9tYWluL3Byb3ZpZGVyLmpzXCI7XG5pbXBvcnQge1JlcXVlc3Rlcn0gZnJvbSBcIi4uLy4uL3V0aWxzL3JlcXVlc3Rlci5qc1wiO1xuaW1wb3J0IHtIb3RlbExpc3RSZXNwb25zZSwgSG90ZWxSZXNwb25zZSwgSG90ZWwgYXMgU2RrSG90ZWx9IGZyb20gXCIuL3Jlc3BvbnNlLmpzXCI7XG5pbXBvcnQge0ZsYXRSZW50U2RrfSBmcm9tIFwiLi4vLi4vLi4vZmxhdC1yZW50LXNkay5qc1wiO1xuaW1wb3J0IHtTZWFyY2hGaWx0ZXJ9IGZyb20gXCIuLi8uLi9kb21haW4vc2VhcmNoRmlsdGVyLmpzXCI7XG5pbXBvcnQge0hvdGVsfSBmcm9tIFwiLi4vLi4vZG9tYWluL2hvdGVsLmpzXCI7XG5cbmNvbnN0IHNkayA9IG5ldyBGbGF0UmVudFNkaygpO1xuXG5leHBvcnQgY2xhc3MgU2RrUHJvdmlkZXIgaW1wbGVtZW50cyBQcm92aWRlciB7XG4gICAgcHVibGljIHN0YXRpYyBwcm92aWRlciA9ICdzZGsnO1xuICAgIFxuICAgIHB1YmxpYyBmaW5kKGZpbHRlcjogU2VhcmNoRmlsdGVyKTogUHJvbWlzZTxIb3RlbFtdPiB7XG5cdC8vIEB0cy1pZ25vcmVcblx0cmV0dXJuIHNkay5zZWFyY2goZmlsdGVyKS50aGVuKHJlc3BvbnNlID0+IHtcblx0XHQvLyBAdHMtaWdub3JlXG5cdFx0cmVzcG9uc2UuaXRlbXMgPSByZXNwb25zZTtcblx0XHR0aGlzLmFzc2VydElzVmFsaWRSZXNwb25zZShyZXNwb25zZSk7XG5cdFx0cmV0dXJuIHRoaXMuY29udmVydEhvdGVsTGlzdFJlc3BvbnNlKHJlc3BvbnNlKTtcblx0ICAgIH0pXG4gICAgfVxuICAgIFxuICAgIHB1YmxpYyBnZXRCeUlkKGlkOiBzdHJpbmcpOiBQcm9taXNlPEhvdGVsPiB7XG5cdC8vIEB0cy1pZ25vcmVcblx0cmV0dXJuIFJlcXVlc3Rlci5mZXRjaEFzSnNvbjxIb3RlbFJlc3BvbnNlPihzZGsuZ2V0KGlkKSlcblx0ICAgIC50aGVuKHJlc3BvbnNlID0+IHtcblx0XHRjb25zb2xlLmxvZyhyZXNwb25zZSlcblx0XHR0aGlzLmFzc2VydElzVmFsaWRSZXNwb25zZShyZXNwb25zZSlcblx0XHRyZXR1cm4gdGhpcy5jb252ZXJ0SG90ZWxSZXNwb25zZShyZXNwb25zZS5pdGVtKVxuXHQgICAgfSlcbiAgICB9XG4gICAgXG4gICAgcHJpdmF0ZSBhc3NlcnRJc1ZhbGlkUmVzcG9uc2UocmVzcG9uc2U6IEhvdGVsTGlzdFJlc3BvbnNlIHwgSG90ZWxSZXNwb25zZSk6IHZvaWQge1xuXHRpZiAocmVzcG9uc2UuZXJyb3IgIT0gbnVsbCkge1xuXHQgICAgdGhyb3cgbmV3IEVycm9yKHJlc3BvbnNlLmVycm9yKVxuXHR9XG4gICAgfVxuICAgIC8vXG4gICAgLy8gcHJpdmF0ZSBjb252ZXJ0RmlsdGVyVG9RdWVyeVN0cmluZyhmaWx0ZXI6IFNlYXJjaEZpbHRlcik6IHN0cmluZyB7XG5cdC8vIHJldHVybiBgY29vcmRpbmF0ZXM9JHtmaWx0ZXIuY29vcmRpbmF0ZXN9JmNoZWNrSW5EYXRlPSR7ZmlsdGVyLmNoZWNrSW5EYXRlfSZjaGVja091dERhdGU9JHtmaWx0ZXIuY2hlY2tPdXREYXRlfSZtYXhQcmljZT0ke2ZpbHRlci5tYXhQcmljZX1gXG4gICAgLy8gfVxuICAgIC8vXG4gICAgcHJpdmF0ZSBjb252ZXJ0SG90ZWxMaXN0UmVzcG9uc2UocmVzcG9uc2U6IEhvdGVsTGlzdFJlc3BvbnNlKTogSG90ZWxbXSB7XG5cdHJldHVybiByZXNwb25zZS5pdGVtcy5tYXAoaXRlbSA9PiB7XG5cdCAgICByZXR1cm4gdGhpcy5jb252ZXJ0SG90ZWxSZXNwb25zZShpdGVtKVxuXHR9KVxuICAgIH1cbiAgICBcbiAgICBwcml2YXRlIGNvbnZlcnRIb3RlbFJlc3BvbnNlKGl0ZW06IFNka0hvdGVsKTogSG90ZWwge1xuXHRyZXR1cm4gbmV3IEhvdGVsKFxuXHQgICAgU2RrUHJvdmlkZXIucHJvdmlkZXIsXG5cdCAgICBpdGVtLmlkLFxuXHQgICAgaXRlbS5waG90b3NbMF0gPT0gbnVsbCA/ICcvaW1nL2Vycm9yLmpwZycgOiBpdGVtLnBob3Rvc1swXSxcblx0ICAgIGl0ZW0udGl0bGUsXG5cdCAgICBpdGVtLmRldGFpbHMsXG5cdCAgICBpdGVtLmNvb3JkaW5hdGVzLFxuXHQgICAgaXRlbS5ib29rZWREYXRlID09IG51bGwgPyBbMCwwXSA6IGl0ZW0uYm9va2VkRGF0ZSxcblx0ICAgIGl0ZW0udG90YWxQcmljZVxuXHQpXG4gICAgfVxufSJdfQ==