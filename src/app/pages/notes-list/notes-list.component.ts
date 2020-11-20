
import { NotesService } from './../../shared/notes.service';
import { Component, OnInit } from '@angular/core';
import { Note } from 'src/app/shared/note.model';
import { animate, query, style, transition, trigger, stagger } from '@angular/animations';
import { AngularFirestore } from '@angular/fire/firestore';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss'],
  animations: [
    trigger('notesAnim', [
      transition('* <=> *', [
        query(':enter', [
          style( { opacity: 0, transform: 'translateX(-100px)' }),
          stagger(
            '700ms',
            animate('900ms ease-in',
            style( { opacity: 1, transform: 'translateX(0px)' })
           )
          )
        ], { optional: true}),
        query(
          ':leave',
          [animate('500ms', style({ opacity: 0, transform: 'rotate(180deg)'}))],
          { optional: true}
        )
      ]),
    ])
  ]
})
export class NotesListComponent implements OnInit {


notes: Note[] ;
filteredNotes: any[] ;


  constructor(private notesService: NotesService,
    private firestore: AngularFirestore,
    private toastr: ToastrService) { }

  ngOnInit() {
   this.notesService.getAll().subscribe((actionArray) => {
     this.notes = actionArray.map((item) => {
       return {
        id: item.payload.doc.id,
        ...(item.payload.doc.data() as Note),
       }
     })
     this.filteredNotes = this.notes;
    //  console.log(this.notes)
   });

  }




  onEdit(note: Note) {
    this.notesService.formData = Object.assign({}, note);
  }

   filter(query: string){
        this.filteredNotes = (query) ?
        this.notes.filter(note => (note.title?.toLowerCase().includes(query.toLowerCase()) || note.body?.toLowerCase().includes(query.toLowerCase()))) :
        this.notes;
      }


   onDelete(id: string) {
        if( confirm("Are you sure to delete this note ??")) {
          this.firestore.doc('notes/' + id).delete();
          this.toastr.warning('Deleted successfully', 'Note Mate', {
            timeOut: 5000,
            progressBar: true,

          })
        }
      }
}
