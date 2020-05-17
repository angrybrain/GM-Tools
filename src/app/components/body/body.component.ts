import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';

interface Health {
  Head: number,
  Torso: number,
  ArmR: number,
  ArmL: number,
  LegR: number,
  LegL: number,
}

interface Armor {
  Head: number,
  Torso: number,
  ArmR: number,
  ArmL: number,
  LegR: number,
  LegL: number,
}

@Component({
  selector: 'gm-tools-body',
  templateUrl: './body.component.svg',
  styleUrls: ['./body.component.css']
})

export class BodyComponent implements OnInit {

  @Input() health: Health
  @Input() armor: Armor
  @Output() target = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  hitHead() {
    this.target.emit(10);
  }
  hitTorso() {
    this.target.emit(9);
  }
  hitRightArm() {
    this.target.emit(3);
  }
  hitLeftArm() {
    this.target.emit(4);
  }
  hitLeftLeg() {
    this.target.emit(2);
  }
  hitRightLeg() {
    this.target.emit(1);
  }
}