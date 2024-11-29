import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { By } from '@angular/platform-browser';

describe('HeaderComponent', () => {
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
    });

    await TestBed.compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    fixture.detectChanges();
  });

  it('deve renderizar o título corretamente', () => {
    const h1debugEl = fixture.debugElement.query(By.css('h1'));
    expect(h1debugEl.nativeElement.textContent).toBe('Gerenciador de Tarefas');
  });
});
