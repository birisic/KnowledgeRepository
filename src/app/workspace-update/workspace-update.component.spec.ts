import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspaceUpdateComponent } from './workspace-update.component';

describe('WorkspaceUpdateComponent', () => {
  let component: WorkspaceUpdateComponent;
  let fixture: ComponentFixture<WorkspaceUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkspaceUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkspaceUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
