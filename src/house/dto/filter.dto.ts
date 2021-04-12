export class FilterHouseDto {
    readonly maxAge: number;
    readonly minAge: number;
    readonly maxPrice: number;
    readonly minPrice: number;
    readonly maxCover: number;
    readonly minCover: number;
    readonly label: Array<number>;
    readonly Area: Array<number>;
}

export class HouseInfoLite {
    readonly ifStar: boolean;
    readonly ifOrder: boolean;
    readonly house_name: string;
    readonly house_id: number;
    readonly manager_name: string;
}