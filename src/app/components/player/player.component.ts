import { Component, OnInit } from '@angular/core';
import { CharacterService } from '../../services/character.service';
import { UpdateService } from '../../services/update.service';

@Component({
  selector: 'gm-tools-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  constructor(public charactersService: CharacterService, private updateService: UpdateService) { }

  characters = []

  ngOnInit(): void {
    this.getCharacters();
    this.updateService.update.subscribe(msg => {
      console.log("Updated");
      console.log(msg);
      this.getCharacters();
    })
  }

  getCharacters() {
    this.charactersService.getAll().subscribe((respond) => this.characters = respond);
  }


}
