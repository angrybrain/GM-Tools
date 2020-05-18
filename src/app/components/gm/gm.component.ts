import { Component, OnInit } from '@angular/core';
import { Character } from '../../models/character'
import { CharacterService } from '../../services/character.service';
import { UpdateService } from '../../services/update.service';
import faker from 'faker';
import classList from '../../models/classes';

@Component({
  selector: 'gm-tools-gm',
  templateUrl: './gm.component.html',
  styleUrls: ['./gm.component.css']
})
export class GmComponent implements OnInit {

  constructor(public charactersService: CharacterService, private updateService: UpdateService) { }

  characters = [];

  ngOnInit(): void {
    this.getCharacters();
  }

  getCharacters() {
    this.charactersService.getAll().subscribe((respond) => this.characters = respond);
  }

  deleteCharacter(character: Character) {
    this.charactersService.delete(character)
      .subscribe((respond) => {
        this.characters = this.characters.filter(character =>
          respond._id !== character._id
        );
        this.updateService.sendUpdate("Delete");
      })
  }

  saveCharacter(character: Character) {
    this.charactersService.update(character).subscribe(() => { }), (error) => { alert('NOT SAVED') };
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
    this.charactersService.add(character).subscribe((respond) => {
      this.characters.push(respond);
      this.updateService.sendUpdate("Add new");
    })
  }

}
