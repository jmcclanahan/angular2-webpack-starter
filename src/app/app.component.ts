import { Component } from '@angular/core'
import { MdButton } from '@angular2-material/button'

import { ToolbarComponent } from './common/toolbar/toolbar.component'

@Component({
  selector: 'sol-app',
  template: require('./app.component.html'),
  styles: [require('./app.component.css')],
  directives: [MdButton, ToolbarComponent]
})
export class AppComponent { }
