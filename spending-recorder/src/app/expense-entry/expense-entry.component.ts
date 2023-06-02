import { SocialUser, SocialAuthService } from '@abacritt/angularx-social-login';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { SpreadsheetEditorService } from '../spreadsheet-editor.service';

@Component({
  selector: 'app-expense-entry',
  templateUrl: './expense-entry.component.html',
  styleUrls: ['./expense-entry.component.scss']
})
export class ExpenseEntryComponent implements OnInit {
  resetEvent: Subject<void> = new Subject<void>();
  expenseAmount: number | null = null;
  expenseAmountStr: string | null = null;
  payer: string = "Katie";
  final: boolean = false;
  description: string | null = null;
  @ViewChild('expenseInput', { static: false }) expenseInput!: ElementRef;



  constructor(private spreadsheetEditor: SpreadsheetEditorService, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  onExpenseChange(newValue: string) {
    if (newValue.length === 0 || newValue === "$") {
      this.expenseAmountStr = null;
      return;
    }
    const newValueNumber = newValue[0] === "$" ? newValue.slice(1) : newValue;
    if (isNaN(parseInt(newValueNumber))) {
      this.changeDetectorRef.detectChanges();
      this.expenseInput.nativeElement.value = this.expenseAmountStr;
      return;
    }
    if (newValue[0] !== "$") newValue = "$" + newValue;
    this.expenseAmount = Number(newValueNumber);
    this.expenseAmountStr = newValue;
  }

  setPayer(payer: string) {
    this.payer = payer;
  }

  setFinal(finalStr: string) {
    if (finalStr === "Final") this.final = true;
    else this.final = false;
  }

  onSubmit(): void {
    if (this.expenseAmount === null || this.description === null) return;
    this.spreadsheetEditor.appendLine(this.expenseAmount, this.description, this.payer, this.final)
      .then(observable => observable.subscribe(() => {
        this.final = false;
        this.description = null;
        this.payer = "Katie";
        this.expenseAmountStr = null;
        this.resetEvent.next();
      }))
  }

}
