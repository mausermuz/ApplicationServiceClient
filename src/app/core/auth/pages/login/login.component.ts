import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { AuthService } from './services/auth.service'
import { StorageService } from './services/storage.service'
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { BehaviorSubject } from 'rxjs'
import { Router } from '@angular/router'
import { ApiRoutes } from '../../../../shared/enums/routes'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    CommonModule
  ],
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {

  public error$ = new BehaviorSubject(false)

  public loginForm!: FormGroup
  public submitted: boolean = false
  public isLoggedIn: boolean = false
  public errorMessage:string = ''

  private readonly authService = inject(AuthService)
  private readonly storageService = inject(StorageService)
  private readonly router = inject(Router)

  constructor(private formBuilder: FormBuilder) {
    this.createForm()
  }

  public onLogin(): void {
    const { username, password } = this.loginForm.value
    this.authService.login(username, password).subscribe({
      next: data => {
        this.storageService.saveUser(data)
        this.isLoggedIn = true
        this.error$.next(false)
        this.errorMessage = ''
        this.router.navigateByUrl(ApiRoutes.WELCOME)
      },
      error: err => {
        this.errorMessage = 'We could not log you in. Please check your username/password and try again.'
        this.error$.next(true)
        this.resetForm()
      }
    })
  }

  private createForm(): void {
    this.loginForm = this.formBuilder.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    })
  }

  private resetForm(): void {
    const keepValues = [
      this.loginForm.controls['username'].value,
   ]

   this.loginForm.reset()
   this.loginForm.controls['username'].patchValue(keepValues[0])
  }
}
