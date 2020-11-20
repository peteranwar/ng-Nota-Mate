import { NotesService } from './../../shared/notes.service';
import { Note } from './../../shared/note.model';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.scss']
})
export class NoteDetailsComponent implements OnInit {

  note: Note;

  constructor(
          public notesService: NotesService,
          private router: Router,
          private route: ActivatedRoute,
          private fireStore: AngularFirestore,
          private toastr: ToastrService) { }

  ngOnInit(): void {

  }

  onSubmit(form: NgForm) {
    let data = Object.assign({}, form.value);
      delete data.id;
     if (form.value.id == null) {
       this.fireStore.collection('notes').add(data);

     } else {
      this.fireStore.doc('notes/'+form.value.id).update(data)

    }
    this.toastr.success('Submitted successfully', 'Note Mate', {
             timeOut: 8000,
            progressBar: true,
            progressAnimation: 'increasing'
    })
     form.resetForm();
     this.router.navigateByUrl('/');

  }

  navBack() {
    this.notesService.formData.body = "";
    this.notesService.formData.title = "";
    this.router.navigateByUrl('/');
  }

}
