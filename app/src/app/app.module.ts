import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DxButtonModule, DxDataGridModule, DxFormModule, DxPopupModule, DxTextBoxModule, DxValidatorModule } from 'devextreme-angular';
import { DxiItemModule } from 'devextreme-angular/ui/nested';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { TokenInterceptorService} from './resources/services/token-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DxDataGridModule,
    DxFormModule,
    DxiItemModule,
    DxButtonModule,
    DxTextBoxModule,
    DxValidatorModule,
    HttpClientModule,
    DxPopupModule,

  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
