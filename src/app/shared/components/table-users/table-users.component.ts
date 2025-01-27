import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, inject, Input, OnInit, output } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import {
  MatDialog,
} from '@angular/material/dialog'
import { DialogComponent } from '../dialog/dialog.component'
import { User } from '../../../features/users/models/user'

@Component({
  selector: 'app-table-users',
  templateUrl: './table-users.component.html',
  styleUrls: ['./table-users.component.scss'],
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableUsersComponent implements OnInit {
  @Input() user!: User[]
  public onListChange = output<any[]>()

  private readonly dialog = inject(MatDialog)
  private users: User[] = []

  ngOnInit(): void {
    this.users = this.user
  }

  public onClick(userInfo: User): void {
    const dialogRef = this.dialog.open(DialogComponent, { 
      width: '400px',
      height: '300px',
      data: { user: userInfo } 
    })
  
    dialogRef.afterClosed().subscribe(result => { 
       if (result) {
        debugger
        //this.user.next(this.users)
        this.onListChange.emit(this.users)
       }
    })
  }
}



