import { Component, OnInit } from '@angular/core';
import { Character } from '../../models/character'
import { CharacterService } from '../../services/character.service';
import { UpdateService } from '../../services/update.service';
import faker from 'faker';
import classList from '../../models/classes';
import { GenerateCharacterHelper } from '../../helpers/generateCharacter.helper';

@Component({
  selector: 'gm-tools-gm',
  templateUrl: './gm.component.html',
  styleUrls: ['./gm.component.css']
})
export class GmComponent implements OnInit {

  constructor(public charactersService: CharacterService, private updateService: UpdateService, private generateCharacterHelper: GenerateCharacterHelper) { }

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
    this.charactersService.update(character).subscribe(() => { }), () => { alert('NOT SAVED') };
    this.updateService.sendUpdate("Save");
  }

  createNewCharacter() {
    let character = this.generateCharacterHelper.new();
    this.charactersService.add(character).subscribe((respond) => {
      this.characters.push(respond);
      this.updateService.sendUpdate("Add new");
    })
  }
}