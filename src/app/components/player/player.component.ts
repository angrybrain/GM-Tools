import { Component, OnInit } from '@angular/core';
import { Character } from '../../models/character'
import { CharacterService } from '../../services/character.service'

@Component({
  selector: 'gm-tools-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  constructor(public charactersService: CharacterService) { }

  characters = []

  ngOnInit(): void {
    this.getCharacters();
  }

  getCharacters() {
    this.charactersService.getAll().subscribe((respond) => this.characters = respond);
  }


}
