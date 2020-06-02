import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { Character } from '../../models/character';

@Component({
  selector: 'gm-tools-character-lite',
  templateUrl: './character-lite.component.html',
  styleUrls: ['./character-lite.component.css']
})
export class CharacterLiteComponent implements OnInit {
  @Input() character: Character
  constructor() { }

  ngOnInit(): void {
  }

}
