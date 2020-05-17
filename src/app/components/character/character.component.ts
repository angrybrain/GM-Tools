import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { Character } from '../../models/character'

@Component({
  selector: 'gm-tools-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit {

  @Input() character: Character
  @Output() delete = new EventEmitter<Character>();
  @Output() save = new EventEmitter<Character>();

  constructor() { }

  ngOnInit(): void {
  }

  dead: boolean = false;
  toggle = false;

  toggleConfig() {
    this.toggle = !this.toggle;
  }


  panicEffects(value: number) {
    let effect: string;
    if (value >= 0 && value <= 3) {
      effect = 'Laser Focus: Advantage on all rolls for the next 1d10 hours';
    } else if (value >= 4 && value <= 5) {
      effect = 'Major Adrenaline Rush: Advantage on all rolld for the next 3d10 minutes';
    } else if (value >= 6 && value <= 7) {
      effect = 'Minor Adrenaline Rush: Advantage on all rolls for the next 1d10 minutes';
    } else if (value >= 8 && value <= 9) {
      effect = 'Anxious: Gain 1 Stress';
    } else if (value >= 10 && value <= 11) {
      effect = 'Nervous thitch: Gain 2 Stress. The nearest crew member also gains 1 Stress';
    } else if (value >= 12 && value <= 13) {
      effect = 'Cowardice: Gain 1 Stress. For the next 1d10 hours you must make a Fear Save to engage in combat or else flee';
    } else if (value >= 14 && value <= 15) {
      effect = 'Hallucinations: For the newxt 2d10 hours(determined secretly) you have trouble distinguishing between reality and fantasy';
    } else if (value >= 16 && value <= 17) {
      effect = 'Cripping Fear: Gain a new permanent phobia. Whenever you encounter this phobia make a Fear Save at Disadvantage of gain 1d10 Stress';
    } else if (value >= 18 && value <= 19) {
      effect = 'Owerhelmed: Gain 1d10 Stress';
    } else if (value >= 20 && value <= 21) {
      effect = 'Rattled: Let out a blood-curdling scream! Disadvantage on rolls for 2d10 minutes';
    } else if (value == 22) {
      effect = 'Paranoid: For he next 1d10 days, whenever a character joins your group make a Fear Save or gain 1 Stress';
    } else if (value == 23) {
      effect = 'Death Drive: For the next Xd10 days(where X=Stress) whenever you encounter a stranger or known enemy you must make a Sanity Save or else immediately attack them';
    } else if (value == 24) {
      effect = 'Catatonic: Become unresponsive and unmoving for Xd10 minutes(where X=Stress)';
    } else if (value == 25) {
      effect = 'Broken: Fort the next Xd10 days(where X=Stress) make a Panic Check whenever a nearby crew member fails a Save';
    } else if (value == 26) {
      effect = 'Psychotic: Immediately attack the closest crew member until you do at least 2d10 Damage. If there is no crew member nearby you attack the enviroment';
    } else if (value == 27) {
      effect = 'Compouding Problems: Roll twice on this table(page 8)';
    } else if (value == 28) {
      effect = 'Descent into Madness: Gain 2 new phobias! Your Stress cannot be relieved below 5.';
    } else if (value == 29) {
      effect = 'Psychological Collapse: You become permanently, irreparably insane, Your character is now played by the GM';
    } else if (value >= 30) {
      effect = 'Hearth Attack: Instant death';
    }
    return effect;
  }

  isCriticalRoll(value: number) {
    let critical: boolean = false;
    let digits: string = value.toString()
    if (digits[0] === digits[1]) {
      critical = true;
    }
    return critical;
  }

  betterValue(appropriateValue: number, firstValue: number, secondValue: number) {
    const firstValuePassed: Boolean = (firstValue < appropriateValue);
    const secondValuePassed: Boolean = (secondValue < appropriateValue);
    const firstValueCritical: Boolean = (this.isCriticalRoll(firstValue));
    const secondValueCritical: Boolean = (this.isCriticalRoll(secondValue));

    let result: number;


    if (firstValuePassed && secondValuePassed) {
      if (firstValueCritical == secondValueCritical) {
        result = (firstValue < secondValue) ? firstValue : secondValue;
      } else if (firstValueCritical) {
        result = firstValue;
      } else if (secondValueCritical) {
        result = secondValue;
      }
    } else if (firstValuePassed) {
      result = firstValue;
    } else if (secondValuePassed) {
      result = secondValue;
    } else {
      if (firstValueCritical == secondValueCritical) {
        result = (firstValue < secondValue) ? firstValue : secondValue;
      } else if (firstValueCritical) {
        result = secondValue;
      } else if (secondValueCritical) {
        result = firstValue;
      }
    }

    return result;
  }

  worstValue(appropriateValue: number, firstValue: number, secondValue: number) {
    const better = this.betterValue(appropriateValue, firstValue, secondValue);
    let result: number = firstValue;
    if (better == firstValue) {
      result = secondValue;
    }
    return result;
  }

  damageCheck(health: number, dmg: number, isCriticalRoll: boolean = false) {
    if (isCriticalRoll || Math.round(health / 2) < dmg) {
      this.panicCheck();
    }
    health -= dmg;
    if (health <= 0) {
      this.dead = true;
    }
    return health;
  }

  armorCheck(armor: number, dmg: number, isCriticalRoll: boolean = false) {
    if (isCriticalRoll) {
      armor = armor / 2;
    }
    dmg -= armor;
    dmg = (dmg < 0) ? 0 : dmg;
    return dmg;
  }

  saveCheck(saveType: string, saveValue: number, advantage: boolean = false, disadvantage: boolean = false) {
    let passed: boolean = false;
    let critical: boolean = false;
    let firstTry: number;
    let secondTry: number;
    let result: number;

    if (advantage > disadvantage) {
      firstTry = +prompt(`${this.character.name} preforming ${saveType} check with advantage! Roll d100 under/equal to the ${saveValue} to pass save check!`);
      secondTry = +prompt(`${this.character.name} preforming second trow!`);
      result = this.betterValue(saveValue, firstTry, secondTry);
    } else if (advantage < disadvantage) {
      firstTry = +prompt(`${this.character.name} preforming ${saveType} check with Disadvantage! Roll d100 under\equal to ${saveValue} to pass save check!`);
      secondTry = +prompt(`${this.character.name} preforming second trow!`);
      result = this.worstValue(saveValue, firstTry, secondTry)
    } else {
      result = +prompt(`${this.character.name} preforming ${saveType} check! Roll d100 under/equal to the ${saveValue} to pass save check!`);
    }

    critical = this.isCriticalRoll(result);

    if (result >= saveValue) {
      if (critical) {
        alert(`${saveType} check - CRITICAL FAIL with ${result} trow!`);
        this.panicCheck();
      } else {
        this.character.stress += 1;
        alert(`${saveType} check - FAIL with ${result} trow! 1 stress point gained`);
      }
    } else {
      passed = true;
      if (critical) {
        alert(`WOW! ${saveType} check - CRITICAL SUCCESS with ${result} trow!`);
      } else {
        alert(`${saveType} check - SUCCESS with ${result} trow!`);
      }
    }
    return passed;
  }

  sanitySave() {
    this.saveCheck('SANITY', this.character.saves.Sanity, this.character.advantages.Sanity, this.character.disadvantages.Sanity);
  }

  fearSave() {
    return this.saveCheck('FEAR', this.character.saves.Fear, this.character.advantages.Fear, this.character.disadvantages.Fear);
  }

  bodySave() {
    return this.saveCheck('BODY', this.character.saves.Body, this.character.advantages.Body, this.character.disadvantages.Body);
  }

  armorSave() {
    return this.saveCheck('ARMOR', this.character.saves.Armor, this.character.advantages.Armor, this.character.disadvantages.Armor);
  }

  statCheck(statType: string, statValue: number, advantage: boolean = false, disadvantage: boolean = false) {
    let passed: boolean = false;
    let critical: boolean = false;
    let firstTry: number;
    let secondTry: number;
    let result: number;

    if (advantage > disadvantage) {
      firstTry = +prompt(`${this.character.name} preforming ${statType} check with advantage! Roll d100 under the ${statValue} to pass stat check!`);
      secondTry = +prompt(`${this.character.name} preforming second trow!`);
      result = this.betterValue(statValue, firstTry, secondTry);
    } else if (advantage < disadvantage) {
      firstTry = +prompt(`${this.character.name} preforming ${statType} check with Disadvantage! Roll d100 under the ${statValue} to pass stat check!`);
      secondTry = +prompt(`${this.character.name} preforming second trow!`);
      result = this.worstValue(statValue, firstTry, secondTry)
    } else {
      result = +prompt(`${this.character.name} preforming ${statType} check! Roll d100 under the ${statValue} to pass stat check!`);
    }

    critical = this.isCriticalRoll(result);

    if (result >= statValue) {
      if (critical) {
        alert(`${statType} check - CRITICAL FAIL with ${result} trow!`);
      } else {
        alert(`${statType} check - FAIL with ${result} trow!`);
      }
    } else {
      passed = true;
      if (critical) {
        alert(`WOW! ${statType} check - CRITICAL SUCCESS with ${result} trow!`);
      } else {
        alert(`${statType} check - SUCCESS with ${result} trow!`);
      }
    }
    return passed;
  }

  strCheck() {
    return this.statCheck('STR', this.character.stats.STR, this.character.advantages.STR, this.character.disadvantages.STR);
  }

  spdCheck() {
    return this.statCheck('SPD', this.character.stats.SPD, this.character.advantages.SPD, this.character.disadvantages.SPD);
  }

  intCheck() {
    return this.statCheck('INT', this.character.stats.INT, this.character.advantages.INT, this.character.disadvantages.INT);
  }

  cmbCheck() {
    return this.statCheck('CMB', this.character.stats.CMB, this.character.advantages.CMB, this.character.disadvantages.CMB);
  }

  surpriseCheck() {
    let surprised: boolean = this.fearSave();
    alert(`${this.character.name} surprised! He is unable to act for one round!`)
    return surprised;
  }

  panicCheck() {
    let result = +prompt(`${this.character.name} is about to PANIC! Roll 2d10 to make a Stress Check`);
    if (result > this.character.stress) {
      alert(`${this.character.name} pass Panic check! 1 stress point relived!`)
      this.character.stress -= 1;
      if (this.character.stress < 0) {
        this.character.stress += 1;
      }
    } else {
      let panicRoll = +prompt(`Roll another 2d10 to define Panic Effect`) - this.character.resolve;
      const effect = this.panicEffects(panicRoll);
      alert(`Gained ${effect}!`)
    }
  }

  hitTarget(target: number, critical: boolean = false) {
    let damage = +prompt(`Roll for Damage`);
    let bodyPart: string;
    if (target === 10) {
      bodyPart = 'Head';
    } else if (target >= 5 && target < 10) {
      bodyPart = 'Torso';
    } else if (target === 3) {
      bodyPart = 'ArmR';
    } else if (target === 4) {
      bodyPart = 'ArmL';
    } else if (target === 2) {
      bodyPart = 'LegL';
    } else if (target === 1) {
      bodyPart = 'LegR';
    }

    damage = this.armorCheck(this.character.armor[bodyPart], damage, critical);
    if (this.character.armor[bodyPart] > 0) {
      this.character.armor[bodyPart] -= 1;
    }
    this.character.health[bodyPart] = this.damageCheck(this.character.health[bodyPart], damage, critical);
    if (this.character.health[bodyPart] <= 0) {
      if (this.bodySave()) {
        alert(`${this.character.name} get ${damage} in his ${bodyPart} and fall unconscious! GM roll for effect table at page 6`)
        this.character.health[bodyPart] = 1;
      } else {
        alert(`${this.character.name} get ${damage} in his ${bodyPart} and DIE!`);
      }
    } else {
      alert(`${this.character.name} get ${damage} in his ${bodyPart}!`);
    }
  }

  hitCharacter() {
    let target = +prompt(`Roll for hit location`);
    this.hitTarget(target);
  }

  criticalHitCharacter() {
    let target = +prompt(`Roll for CRITICAL HIT location`);
    this.hitTarget(target, true);
  }
}