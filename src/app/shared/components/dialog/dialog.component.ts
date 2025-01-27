import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogComponent implements OnInit {
  
  public readonly data = inject<any>(MAT_DIALOG_DATA)

  private readonly dialogRef = inject(MatDialogRef<DialogComponent>)

  ngOnInit(): void {
    throw new Error('Method not implemented.')
  }

  public onCancel(): void {  
    this.dialogRef.close(this.data.user)
  }
}