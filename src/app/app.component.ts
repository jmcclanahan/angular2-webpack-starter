import { Component } from '@angular/core'
import { MdButton } from '@angular2-material/button'

@Component({
  selector: 'sol-app',
  template: require('./app.component.html'),
  styles: [require('./app.component.css')],
  directives: [MdButton]
})
export class AppComponent { }
