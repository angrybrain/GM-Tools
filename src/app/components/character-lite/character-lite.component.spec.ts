import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterLiteComponent } from './character-lite.component';

describe('CharacterLiteComponent', () => {
  let component: CharacterLiteComponent;
  let fixture: ComponentFixture<CharacterLiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterLiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterLiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
