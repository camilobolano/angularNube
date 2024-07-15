import { Component, inject, Injector, OnInit } from '@angular/core';
import { BookService } from '../../../core/services/book.service';
import { IBook } from '../../../core/models/types';
import { subscribe } from 'diagnostics_channel';
import { BookCardComponent } from '../book-card/book-card.component';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-book-pages',
  standalone: true,
  imports: [RouterLink,BookCardComponent,ReactiveFormsModule],
  templateUrl: './book-pages.component.html',
  styleUrl: './book-pages.component.css'
})
export class BookPagesComponent implements OnInit {
  toast = inject(ToastrService)
  books = inject(BookService);
  bookdefaultdata : IBook [] = []
  book : IBook []=[]

  searchForm = new FormGroup({
    name: new FormControl(''),
    
  });


  ngOnInit(): void {
    this.loadData()
    this.bookdefaultdata = this.book
    
  }

  loadData(){
    this.books.getBooks().subscribe((resultado)=>{
      this.book = resultado.resultado as IBook[]
    })
  }
  searchData(){
     const searchTerm = this.searchForm.value.name?? ''
    if(!searchTerm){
       this.toast.error("no puede estar vacio el buscador")
       return
    }
    this.book = this.bookdefaultdata
   
    this.book =this.book.filter((book)=>{
      return book.nombre.toLowerCase().includes(searchTerm.toLowerCase()) 
    })
  }
  reloadBooks(){
    console.log("soy la funcion")
    this.loadData()
  }
}
