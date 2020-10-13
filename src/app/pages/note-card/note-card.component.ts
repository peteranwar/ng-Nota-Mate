import { NotesService } from './../../shared/notes.service';
import {
  Component,
  ViewChild,
  ElementRef,
  OnInit,
  Renderer2, Input, Output, EventEmitter
  
} from '@angular/core';
import { Note } from 'src/app/shared/note.model';

@Component({
  selector: 'note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss'],
})
export class NoteCardComponent implements OnInit {
 

  @Input('title') title: string;
  @Input('body') body: string;
  @Input('link') link: string;

  @Output('delete') delete = new EventEmitter<void>();
  @Output('edit') edit = new EventEmitter<void>();

  @ViewChild('truncation', { static: true}) truncation: ElementRef<HTMLElement>;
  @ViewChild('bodyText', { static: true}) bodyText: ElementRef<HTMLElement>;

  constructor(private renderer: Renderer2) {}

  ngOnInit(){
    // console.log(this.bodyText)
    let style = window.getComputedStyle(this.bodyText.nativeElement, null);
    let viewableHeight = parseInt(style.getPropertyValue('Height'), 5);

    if (this.bodyText.nativeElement.scrollHeight > viewableHeight) {
      this.renderer.setStyle(this.truncation.nativeElement, 'display', 'block');
    } else {
      this.renderer.setStyle(this.truncation.nativeElement, 'display', 'none');
    }
  }

  onDeleteclicked() {
     this.delete.emit();
  }



  editing() {
    this.edit.emit();
  }
}
