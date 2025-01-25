import { Component, inject, OnInit } from '@angular/core'
import { StorageService } from '../../../../core/auth/pages/login/services/storage.service'

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  standalone: true,
  imports: [
    
  ],
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  private readonly storageService = inject(StorageService)
  public userName = ''

  ngOnInit() {
    this.userName = this.storageService.getUserName()
  }
}
