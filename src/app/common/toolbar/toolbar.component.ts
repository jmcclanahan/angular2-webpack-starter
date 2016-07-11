import { Component, Input, OnInit } from '@angular/core'
import { MdToolbar } from '@angular2-material/toolbar'

@Component({
  selector: 'sol-toolbar',
  template: require('./toolbar.component.html'),
  styles: [require('./toolbar.component.css')],
  directives: [MdToolbar]
})
export class ToolbarComponent implements OnInit {
  @Input() toolbarType: string;

  constructor() {}

  ngOnInit() {}

}
