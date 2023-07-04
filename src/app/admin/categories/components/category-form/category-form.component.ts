import { Component, OnInit } from '@angular/core';
// import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormControl, Validators, FormBuilder, FormGroup } from "@angular/forms";
import { Router } from '@angular/router';
import { CategoriesService } from 'src/app/core/services/categories.service';
import { finalize } from "rxjs/operators";


import { Storage, ref, uploadBytes, listAll, getDownloadURL, StorageReference } from '@angular/fire/storage';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {

  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private router: Router,
    private storage: Storage
  ) {
    this.buildForm();
   }

  ngOnInit(): void {
  }

  private buildForm(){
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      image: ['', [Validators.required]]
    })
  }

  save(){
    if (this.form.valid) {
      this.createCategory();
    }else{
      this.form.markAllAsTouched();
    }
  }

  private createCategory(){
    const  data  = this.form.value;
    this.categoriesService.createCategory(data)
      .subscribe(value => {
        console.log(value);
        this.router.navigate(['./admin/categories'])
      })
  }



  get nameField(){
    return this.form.get('name')
  }

  get imageField(){
    return this.form.get('image')
  }

  uploadFile(event: unknown ) {
    // const image = event.target.files[0];
    // const name = image.name;
    // const imgRef = ref(this.storage,`imagenes/${name}`);
    // const task = uploadBytes(imgRef,image);

    // task
    //   .then(response => {
    //     console.log(response);
    //     this.getImage(name)
    //   })
    //   .catch(error => console.log(error))
  }

  // getImage(nameImage:string) {
  //   const imgRef = ref(this.storage, 'imagenes')
  //   listAll(imgRef)
  //     .then( async rta => {
  //       const itemActual: StorageReference|undefined = rta.items.find(item => item.name === nameImage);
  //       if(itemActual){
  //         const url = await getDownloadURL(itemActual)
  //         this.imageField?.setValue(url);
  //         console.log(url); 
  //       }
  //     })
  //   }

}
