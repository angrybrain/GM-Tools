import { Injectable } from "@angular/core";
import faker from 'faker';
import classList from '../models/classes';


@Injectable()
export class GenerateCharacterHelper {
    constructor() { };

    private initHP(characterSTR: number) {
        const baseHP = characterSTR * 2;
        const halfHP = Math.floor(baseHP / 2);
        let headHP = 20;
        if (halfHP < 20) {
            headHP = halfHP;
        };
        return {
            Head: headHP,
            Torso: baseHP,
            ArmR: halfHP,
            ArmL: halfHP,
            LegL: halfHP,
            LegR: halfHP,
        }
    }

    private randomiseClass() {
        let classNames = Object.keys(classList);
        return classList[classNames[classNames.length * Math.random() << 0]];
    }

    private randomiseStats(classBonuses) {
        const maxStat = 60;
        const minStat = 6;
        return {
            STR: classBonuses.STR + Math.floor(Math.random() * (maxStat - minStat) + minStat),
            SPD: classBonuses.SPD + Math.floor(Math.random() * (maxStat - minStat) + minStat),
            INT: classBonuses.INT + Math.floor(Math.random() * (maxStat - minStat) + minStat),
            CMB: classBonuses.CMB + Math.floor(Math.random() * (maxStat - minStat) + minStat),
        }
    }

    public new() {
        const name = faker.name.findName();
        const characterClass = this.randomiseClass();
        const stats = this.randomiseStats(characterClass.Bonus);
        const health = this.initHP(stats.STR);

        return {
            name,
            saves: characterClass,
            stats,
            health,
        };
    }

}
