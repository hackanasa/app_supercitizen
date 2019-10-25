import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit {

  constructor(private router: Router,
    private modalController: ModalController,) { }

  ngOnInit() {
  }

  confirmarEndereco(){
     this.router.navigate(['address'])
  }


}
