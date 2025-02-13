import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';
import { HeaderComponent } from './shared/components/header/header.component';
import { MockComponent } from 'ng-mocks';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();

    TestBed.overrideComponent(AppComponent, {
      remove: {
        imports: [HeaderComponent]
      },
      add: {
        imports: [MockComponent(HeaderComponent)]  
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
