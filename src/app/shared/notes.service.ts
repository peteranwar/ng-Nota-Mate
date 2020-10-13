import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

import { Note } from './note.model';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

formData: Note = new Note;

// notes: Note[] = new Array<Note>();

  constructor(private firestore: AngularFirestore) { }

  // get(id: number) {
  //   return this.notes[id];
  // }

  getAll() {
    // return this.notes;
    return this.firestore.collection('notes').snapshotChanges();

  }
  
  // getId(note: Note) {
  //   return this.notes.indexOf(note);
  // }

  // add(note: Note) {
  //   let newLength = this.notes.push(note);
  //   let index = newLength - 1;
  //   return index;
  // }


  // update(id: number, title: string, body: string) {
  //   let note = this.notes[id];
    
  //   note.title = title;
  //   note.body = body;
  //   // this.formData = Object.assign({}, note);

  // }
  // update(note: Note) {
    
  //   this.formData = Object.assign({}, note);

  // }

  // onEdit(note: Note) {
  //   this.notesService.formData = Object.assign({}, note);
  // }

  // delete(id: number) {
  //   this.notes.splice(id, 1);
  // }
}
