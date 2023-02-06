export interface HotelListResponse {
    error?:string,
    items: Hotel[]
}
export interface HotelResponse {
    error?: string,
    item: Hotel
}
export interface Hotel {
    id: string,
    title: string,
    details: string,
    photos: string[],
    coordinates: number,
    bookedDate: [number|Date,number|Date],
    totalPrice: number
}



