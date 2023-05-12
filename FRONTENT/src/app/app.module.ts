import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsersProfileComponent } from './pages/users-profile/users-profile.component';
import { PagesFaqComponent } from './pages/pages-faq/pages-faq.component';
import { PagesContactComponent } from './pages/pages-contact/pages-contact.component';
import { PagesRegisterComponent } from './pages/pages-register/pages-register.component';
import { PagesLoginComponent } from './pages/pages-login/pages-login.component';
import { PagesError404Component } from './pages/pages-error404/pages-error404.component';
import { PagesBlankComponent } from './pages/pages-blank/pages-blank.component';
import { TableRestapiComponent } from './components/table-restapi/table-restapi.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostComponent } from './components/table-restapi/post/post.component';
import { TablefilterComponent } from './components/table-restapi/tablefilter/tablefilter.component';
import { DataTablesModule } from 'angular-datatables';
import { ConnectionServiceModule } from 'ng-connection-service';
import { Dtsu666UphatodayComponent } from './pages/dashboard/today/dtsu666-uphatoday/dtsu666-uphatoday.component';
import { Dtsu666UdaytodayComponent } from './pages/dashboard/today/dtsu666-udaytoday/dtsu666-udaytoday.component';
import { Dtsu666CosphitodayComponent } from './pages/dashboard/today/dtsu666-cosphitoday/dtsu666-cosphitoday.component';
import { Dtsu666TansotodayComponent } from './pages/dashboard/today/dtsu666-tansotoday/dtsu666-tansotoday.component';
import { Dtsu666PtieuthuphatodayComponent } from './pages/dashboard/today/dtsu666-ptieuthuphatoday/dtsu666-ptieuthuphatoday.component';
import { Dtsu666QphankhangphatodayComponent } from './pages/dashboard/today/dtsu666-qphankhangphatoday/dtsu666-qphankhangphatoday.component';
import { Dtsu666DiennangphankhangatodayComponent } from './pages/dashboard/today/dtsu666-diennangphankhangatoday/dtsu666-diennangphankhangatoday.component';
import { Dtsu666DiennangtieuthutodayComponent } from './pages/dashboard/today/dtsu666-diennangtieuthutoday/dtsu666-diennangtieuthutoday.component';
import { Dtsu666UphalastweekComponent } from './pages/dashboard/last week/dtsu666-uphalastweek/dtsu666-uphalastweek.component';
import { Dtsu666IphatodayComponent } from './pages/dashboard/today/dtsu666-iphatoday/dtsu666-iphatoday.component';
import { Pzem017DienaptodayComponent } from './pages/dashboard/today/pzem017-dienaptoday/pzem017-dienaptoday.component';
import { Pzem017DongdientodayComponent } from './pages/dashboard/today/pzem017-dongdientoday/pzem017-dongdientoday.component';
import { Pzem017CongsuattieuthutodayComponent } from './pages/dashboard/today/pzem017-congsuattieuthutoday/pzem017-congsuattieuthutoday.component';
import { Pzem017DiennangtieuthutodayComponent } from './pages/dashboard/today/pzem017-diennangtieuthutoday/pzem017-diennangtieuthutoday.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    DashboardComponent,
    UsersProfileComponent,
    PagesFaqComponent,
    PagesContactComponent,
    PagesRegisterComponent,
    PagesLoginComponent,
    PagesError404Component,
    PagesBlankComponent,
    TableRestapiComponent,
    PostComponent,
    TablefilterComponent,
    Dtsu666UphatodayComponent,
    Dtsu666UdaytodayComponent,
    Dtsu666CosphitodayComponent,
    Dtsu666TansotodayComponent,
    Dtsu666PtieuthuphatodayComponent,
    Dtsu666QphankhangphatodayComponent,
    Dtsu666DiennangphankhangatodayComponent,
    Dtsu666DiennangtieuthutodayComponent,
    Dtsu666UphalastweekComponent,
    Dtsu666IphatodayComponent,
    Pzem017DienaptodayComponent,
    Pzem017DongdientodayComponent,
    Pzem017CongsuattieuthutodayComponent,
    Pzem017DiennangtieuthutodayComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    DataTablesModule,
    ConnectionServiceModule,
    //FormModel
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
