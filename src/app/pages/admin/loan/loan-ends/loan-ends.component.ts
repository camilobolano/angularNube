import { Component, inject } from '@angular/core';
import { LoanService } from '../../../../core/services/loan.service';
import { ILoan } from '../../../../core/models/types';
import { LoanCardComponent } from "../loan-card/loan-card.component";

@Component({
  selector: 'app-loan-ends',
  standalone: true,
  imports: [LoanCardComponent],
  templateUrl: './loan-ends.component.html',
  styleUrl: './loan-ends.component.css'
})
export class LoanEndsComponent {
  loans = inject(LoanService);
  
  loan : ILoan []=[]


  ngOnInit(): void {
    this.loadData()
    this.filterListBook()
    
  }

  loadData(){
    this.loans.getLoans().subscribe((resultado)=>{
      this.loan = resultado.resultado as ILoan[]
    })
  }

  filterListBook(){
    this.loan = this.loan.filter(loan=>
      !loan.estado
    )
  }
}

