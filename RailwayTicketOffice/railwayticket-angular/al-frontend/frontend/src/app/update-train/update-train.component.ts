import {Component, Inject, OnInit} from '@angular/core';
import {Train} from "../train";
import {ActivatedRoute, Router} from "@angular/router";
import {TrainService} from "../train.service";
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

import * as _moment from 'moment';
// @ts-ignore
import {default as _rollupMoment} from 'moment';
import {MAT_DIALOG_DATA,MatDialog, MatDialogConfig} from "@angular/material/dialog";

const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY-MM-DD',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'YYYY-MM-DD',
    dateA11yLabel: 'YYYY-MM-DD',
    monthYearA11yLabel: 'YYYY-MM-DD',
  },
};

@Component({
  selector: 'app-update-train',
  templateUrl: './update-train.component.html',
  styleUrls: ['./update-train.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class UpdateTrainComponent implements OnInit {

  trainUpdate:Train = new Train();
  dateDeparture = new FormControl(moment());
  dateArrival = new FormControl(moment());
  updateForm: FormGroup;

  constructor(private trainService:TrainService,private router:ActivatedRoute,private route:Router
  ,@Inject(MAT_DIALOG_DATA) public data: any,
              private dialog:MatDialog, private formBuilder: FormBuilder
  ) {
    this.updateForm = this.formBuilder.group({
      nameTrain: ['', [Validators.required, Validators.maxLength(70), Validators.minLength(4)]],
      departureStation: ['', Validators.required],
      arrivalStation: ['', [Validators.required]],
      typeTrain: ['', Validators.required],
      dateDeparture: ['', Validators.required],
      dateArrival: ['', Validators.required],
      totalTicket: ['', [Validators.required, Validators.max(800), Validators.min(1)]],
      availableTicket: ['', [Validators.required, Validators.max(800), Validators.min(1)]],
      priceTicket: ['', [Validators.required, Validators.max(1000), Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    this.trainService.getOneTrainById(this.data.id_train).subscribe(data=>{
      this.trainUpdate=data;
    });
  }

  eidtTrain() {
    if (this.trainUpdate.departureStation !== this.trainUpdate.arrivalStation &&
      new Date(this.trainUpdate.date_time_departure).getTime() <
      new Date(this.trainUpdate.date_time_arrival).getTime()) {
      this.trainService.editTrain(this.trainUpdate).subscribe(data => {
        this.dialog.closeAll();
      }, error => console.log(error));
    }else{
      alert('Error in station or dates');
    }
  }
}
