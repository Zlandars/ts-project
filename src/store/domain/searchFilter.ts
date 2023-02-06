export interface SearchFilter {
    city?: string,
    coordinates?: string,
    checkInDate: [number,Date],
    checkOutDate: [number,Date],
    maxPrice: number
}