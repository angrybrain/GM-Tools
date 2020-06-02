import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from './modules/auth.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { PlayerComponent } from './components/player/player.component';
import { GmComponent } from './components/gm/gm.component';
import { CharacterComponent } from './components/character/character.component';
import { BodyComponent } from './components/body/body.component';
import { CharacterLiteComponent } from './components/character-lite/character-lite.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { DefaultDataServiceConfig, EntityDataModule } from '@ngrx/data';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { entityConfig } from './entities/entity-metadata';
import { config } from './configs/config';

const defaultDataServiceConfig: DefaultDataServiceConfig = {
  root: config.apiUrl,
  timeout: 3000,
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    PlayerComponent,
    GmComponent,
    CharacterComponent,
    BodyComponent,
    CharacterLiteComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AuthModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    EntityDataModule.forRoot(entityConfig),
    StoreDevtoolsModule.instrument(),
  ],
  providers: [
    { provide: DefaultDataServiceConfig, useValue: defaultDataServiceConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
