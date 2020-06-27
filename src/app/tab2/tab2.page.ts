import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ValuesService } from '../values.service';
import { Router } from '@angular/router';
import { motorSpec } from '../interface';
import { FormGroup, FormControl, Validators } from '../../../node_modules/@angular/forms';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  A = 750; B=1500; C=2200; D=3700; E=4000; F=5500; G=7500; H=11000; I=15000; J=18500; K=22000; L=30000; M=37000; N=45000; 
  O=55000; P=75000; Q=90000; R=110000; S=132000; T=160000; U=185000; V=220000; W=280000; X=315000; Y=355000;
  f1=50; f2=60;
  myform : FormGroup;
  single:boolean;


  constructor(private valueService: ValuesService,
    private router: Router,) {}

  ngOnInit(){
    this.myform = new FormGroup({
      power: new FormControl('', [ Validators.required ]),
      voltage: new FormControl('', [ Validators.required ]),
      frequency: new FormControl('', [ Validators.required ]),
      pf: new FormControl('', [ Validators.required ]),
    });
    if(localStorage.getItem("phase")===JSON.stringify('single')){
      this.single = true;
    }
  }


  processForm(){
    const data : motorSpec = this.myform.value;
    this.valueService.addMotorSpec(data).then(() => {
      this.router.navigate(['/tabs/tab3']);
    });
  }



}
