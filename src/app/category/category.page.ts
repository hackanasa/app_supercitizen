import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {
  
  categorias: any
  formCategoria: FormGroup

  constructor(private formBuilder: FormBuilder,
               private api: RestService,
               public alertController: AlertController,
               private router: Router) {
    this.createForm()
  }

  ngOnInit() {
    this.api.listarCategorias().subscribe(
      data => {
        this.categorias = data
      }
    )
  }

  createForm(){
    this.formCategoria = this.formBuilder.group({
       latitude: [localStorage.getItem('latitude')],
       longitude: [localStorage.getItem('longitude')],
       categoria: ['',[Validators.required]],
       descricao: ['',[Validators.required]]
     })
   }

   get categoria(){ return this.formCategoria.get('categoria') }
  get descricao(){ return this.formCategoria.get('descricao') }

  async confirmar(){

    const alert = await this.alertController.create({
      message: 'Sua ocorrência foi cadastrada com sucesso!',
      buttons: ['OK']
    });

    this.api.incluirMarcardor(this.formCategoria.value).subscribe( 
      data => {
        alert.present();
        this.router.navigate(['home'])
      }
    )
    
  }
  

}
