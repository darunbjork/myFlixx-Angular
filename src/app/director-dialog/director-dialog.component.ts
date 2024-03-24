//src/app/director-dialog/director-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-director-dialog',
  templateUrl: './director-dialog.component.html',
  styleUrls: ['./director-dialog.component.scss']
})
export class DirectorDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { name: string; bio: string; birth: string; death: string | null }) {}
}
