import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
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
export class DialogComponent {
  public readonly data = inject<any>(MAT_DIALOG_DATA)

  private readonly dialogRef = inject(MatDialogRef<DialogComponent>)

  public onCancel(): void {
    this.dialogRef.close(this.data.user)
  }
}
