import {
    ChaseFriendState,
    ClimbWallLeftState,
    IdleWithBallState,
    IPetType,
    IState,
    JumpDownLeftState,
    LandState,
    LieState,
    RunLeftState,
    RunRightState,
    SitIdleState,
    SwipeState,
    WalkLeftState,
    WalkRightState,
    WallHangLeftState,
    States
} from './states';

export function resolveStateCreator(state: string): StateCreator {
    switch (state) {
        case States.sitIdle:
            return new SitIdleStateCreator();
        case States.walkRight:
            return new WalkRightStateCreator();
        case States.walkLeft:
            return new WalkLeftStateCreator();
        case States.runRight:
            return new RunRightStateCreator();
        case States.runLeft:
            return new RunLeftStateCreator();
        case States.lie:
            return new LieStateCreator();
        case States.wallHangLeft:
            return new WallHangLeftStateCreator();
        case States.climbWallLeft:
            return new ClimbWallLeftStateCreator();
        case States.jumpDownLeft:
            return new JumpDownLeftStateCreator();
        case States.land:
            return new LandStateCreator();
        case States.swipe:
            return new SwipeStateCreator();
        case States.idleWithBall:
            return new IdleWithBallStateCreator();
        case States.chaseFriend:
            return new ChaseFriendStateCreator();
    }
    return new SitIdleStateCreator();
}


export interface StateCreator {
    createState(pet: IPetType): IState;
}

export class SitIdleStateCreator implements StateCreator {
    createState(pet: IPetType) {
        return new SitIdleState(pet);
    }
}

export class WalkRightStateCreator implements StateCreator {
    createState(pet: IPetType) {
        return new WalkRightState(pet);
    }
}

export class WalkLeftStateCreator implements StateCreator {
    createState(pet: IPetType) {
        return new WalkLeftState(pet);
    }
}

export class RunRightStateCreator implements StateCreator {
    createState(pet: IPetType) {
        return new RunRightState(pet);
    }
}

export class RunLeftStateCreator implements StateCreator {
    createState(pet: IPetType) {
        return new RunLeftState(pet);
    }
}

export class LieStateCreator implements StateCreator {
    createState(pet: IPetType) {
        return new LieState(pet);
    }
} 

export class WallHangLeftStateCreator implements StateCreator {
    createState(pet: IPetType) {
        return new WallHangLeftState(pet);
    }
} 

export class ClimbWallLeftStateCreator implements StateCreator {
    createState(pet: IPetType) {
        return new ClimbWallLeftState(pet);
    }
} 

export class JumpDownLeftStateCreator implements StateCreator {
    createState(pet: IPetType) {
        return new JumpDownLeftState(pet);
    }
} 

export class LandStateCreator implements StateCreator {
    createState(pet: IPetType) {
        return new LandState(pet);
    }
} 

export class SwipeStateCreator implements StateCreator {
    createState(pet: IPetType) {
        return new SwipeState(pet);
    }
} 

export class IdleWithBallStateCreator implements StateCreator {
    createState(pet: IPetType) {
        return new IdleWithBallState(pet);
    }
} 

export class ChaseFriendStateCreator implements StateCreator {
    createState(pet: IPetType) {
        return new ChaseFriendState(pet);
    }
} 
