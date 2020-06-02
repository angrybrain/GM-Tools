export interface Character {
    _id: any,
    name: string,
    active: boolean,
    stress: number,
    resolve: number,
    effects: string,
    items: string,
    notes: string,
    advantages: {
        Stress: boolean,
        STR: boolean,
        SPD: boolean,
        INT: boolean,
        CMB: boolean,
        Sanity: boolean,
        Fear: boolean,
        Body: boolean,
        Armor: boolean,
    }
    disadvantages: {
        Stress: boolean,
        STR: boolean,
        SPD: boolean,
        INT: boolean,
        CMB: boolean,
        Sanity: boolean,
        Fear: boolean,
        Body: boolean,
        Armor: boolean,
    }
    stats: {
        STR: number,
        SPD: number,
        INT: number,
        CMB: number,
    }
    saves: {
        Sanity: number,
        Fear: number,
        Body: number,
        Armor: number,
    }
    health: {
        Head: number,
        Torso: number,
        ArmR: number,
        ArmL: number,
        LegR: number,
        LegL: number,
    }
    armor: {
        Head: number,
        Torso: number,
        ArmR: number,
        ArmL: number,
        LegR: number,
        LegL: number,
    }
}