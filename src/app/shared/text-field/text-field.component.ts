import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-text-field',
  templateUrl: './text-field.component.html',
  styleUrl: './text-field.component.css'
})

export class TextFieldComponent {
  @Input() type: string = 'text';
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() value: string = '';
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;
  @Input() rows: number = 1;
  // @Input() widthClass: string = 'w-100';
  @Input() classes: string = '';

  isTextarea(): boolean {
    return this.type === 'textarea';
  }
}
