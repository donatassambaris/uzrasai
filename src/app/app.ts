import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Note {
  id: number;
  title: string;
  text: string;
}

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly storageKey = 'notes';

  title = '';
  text = '';
  notes: Note[] = this.load();

  add() {
    if (!this.title.trim() && !this.text.trim()) return;

    this.notes.unshift({
      id: Date.now(),
      title: this.title.trim(),
      text: this.text.trim(),
    });
    this.save();

    this.title = '';
    this.text = '';
  }

  remove(id: number) {
    this.notes = this.notes.filter(n => n.id !== id);
    this.save();
  }

  private save() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.notes));
  }

  private load(): Note[] {
    try {
      return JSON.parse(localStorage.getItem(this.storageKey) ?? '[]');
    } catch {
      return [];
    }
  }
}