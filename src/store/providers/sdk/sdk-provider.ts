import {Provider} from "../../domain/provider.js";
import {Requester} from "../../utils/requester.js";
import {HotelListResponse, HotelResponse, Hotel as SdkHotel} from "./response.js";
import {FlatRentSdk} from "../../../flat-rent-sdk.js";
import {SearchFilter} from "../../domain/searchFilter.js";
import {Hotel} from "../../domain/hotel.js";

const sdk = new FlatRentSdk();

export class SdkProvider implements Provider {
    public static provider = 'sdk';
    
    public find(filter: SearchFilter): Promise<Hotel[]> {
	// @ts-ignore
	return sdk.search(filter).then(response => {
		// @ts-ignore
		response.items = response;
		this.assertIsValidResponse(response);
		return this.convertHotelListResponse(response);
	    })
    }
    
    public getById(id: string): Promise<Hotel> {
	// @ts-ignore
	return Requester.fetchAsJson<HotelResponse>(sdk.get(id))
	    .then(response => {
		console.log(response)
		this.assertIsValidResponse(response)
		return this.convertHotelResponse(response.item)
	    })
    }
    
    private assertIsValidResponse(response: HotelListResponse | HotelResponse): void {
	if (response.error != null) {
	    throw new Error(response.error)
	}
    }
    //
    // private convertFilterToQueryString(filter: SearchFilter): string {
	// return `coordinates=${filter.coordinates}&checkInDate=${filter.checkInDate}&checkOutDate=${filter.checkOutDate}&maxPrice=${filter.maxPrice}`
    // }
    //
    private convertHotelListResponse(response: HotelListResponse): Hotel[] {
	return response.items.map(item => {
	    return this.convertHotelResponse(item)
	})
    }
    
    private convertHotelResponse(item: SdkHotel): Hotel {
	return new Hotel(
	    SdkProvider.provider,
	    item.id,
	    item.photos[0] == null ? '/img/error.jpg' : item.photos[0],
	    item.title,
	    item.details,
	    item.coordinates,
	    item.bookedDate == null ? [0,0] : item.bookedDate,
	    item.totalPrice
	)
    }
}