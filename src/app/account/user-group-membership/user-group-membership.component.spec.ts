import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGroupMembershipComponent } from './user-group-membership.component';

describe('UserGroupMembershipComponent', () => {
  let component: UserGroupMembershipComponent;
  let fixture: ComponentFixture<UserGroupMembershipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserGroupMembershipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGroupMembershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
