import {Hotel} from "../../domain/hotel.js";
import {Provider} from "../../domain/provider.js";
import {SearchFilter} from "../../domain/searchFilter.js";
import {Requester} from "../../utils/requester.js";
import {HotelListResponse, HotelResponse, Hotel as HomyHotel} from "./response.js";

export class HomyProvider implements Provider {
    public static provider = 'homy';
    private static apiUrl = 'http://localhost:3030';
    
    public find(filter: SearchFilter): Promise<Hotel[]> {
	return Requester.fetchAsJson<HotelListResponse>(HomyProvider.apiUrl + '/places?' + this.convertFilterToQueryString(filter))
	    .then(response => {
		// Делал по примеру и не придумал лучшего костыля, чтобы и ошибку обработать  в одном интерфейсе
		// @ts-ignore
		response.items = response;
		this.assertIsValidResponse(response);
		return this.convertHotelListResponse(response);
	    })
    }
    
    public getById(id: string): Promise<Hotel> {
	return Requester.fetchAsJson<HotelResponse>(HomyProvider.apiUrl + '/places/' + id)
	    .then(response => {
		this.assertIsValidResponse(response)
		return this.convertHotelResponse(response.item)
	    })
    }
    
    private assertIsValidResponse(response: HotelListResponse | HotelResponse): void {
	if (response.error != null) {
	    throw new Error(response.error)
	}
    }
    
    private convertFilterToQueryString(filter: SearchFilter): string {
	return `coordinates=${filter.coordinates}&checkInDate=${filter.checkInDate[0]}&checkOutDate=${filter.checkOutDate[0]}&maxPrice=${filter.maxPrice}`
    }
    
    private convertHotelListResponse(response: HotelListResponse): Hotel[] {
	return response.items.map(item => {
	    return this.convertHotelResponse(item)
	})
    }
    
    private convertHotelResponse(item: HomyHotel): Hotel {
	return new Hotel(
	    HomyProvider.provider,
	    item.id,
	    item.image,
	    item.name,
	    item.description,
	    item.remoteness,
	    item.bookedDate,
	    item.price
	)
    }
}