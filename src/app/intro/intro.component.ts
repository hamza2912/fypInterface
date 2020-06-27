import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '../../../node_modules/@angular/forms';
import { stringify } from '../../../node_modules/@angular/compiler/src/util';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss'],
})
export class IntroComponent implements OnInit {

  constructor( private router: Router,) { }

  single='single';
  three='three';
  myform : FormGroup;

  slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  ngOnInit() {
    this.myform = new FormGroup({
      phase: new FormControl('', [ Validators.required ]),
    });
  }

  processForm(){
    localStorage.setItem("phase",JSON.stringify(this.myform.value.phase));
    this.router.navigate(['/tabs']);
  }

}
