import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { HeaderComponent } from './shared/components/header/header.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  template: ''
})
class FakeHeaderComponent {}

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, RouterTestingModule],
    }).compileComponents();

    TestBed.overrideComponent(AppComponent, {
      remove: {
        imports: [HeaderComponent]
      },
      add: {
        imports: [FakeHeaderComponent]  
      }
    })
  });

  it('deve renderizar o componente header', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const headerdebugEl = fixture.debugElement.query(By.css('app-header'));
    expect(headerdebugEl).toBeTruthy();
  });

  it('deve renderizar o componente router-outlet', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const routerOutletdebugEl = fixture.debugElement.query(By.css('router-outlet'));
    expect(routerOutletdebugEl).toBeTruthy();
  });
});
