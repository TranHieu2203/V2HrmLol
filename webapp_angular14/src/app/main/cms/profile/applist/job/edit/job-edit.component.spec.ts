import { TestBed, async } from "@angular/core/testing";
import { JobEditComponent } from "./job-edit.component";

describe("AppComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [JobEditComponent],
    }).compileComponents();
  }));

  it("should create the app", () => {
    const fixture = TestBed.createComponent(JobEditComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'editing'`, () => {
    const fixture = TestBed.createComponent(JobEditComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual("editing");
  });

  it("should render title in a h1 tag", () => {
    const fixture = TestBed.createComponent(JobEditComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector("h1").textContent).toContain(
      "Welcome to editing!"
    );
  });
});
