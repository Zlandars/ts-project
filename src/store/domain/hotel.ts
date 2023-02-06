import {Booking} from './booking.js';

export class Hotel extends Booking {
    constructor(
        private readonly provider: string,
        public readonly origId: number|string,
        public readonly image: string,
        public readonly name: string,
        public readonly description:string,
        public readonly remoteness: number | number[],
        public readonly bookedDates: [number|Date,number|Date],
        public readonly price: number
    ) {
        super(name,origId,bookedDates)
    }
    get id () {
        return this.provider + '-' + this.origId;
    }
    public isProvidedBy (providerName:string): boolean {
        return this.provider === providerName;
    }
}
