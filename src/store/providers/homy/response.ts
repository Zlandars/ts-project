export interface HotelListResponse {
    error?:string,
    items: Hotel[]
}
export interface HotelResponse {
    error?: string,
    item: Hotel
}

export interface Hotel {
    id: number,
    name: string,
    description: string,
    image: string,
    remoteness: number,
    bookedDate: [number|Date,number|Date],
    price: number
}



