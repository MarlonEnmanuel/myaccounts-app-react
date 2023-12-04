import { CardAuthDto } from "./CardAuthDto";
import { PersonAuthDto } from "./PersonAuthDto";
import { UserAuthDto } from "./UserAuthDto";

export interface AuthDataDto {
    user: UserAuthDto,
    persons: PersonAuthDto[],
    cards: CardAuthDto[],
}