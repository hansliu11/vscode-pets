import { PetColor, PetSize, PetSpeed, PetType } from '../common/types';
import { Cat } from './pets/cat';
import { Chicken } from './pets/chicken';
import { Clippy } from './pets/clippy';
import { Cockatiel } from './pets/cockatiel';
import { Crab } from './pets/crab';
import { Dog } from './pets/dog';
import { Fox } from './pets/fox';
import { Mod } from './pets/mod';
import { Rocky } from './pets/rocky';
import { RubberDuck } from './pets/rubberduck';
import { Snake } from './pets/snake';
import { Totoro } from './pets/totoro';
import { Zappy } from './pets/zappy';
import { IPetType } from './states';

type StandardPetArguments = [
    spriteElement: HTMLImageElement,
    collisionElement: HTMLDivElement,
    speechElement: HTMLDivElement,
    size: PetSize,
    left: number,
    bottom: number,
    petRoot: string,
    floor: number,
    name: string,
];

export class PetElement {
    el: HTMLImageElement;
    collision: HTMLDivElement;
    speech: HTMLDivElement;
    pet: IPetType;
    color: PetColor;
    type: PetType;
    remove() {
        this.el.remove();
        this.collision.remove();
        this.speech.remove();
        this.color = PetColor.null;
        this.type = PetType.null;
    }

    constructor(
        el: HTMLImageElement,
        collision: HTMLDivElement,
        speech: HTMLDivElement,
        pet: IPetType,
        color: PetColor,
        type: PetType,
    ) {
        this.el = el;
        this.collision = collision;
        this.speech = speech;
        this.pet = pet;
        this.color = color;
        this.type = type;
    }
}

export interface IPetCollection {
    pets: Array<PetElement>;
    push(pet: PetElement): void;
    reset(): void;
    seekNewFriends(): string[];
    locate(name: string): PetElement | undefined;
    remove(name: string): void;
}

export class PetCollection implements IPetCollection {
    private _pets: Array<PetElement>;

    constructor() {
        this._pets = new Array(0);
    }

    public get pets() {
        return this._pets;
    }

    push(pet: PetElement) {
        this._pets.push(pet);
    }

    reset() {
        this._pets.forEach((pet) => {
            pet.remove();
        });
        this._pets = [];
    }

    locate(name: string): PetElement | undefined {
        return this._pets.find((collection) => {
            return collection.pet.name === name;
        });
    }

    remove(name: string): any {
        this._pets.forEach((pet) => {
            if (pet.pet.name === name) {
                pet.remove();
            }
        });
        this._pets = this._pets.filter((pet) => {
            return pet.pet.name !== name;
        });
    }

    seekNewFriends(): string[] {
        if (this._pets.length <= 1) {
            return [];
        } // You can't be friends with yourself.
        var messages = new Array<string>(0);
        this._pets.forEach((petInCollection) => {
            if (petInCollection.pet.hasFriend) {
                return;
            } // I already have a friend!
            this._pets.forEach((potentialFriend) => {
                if (potentialFriend.pet.hasFriend) {
                    return;
                } // Already has a friend. sorry.
                if (!potentialFriend.pet.canChase) {
                    return;
                } // Pet is busy doing something else.
                if (
                    potentialFriend.pet.left > petInCollection.pet.left &&
                    potentialFriend.pet.left <
                        petInCollection.pet.left + petInCollection.pet.width
                ) {
                    // We found a possible new friend..
                    console.log(
                        petInCollection.pet.name,
                        ' wants to be friends with ',
                        potentialFriend.pet.name,
                        '.',
                    );
                    if (
                        petInCollection.pet.makeFriendsWith(potentialFriend.pet)
                    ) {
                        potentialFriend.pet.showSpeechBubble('❤️', 2000);
                        petInCollection.pet.showSpeechBubble('❤️', 2000);
                    }
                }
            });
        });
        return messages;
    }
}

export class InvalidPetException {
    message?: string;

    constructor(message?: string) {
        this.message = message;
    }
}

export interface PetCreator {
    speed: number;
    createPet(args:StandardPetArguments): IPetType;
}

export class CatCreator implements PetCreator {
    speed = PetSpeed.normal;
    createPet(args:StandardPetArguments): IPetType {
        return new Cat(...args, this.speed);
    }
} 

export class ChickenCreator implements PetCreator {
    speed = PetSpeed.normal;
    createPet(args:StandardPetArguments): IPetType {
        return new Chicken(...args, this.speed);
    }
} 

