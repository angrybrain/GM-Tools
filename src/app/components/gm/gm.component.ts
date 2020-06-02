import { Component, OnInit } from '@angular/core';
import { Character } from '../../models/character';
import { Observable } from 'rxjs';
import { CharacterService } from '../../services/character.service';
import { UpdateService } from '../../services/update.service';
import faker from 'faker';
import classList from '../../models/classes';
import { ReduxCharacterService } from '../../services/redux-character.service';

@Component({
  selector: 'gm-tools-gm',
  templateUrl: './gm.component.html',
  styleUrls: ['./gm.component.css']
})
export class GmComponent implements OnInit {

  loading$: Observable<boolean>;
  characters$: Observable<Character[]>;

  constructor(public charactersService: CharacterService, private updateService: UpdateService, private reduxCharacterServices: ReduxCharacterService) {
    this.characters$ = reduxCharacterServices.entities$;
    this.loading$ = reduxCharacterServices.loading$;
  }

  ngOnInit(): void {
    this.getCharacters();
  }

  getCharacters() {
    this.reduxCharacterServices.getAll();
  }

  deleteCharacter(character: Character) {
    this.reduxCharacterServices.delete(character._id);
    this.updateService.sendUpdate("Delete");
  }

  saveCharacter(character: Character) {
    this.reduxCharacterServices.update(character);
    this.updateService.sendUpdate("Save");
  }

  createNewCharacter() {
    let classNames = Object.keys(classList);
    let randomClass = classList[classNames[classNames.length * Math.random() << 0]];

    const name = faker.name.findName();

    const maxStat = 60;
    const minStat = 6;
    let stats = {
      STR: randomClass.Bonus.STR + Math.floor(Math.random() * (maxStat - minStat) + minStat),
      SPD: randomClass.Bonus.SPD + Math.floor(Math.random() * (maxStat - minStat) + minStat),
      INT: randomClass.Bonus.INT + Math.floor(Math.random() * (maxStat - minStat) + minStat),
      CMB: randomClass.Bonus.CMB + Math.floor(Math.random() * (maxStat - minStat) + minStat),
    }

    const baseHP = stats.STR * 2;
    const halfHP = Math.floor(baseHP / 2);
    let headHP = 20;
    if (halfHP < 20) {
      headHP = halfHP;
    };
    let health = {
      Head: headHP,
      Torso: baseHP,
      ArmR: halfHP,
      ArmL: halfHP,
      LegL: halfHP,
      LegR: halfHP,
    };

    let character = {
      name: name,
      stats: stats,
      saves: randomClass,
      health: health,
    };
    // this.CharacterServices.add(character)
    this.updateService.sendUpdate("Add new");
  }

}
