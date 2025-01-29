import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, inject, Input, OnInit, output } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import {
  MatDialog, MatDialogConfig,
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
export class TableUsersComponent {
  @Input() users!: User[]
  public onListChange = output<any>()

  private readonly dialog = inject(MatDialog)

  public onClick(userInfo: User): void {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = false
    dialogConfig.width = '80%'
    dialogConfig.height = '50%'

    dialogConfig.data = { user: userInfo }

    const dialogRef = this.dialog.open(DialogComponent, dialogConfig)

    dialogRef.afterClosed().subscribe(result => {
       if (result) {
          this.onListChange.emit(result)
       }
    })
  }
}



