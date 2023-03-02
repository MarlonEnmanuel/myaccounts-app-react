import { CardDto } from "./CardDto";
import { PersonDto } from "./PersonDto";

export interface InitialDataDto {
    Persons: PersonDto[],
    Cards: CardDto[],
}