export class DogCreator implements PetCreator {
    speed = PetSpeed.normal;
    createPet(args:StandardPetArguments): IPetType {
        return new Dog(...args, this.speed);
    }
} 

export class FoxCreator implements PetCreator {
    speed = PetSpeed.fast;
    createPet(args:StandardPetArguments): IPetType {
        return new Fox(...args, this.speed);
    }
} 

export class CrabCreator implements PetCreator {
    speed = PetSpeed.slow;
    createPet(args:StandardPetArguments): IPetType {
        return new Crab(...args, this.speed);
    }
} 

export class ClippyCreator implements PetCreator {
    speed = PetSpeed.slow;
    createPet(args:StandardPetArguments): IPetType {
        return new Clippy(...args, this.speed);
    }
} 

export class ModCreator implements PetCreator {
    speed = PetSpeed.normal;
    createPet(args:StandardPetArguments): IPetType {
        return new Mod(...args, this.speed);
    }
} 

export class TotoroCreator implements PetCreator {
    speed = PetSpeed.normal;
    createPet(args:StandardPetArguments): IPetType {
        return new Totoro(...args, this.speed);
    }
} 

export class SnakeCreator implements PetCreator {
    speed = PetSpeed.verySlow;
    createPet(args:StandardPetArguments): IPetType {
        return new Snake(...args, this.speed);
    }
} 

export class RubberDuckCreator implements PetCreator {
    speed = PetSpeed.fast;
    createPet(args:StandardPetArguments): IPetType {
        return new RubberDuck(...args, this.speed);
    }
} 

export class ZappyCreator implements PetCreator {
    speed = PetSpeed.veryFast;
    createPet(args:StandardPetArguments): IPetType {
        return new Zappy(...args, this.speed);
    }
} 

export class RockyCreator implements PetCreator {
    speed = PetSpeed.still;
    createPet(args:StandardPetArguments): IPetType {
        return new Rocky(...args, this.speed);
    }
} 

export class CockatielCreator implements PetCreator {
    speed = PetSpeed.normal;
    createPet(args:StandardPetArguments): IPetType {
        return new Cockatiel(...args, this.speed);
    }
} 

export function resolveCreator(petType: string): PetCreator {
    switch (petType) {
        case PetType.cat:
            return new CatCreator();
        case PetType.chicken:
            return new ChickenCreator();
        case PetType.dog:
            return new DogCreator();
        case PetType.fox:
            return new FoxCreator();
        case PetType.crab:
            return new CrabCreator();
        case PetType.clippy:
            return new ClippyCreator();
        case PetType.mod:
            return new ModCreator();
        case PetType.totoro:
            return new TotoroCreator();
        case PetType.snake:
            return new SnakeCreator();
        case PetType.rubberduck:
            return new RubberDuckCreator();
        case PetType.zappy:
            return new ZappyCreator();
        case PetType.rocky:
            return new RockyCreator();
        case PetType.cockatiel:
            return new CockatielCreator();
        default:
            throw new InvalidPetException("Pet type doesn't exist");
    }
}

export function availableColors(petType: PetType): PetColor[] {
    switch (petType) {
        case PetType.cat:
            return Cat.possibleColors;
        case PetType.chicken:
            return Chicken.possibleColors;
        case PetType.dog:
            return Dog.possibleColors;
        case PetType.fox:
            return Fox.possibleColors;
        case PetType.crab:
            return Crab.possibleColors;
        case PetType.clippy:
            return Clippy.possibleColors;
        case PetType.mod:
            return Mod.possibleColors;
        case PetType.totoro:
            return Totoro.possibleColors;
        case PetType.snake:
            return Snake.possibleColors;
        case PetType.rubberduck:
            return RubberDuck.possibleColors;
        case PetType.zappy:
            return Zappy.possibleColors;
        case PetType.rocky:
            return Rocky.possibleColors;
        case PetType.cockatiel:
            return Cockatiel.possibleColors;
        default:
            throw new InvalidPetException("Pet type doesn't exist");
    }
}

/**
 * Some pets can only have certain colors, this makes sure they haven't been misconfigured.
 * @param petColor
 * @param petType
 * @returns normalized color
 */
export function normalizeColor(petColor: PetColor, petType: PetType): PetColor {
    const colors = availableColors(petType);
    if (colors.includes(petColor)) {
        return petColor;
    } else {
        return colors[0];
    }
}
