import { Component, OnInit } from '@angular/core';
import { motorSpec, sizeTable, vfdSpec } from '../interface';
import { ValuesService } from '../values.service';
import { Router } from '../../../node_modules/@angular/router';
import { FormGroup, FormControl, Validators } from '../../../node_modules/@angular/forms';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {


  A = 0.03;
  B = 0.05;
  C = 0.07;
  Current;
  Inductance;
  AWG;
  diameter;
  area;
  snC = [];
  snI = [];
  expn;
  single:boolean;
  capacitor;
  motorSpecs: motorSpec[];
  motorSpec: motorSpec;
  vfdSpecs: vfdSpec[];
  vfdSpec: vfdSpec;
  sizeTable: sizeTable[];
  sizeTablee: sizeTable[];
  myform: FormGroup;

  constructor(private valueService: ValuesService,
    private router: Router, ) { }

  ngOnInit() {
    this.myform = new FormGroup({
      impedance: new FormControl('', [Validators.required]),
    });
    this.valueService.getMotorSpec().subscribe(data => {
      this.motorSpecs = data;
      this.motorSpec = this.motorSpecs[this.motorSpecs.length - 1];
    })
    this.valueService.getVfdSpec().subscribe(data => {
      this.vfdSpecs = data;
      this.vfdSpec = this.motorSpecs[this.motorSpecs.length - 1];
    })
    this.valueService.getsizeTable().subscribe(data => {
      this.sizeTable = data;

    })
    if(localStorage.getItem("phase")===JSON.stringify('single')){
      this.single = true;
    }
  }

  expo(x, f) {
    return Number.parseFloat(x).toExponential(f);
  }


  processForm() {
    if (this.single) {
      this.Current = this.motorSpec.power / (this.motorSpec.voltage * this.motorSpec.pf);
      this.Inductance = (this.motorSpec.voltage * this.myform.value.impedance) / (6.284 * this.motorSpec.frequency * this.Current);
      this.capacitor = 1 / (4 * 9.872 * this.motorSpec.frequency * this.motorSpec.frequency * Number(this.Inductance))
    }
    else {
      this.Current = this.motorSpec.power / (1.732 * this.motorSpec.voltage * this.motorSpec.pf);
      this.Inductance = (this.motorSpec.voltage * this.myform.value.impedance) / (10.88420 * this.motorSpec.frequency * this.Current*1.4142);
      this.capacitor = 1 / (4 * 9.872 * this.motorSpec.frequency * this.motorSpec.frequency * Number(this.Inductance))
    }
    this.snC = this.capacitor.toExponential().split('e').map(item => Number(item));
    this.snI = this.Inductance.toExponential().split('e').map(item => Number(item));
    this.snC[0]=Number(this.snC[0].toFixed(3));
    this.snI[0]=Number(this.snI[0].toFixed(3)); 
    this.expn = 'x10^';

    //console.log(Number(Number(this.Current).toFixed(1)));
    if (Number(this.Current) > 100) {
      this.sizeTablee = this.sizeTable.filter(x => x.maxCurrent <= Number(Number(this.Current).toFixed(0)) + 20 && x.maxCurrent >= Number(Number(this.Current).toFixed(0)) - 20);
    }
    if (Number(this.Current) < 100 && Number(this.Current) > 50) {
      this.sizeTablee = this.sizeTable.filter(x => x.maxCurrent <= Number(Number(this.Current).toFixed(0)) + 10 && x.maxCurrent >= Number(Number(this.Current).toFixed(0)) - 10);
    }
    if (Number(this.Current) < 50 && Number(this.Current) > 10) {
      this.sizeTablee = this.sizeTable.filter(x => x.maxCurrent <= Number(Number(this.Current).toFixed(0)) + 5 && x.maxCurrent >= Number(Number(this.Current).toFixed(0)) - 5);
    }
    if (Number(this.Current) < 10 && Number(this.Current) > 5) {
      this.sizeTablee = this.sizeTable.filter(x => x.maxCurrent <= Number(Number(this.Current).toFixed(1)) + 0.9 && x.maxCurrent >= Number(Number(this.Current).toFixed(1)) - 0.9);
    }
    if (Number(this.Current) < 5 && Number(this.Current) > 1) {
      this.sizeTablee = this.sizeTable.filter(x => x.maxCurrent <= Number(Number(this.Current).toFixed(1)) + 0.3 && x.maxCurrent >= Number(Number(this.Current).toFixed(1)) - 0.3);
    }
    if (Number(this.Current) < 1 && Number(this.Current) > 0.5) {
      this.sizeTablee = this.sizeTable.filter(x => x.maxCurrent <= Number(Number(this.Current).toFixed(2)) + 0.10 && x.maxCurrent >= Number(Number(this.Current).toFixed(2)) - 0.10);
    }
    if (Number(this.Current) < 0.5 && Number(this.Current) > 0.1) {
      this.sizeTablee = this.sizeTable.filter(x => x.maxCurrent <= Number(Number(this.Current).toFixed(2)) + 0.05 && x.maxCurrent >= Number(Number(this.Current).toFixed(2)) - 0.05);
    }
    if (Number(this.Current) < 0.10) {
      this.sizeTablee = this.sizeTable.filter(x => x.maxCurrent <= Number(Number(this.Current).toFixed(2)) + 0.01 && x.maxCurrent >= Number(Number(this.Current).toFixed(2)) - 0.01);
    }
    this.Current = Number(this.Current.toFixed(2));
    this.sizeTablee.forEach(x => {
      this.AWG = x.AWS;
      this.diameter = x.Diameter;
      this.area = x.Area;
    });
  }

}
