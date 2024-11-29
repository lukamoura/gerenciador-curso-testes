import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, RouterTestingModule],
    }).compileComponents();
  });

  it('deve renderizar o componente header', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const headerdebugEl = fixture.debugElement.query(By.css('app-header'));
    const text = headerdebugEl.query(By.css('h1')).nativeElement.textContent;
    expect(text).toBe('Gerenciador de Tarefas');
    //expect(headerdebugEl).toBeTruthy();
  });

  it('deve renderizar o componente router-outlet', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const routerOutletdebugEl = fixture.debugElement.query(By.css('router-outlet'));
    expect(routerOutletdebugEl).toBeTruthy();
  });
});
