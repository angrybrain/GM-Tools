import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { Character } from '../../models/character';
import { PanicEffects } from '../../enums/panicEffects';
import { GameMechanicsService } from '../../services/game-mechanics.service';


@Component({
  selector: 'gm-tools-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit {

  @Input() character: Character
  @Output() delete = new EventEmitter<Character>();
  @Output() save = new EventEmitter<Character>();
  gameMechanicsService = new GameMechanicsService(this.character);

  constructor() { }

  ngOnInit(): void {
  }

  toggle: boolean = false;

  toggleConfig() {
    this.toggle = !this.toggle;
  }

  sanitySave() {
    this.gameMechanicsService.sanitySave();
  }

  fearSave() {
    this.gameMechanicsService.fearSave();
  }

  bodySave() {
    this.gameMechanicsService.bodySave();
  }

  armorSave() {
    this.gameMechanicsService.armorSave();
  }

  strCheck() {
    this.gameMechanicsService.strCheck();
  }

  spdCheck() {
    this.gameMechanicsService.spdCheck();
  }

  intCheck() {
    this.gameMechanicsService.intCheck();
  }

  cmbCheck() {
    this.gameMechanicsService.cmbCheck();
  }

  panicCheck() {
    this.gameMechanicsService.panicCheck();
  }

  hitTarget(target) {
    this.gameMechanicsService.hitTarget(target);
  }

  hitCharacter() {
    this.gameMechanicsService.hitCharacter();
  }

  criticalHitCharacter() {
    this.gameMechanicsService.criticalHitCharacter();
  }
}