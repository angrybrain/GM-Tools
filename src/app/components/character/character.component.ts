import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { Character } from '../../models/character'
import { PanicEffects } from '../../enums/panicEffects'


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
  toggle: boolean = false;

  toggleConfig() {
    this.toggle = !this.toggle;
  }


  panicEffectRoll(value: number) {
    let effect: string;
    if (value >= 0 && value <= 3) {
      effect = PanicEffects.LaserFocus;
    } else if (value >= 4 && value <= 5) {
      effect = PanicEffects.MajorAdrenalineRush;
    } else if (value >= 6 && value <= 7) {
      effect = PanicEffects.MinorAdrenalineRush;
    } else if (value >= 8 && value <= 9) {
      effect = PanicEffects.Anxious;
    } else if (value >= 10 && value <= 11) {
      effect = PanicEffects.NervousThitch;
    } else if (value >= 12 && value <= 13) {
      effect = PanicEffects.Cowardice;
    } else if (value >= 14 && value <= 15) {
      effect = PanicEffects.Hallucinations;
    } else if (value >= 16 && value <= 17) {
      effect = PanicEffects.CrippingFear;
    } else if (value >= 18 && value <= 19) {
      effect = PanicEffects.Owerhelmed;
    } else if (value >= 20 && value <= 21) {
      effect = PanicEffects.Rattled;
    } else if (value == 22) {
      effect = PanicEffects.Paranoid;
    } else if (value == 23) {
      effect = PanicEffects.DeathDrive;
    } else if (value == 24) {
      effect = PanicEffects.Catatonic;
    } else if (value == 25) {
      effect = PanicEffects.Broken;
    } else if (value == 26) {
      effect = PanicEffects.Psychotic;
    } else if (value == 27) {
      effect = PanicEffects.CompoudingProblem;
    } else if (value == 28) {
      effect = PanicEffects.DescentIntoMadness;
    } else if (value == 29) {
      effect = PanicEffects.PsychologicalCollapse;
    } else if (value >= 30) {
      effect = PanicEffects.HearthAttack;
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
      const effect = this.panicEffectRoll(panicRoll);
      alert(`Gained ${effect}!`);
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