// import { Injectable } from "@angular/core";
// import faker from 'faker';
// import classList from '../models/classes';


// @Injectable()
// export class createCharacterHelper {
//     constructor() { };

//     classNames = Object.keys(classList);

//     character = {
//         name: '',
//         stats: {},
//         saves: {},
//         health: {},
//     }

//     private initHP(STR) {
//         const baseHP = STR * 2;
//         const halfHP = Math.floor(baseHP / 2);
//         let headHP = 20;
//         if (halfHP < 20) {
//             headHP = halfHP;
//         };
//         return {
//             Head: headHP,
//             Torso: baseHP,
//             ArmR: halfHP,
//             ArmL: halfHP,
//             LegL: halfHP,
//             LegR: halfHP,
//         };
//     }

//     public createNewCharacter() {
//         this.character.name = faker.name.findName();

//         this.character.saves = classList[this.classNames[this.classNames.length * Math.random() << 0]];

//         this.character.stats = {
//             STR: this.character.saves.Bonus.STR + Math.floor(Math.random() * (maxStat - minStat) + minStat),
//             SPD: randomClass.Bonus.SPD + Math.floor(Math.random() * (maxStat - minStat) + minStat),
//             INT: randomClass.Bonus.INT + Math.floor(Math.random() * (maxStat - minStat) + minStat),
//             CMB: randomClass.Bonus.CMB + Math.floor(Math.random() * (maxStat - minStat) + minStat),
//           }

//         const health = this.initHP(this.character.stats.STR);

//         let character = {
//             name: name,
//             stats: stats,
//             saves: randomClass,
//             health: health,
//         };
//         this.charactersService.add(character).subscribe((respond) => {
//             this.characters.push(respond);
//             this.updateService.sendUpdate("Add new");
//         })
//     }

// }

// }
