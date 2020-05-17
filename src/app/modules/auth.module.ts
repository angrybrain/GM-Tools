import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { AuthService } from '../services/auth.service';
import { MainGuard } from '../guards/main.guard';
import { TokenInterceptor } from '../interceptors/token.interceptor';

@NgModule({
    providers: [
        AuthGuard,
        AuthService,
        MainGuard,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        }
    ],
    imports: [
        CommonModule,
        RouterModule,
        HttpClientModule,
        ReactiveFormsModule,
    ]
})
export class AuthModule { }