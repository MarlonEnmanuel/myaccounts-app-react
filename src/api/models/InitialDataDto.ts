import { CardDto } from "./CardDto";
import { PersonDto } from "./PersonDto";
import { UserDto } from "./UserDto";

export interface InitialDataDto {
    loguedUser: UserDto,
    persons: PersonDto[],
    cards: CardDto[],
}