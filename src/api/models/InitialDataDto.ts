import { CardDto } from "./CardDto";
import { PersonDto } from "./PersonDto";

export interface InitialDataDto {
    user: {
        id: number,
        name: string,
        personId: number,
    },
    persons: PersonDto[],
    cards: CardDto[],
}