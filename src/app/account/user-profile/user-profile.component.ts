import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs';
import { UserUpdate, User } from '../models/user';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy {

  userProfileForm: FormGroup = this.fb.group({
    name: ['', [Validators.minLength(3), Validators.required]],
    password: [''],
    confirmPassword: ['']
  });
  currentUser: User;

  private subscribtions = new Subscription();

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.loadUser();
  }

  ngOnDestroy() {
    this.subscribtions.unsubscribe();
  }

  get name(): AbstractControl {
    return this.userProfileForm.get('name');
  }

  get password(): AbstractControl {
    return this.userProfileForm.get('password');
  }

  get confirmPassword(): AbstractControl {
    return this.userProfileForm.get('confirmPassword');
  }
  save(): void {
    this.subscribtions.add(
      this.userService.updateUser(
        new UserUpdate(this.name.value, this.password.value)
      ).subscribe(
        result => this.loadUser()
      )
    );
  }

  private loadUser() {
    this.subscribtions.add(
      this.userService.getUser().subscribe(
        user => {
          this.name.setValue(user.name);
          this.currentUser = user;
        }
      )
    );
  }
}
