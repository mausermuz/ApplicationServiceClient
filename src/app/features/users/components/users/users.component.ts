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
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TableUsersComponent,
    CommonModule
  ]
})
export class UsersComponent implements OnInit {
  private readonly userService = inject(UserService)

  public data$ = new BehaviorSubject<User[]>([])

  private previewUsers = new BehaviorSubject<User[]>([])
  private previewUsers$ = this.previewUsers.asObservable()

  public emitCurrentList($event: any) {
    console.log($event)
    this.previewUsers$.subscribe(el => {
      console.log(el)
    })
  }

  ngOnInit() {
    this.userService.getUsers().subscribe(data => {
      this.previewUsers.next(data)
      this.data$.next(data)
    })
  }
}
