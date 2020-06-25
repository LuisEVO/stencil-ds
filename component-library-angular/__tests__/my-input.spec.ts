import { async, ComponentFixture } from '@angular/core/testing';

import { ConfigureFn, configureTests } from '../src/config.testing';
import { DebugElement, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ComponentLibraryModule } from '../src/index';

@Component({
  template: `<my-input type="text" [(ngModel)]="testText"></my-input>`,
})
class TestTextValueAccessorComponent {
  testText: string = '';
}

describe('MyInput - Text Value', () => {
  let component: TestTextValueAccessorComponent;
  let myInputEl: DebugElement;
  let fixture: ComponentFixture<TestTextValueAccessorComponent>;

  beforeEach(async(() => {
    const configure: ConfigureFn = (testBed) => {
      testBed.configureTestingModule({
        imports: [FormsModule, ComponentLibraryModule],
        declarations: [TestTextValueAccessorComponent],
      });
    };

    configureTests(configure).then((testBed) => {
      fixture = testBed.createComponent(TestTextValueAccessorComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      myInputEl = fixture.debugElement.query(By.css('my-input'));
    });
  }));

  it('on myChange type="text" the bound component attribute should update', () => {
    const { componentInstance: myAngularComponent } = fixture;
    myInputEl.triggerEventHandler('myChange', { target: { value: 'text' } });
    expect(myAngularComponent.testText).toEqual('text');
  });
});

@Component({
  template: `<my-input type="number" [(ngModel)]="testNumber"></my-input>`,
})
class TestNumberValueAccessorComponent {
  testNumber: number = 0;
}

describe('MyInput - Number Value', () => {
  let component: TestNumberValueAccessorComponent;
  let myInputEl: DebugElement;
  let fixture: ComponentFixture<TestNumberValueAccessorComponent>;

  beforeEach(async(() => {
    const configure: ConfigureFn = (testBed) => {
      testBed.configureTestingModule({
        imports: [FormsModule, ComponentLibraryModule],
        declarations: [TestNumberValueAccessorComponent],
      });
    };

    configureTests(configure).then((testBed) => {
      fixture = testBed.createComponent(TestNumberValueAccessorComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      myInputEl = fixture.debugElement.query(By.css('my-input'));
    });
  }));

  it('on myChange type="number" the bound component attribute should update', () => {
    const { componentInstance: myAngularComponent } = fixture;
    myInputEl.triggerEventHandler('myChange', { target: { value: 42 } });
    expect(myAngularComponent.testNumber).toEqual(42);
  });
});
