import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { TableUsersComponent } from '../../../../shared/components/table-users/table-users.component';
import { BehaviorSubject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  standalone: true,
  imports: [
    TableUsersComponent,
    CommonModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent implements OnInit {
  private readonly userService = inject(UserService)

  public users: User[] = []
  public previewUsers: User[] = []
  public changedUsers: User[] = []

  public isClick: boolean = false

  public emitCurrentList($event: User): void {
    this.changedUsers = []
    this.previewUsers.forEach(user => {
      const actualUser = this.users.find(u => u.id === user.id)
      if (actualUser && actualUser?.status != user.status) {
        this.changedUsers.push(actualUser)
      }
    })
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(data => {
      this.users = JSON.parse(JSON.stringify(data))
      this.previewUsers = JSON.parse(JSON.stringify(data))
    })
  }

  public onSave(): void {
    this.userService.updateStatusUsers(this.users).subscribe(data => {

    })
    this.isClick = true
  }
}
