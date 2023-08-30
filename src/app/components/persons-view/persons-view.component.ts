import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import { Person } from "../../model/Person";

@Component({
  selector: 'app-persons-view',
  templateUrl: './persons-view.component.html',
  styleUrls: ['./persons-view.component.css']
})
export class PersonsViewComponent{
  @Input() iterablePersons!: Person[];
}
