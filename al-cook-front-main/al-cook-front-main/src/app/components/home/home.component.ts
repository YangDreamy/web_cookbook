import { Component, OnInit } from '@angular/core';
import { FileUploader } from "ng2-file-upload";
import { Recipe } from '../../datamodel/Recipe';
import { RecipeService } from 'src/app/service/recipe.service';
import { DomSanitizer } from '@angular/platform-browser';
// import { Buffer } from 'buffer';

import Swal from 'sweetalert2'
import { Category } from 'src/app/datamodel/Category';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public rname: string = "";
  public showList: any = [];
  public typeList: any = [];
  type: string = "";

  // B: 初始化定义uploader变量,用来配置input中的uploader属性
  public uploader: FileUploader = new FileUploader({
    url: "http://localhost:3000/ng2/uploadFile",
    method: "POST",
    itemAlias: "uploadedfile"
  });
  // C: 定义事件，选择文件
  selectedFileOnChanged(event: any) {
    // 打印文件选择名称
    console.log(event.target.value);
  }
  // D: 定义事件，上传文件
  uploadFile() {
    // 上传
    this.uploader.queue[0].onSuccess = function (response, status, headers) {
      // 上传文件成功
      if (status == 200) {
        // 上传文件后获取服务器返回的数据
        let tempRes = JSON.parse(response);
      } else {
        // 上传文件后获取服务器返回的数据错误
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'end time is before start time! please change it',
          footer: '<a href>Why do I have this issue?</a>'
        })
      }
    };
    this.uploader.queue[0].upload(); // 开始上传
  }

  constructor(private recipeService: RecipeService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    // this.showList = this.recipeinfo;
    this.getAllRecipes();
    this.getAllCategories();
  }

  public resRecipes: Recipe[] = [];
  public resCategory: Category[] = [];
  public resRecRecipes: Recipe[] = [];

  translateArrayBufferToBase64(buffer: any) {
    let binaryStr = "";
    const bytes = new Uint8Array(buffer);
    for (let i = 0, len = bytes.byteLength; i < len; i++) {
      binaryStr += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binaryStr);
  }

  getAllRecipes() {
    this.recipeService.getAllRecipes().subscribe((data) => {
      // console.log(data)
      for (let ele of data) {
        if (ele.main_image == null) continue;
        const arrayBuffer = new Uint8Array(ele.main_image.data)
        var bufferBase64 = this.translateArrayBufferToBase64(arrayBuffer);
        // console.log(bufferBase64)
        ele.main_image = this.sanitizer.bypassSecurityTrustUrl("data:image/jpg;base64," + bufferBase64)
      }
      this.resRecipes = data;
    });
  }

  formatString(value: any) {
    if (value == null || value == "" || value == undefined) {
      return "";
    } else {
      var str = value.replace(/\ +/g, "");
      str = str.replace(/[\r\n]/g, "");
      return str;
    }
  }

  getRecipesByName() {
    this.recipeService.getRecipesByName(this.rname).subscribe((data) => {
      // console.log(data)
      for (let ele of data) {
        if (ele.main_image == null) continue;
        const arrayBuffer = new Uint8Array(ele.main_image.data)
        var bufferBase64 = this.translateArrayBufferToBase64(arrayBuffer);
        // console.log(bufferBase64)
        ele.main_image = this.sanitizer.bypassSecurityTrustUrl("data:image/jpg;base64," + bufferBase64)
      }
      this.resRecipes = data;
      this.getRecommendedRecipe(this.resRecipes[0].recipe_id);
    });
  }

  getAllCategories() {
    this.recipeService.getAllCategories().subscribe((data) => {
      this.resCategory = data;
    });
  }

  getRecipesByCategory(category_id: Number) {
    this.recipeService.getRecipesByCategory(category_id).subscribe((data) => {
      // console.log(data)
      for (let ele of data) {
        if (ele.main_image == null) continue;
        const arrayBuffer = new Uint8Array(ele.main_image.data)
        var bufferBase64 = this.translateArrayBufferToBase64(arrayBuffer);
        // console.log(bufferBase64)
        ele.main_image = this.sanitizer.bypassSecurityTrustUrl("data:image/jpg;base64," + bufferBase64)
      }
      this.resRecipes = data;
    });
  }

  getRecommendedRecipe(recipe_id: Number) {
    // console.log("!!!!");
    console.log(recipe_id);
    this.recipeService.getRecommendedRecipe(recipe_id).subscribe((data) => {
      console.log(data)
      for (let ele of data) {
        if (ele.main_image == null) continue;
        const arrayBuffer = new Uint8Array(ele.main_image.data)
        var bufferBase64 = this.translateArrayBufferToBase64(arrayBuffer);
        // console.log(bufferBase64)
        ele.main_image = this.sanitizer.bypassSecurityTrustUrl("data:image/jpg;base64," + bufferBase64)
      }
      this.resRecRecipes = data;
    });
  }

  addRecipeToMealCart(recipe_id: Number) {
    console.log("!!!!");
    this.recipeService.addRecipeToMealCart(recipe_id).subscribe();
  }

  addRecipe(recipe_id: Number){
    Swal.fire({
      title: 'Do you want to add this recipe to your meal cart?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: `yes`,
      confirmButtonColor: `coral`,
      denyButtonText: `no`,
      denyButtonColor: `rgb(238, 205, 148)`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.addRecipeToMealCart(recipe_id);
        Swal.fire('Good choice !', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Let me see...', '', 'info')
      }
    })
  }
}
