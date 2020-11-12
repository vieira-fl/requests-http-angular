import { environment } from '../../../environments/environment'
import { Subscription } from 'rxjs';
import { UploadFileService } from './../services/upload-file.service';
import { Component, OnInit } from '@angular/core';
import { createElementCssSelector } from '@angular/compiler';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { filterResponse, uploadProgress } from 'src/app/shared/rxjs-operators';
import { windowCount } from 'rxjs/operators';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {

  fileNames2: string = 'Selecione o(s) arquivo(s) para upload...';
  files: Set<File>; // estrutura de dados set impede que o usuário selecione o arquivo 2 vezes para subir no servidor
  progress: number = 0;
  sub: Subscription;

  constructor(
    private uploadFileService: UploadFileService,
  ) { }

  ngOnInit(): void {
  }

  onChange(event){
    const selectedFiles = <FileList>event.srcElement.files;

    const fileNames = [];
    this.files = new Set();
    
    for(let i = 0; i < selectedFiles.length; i++){
      fileNames.push(selectedFiles[i].name);
      this.files.add(selectedFiles[i]); // para adicionar os arquivos no files Set()...
    }
    document.getElementById('customFileLabel').innerHTML = fileNames.join('; ')

    this.progress = 0; // reiniciando o progresso de upload.
    // outra forma....
    // this.fileNames2 = [...event.srcElement.files]
    // .map((file) => {
    //   `${file.name}`;
    // }).join('; ')
    // e fazer um interpollation no template html na label ou o inner HTML abaixo
    // document.getElementById('customFileLabel').innerHTML = this.fileNames2;
  }

  // subir arquivos para o servidor
  onUpload(){
    if(this.files && this.files.size > 0){
      this.sub = this.uploadFileService.upload(this.files, `${environment.BASE_URL}/upload`)
      .pipe(
        // utilizando os rxjs operators criado por mim e não um default do rxjs
        uploadProgress(progress => {
          console.log(progress);
          this.progress = progress;
        }),
        filterResponse()
      )
      .subscribe(response => console.log('upload concluído'))
      // .subscribe((event: HttpEvent<Object>) => {
      //   // HttpEventType.UploadProgress.
      //   console.log(event);

      //   if(event.type === HttpEventType.Response){
      //     console.log('upload concluído');
      //   } 
      //   else if (event.type === HttpEventType.UploadProgress) {
      //     const percentDone = Math.round((event.loaded * 100) / event.total);
      //     console.log('Progresso', percentDone);
      //     this.progress = percentDone;
      //   }
      // });
      // com Cors é melhor fazer o unsubscribe.
    } else {
      console.log('não rolou')
    }
  }

  onDownloadExcel(){
      this.uploadFileService.download(`${environment.BASE_URL}/downloadExcel`)
      .subscribe((res: any) => {
        this.uploadFileService.handleFile(res, 'report.xlsx')
        // removendo o link
      });
  }

  onDownloadPdf(){
    this.uploadFileService.download(`${environment.BASE_URL}/downloadPdf`)
      .subscribe((res: any) => {
        this.uploadFileService.handleFile(res, 'report.pdf')
        // removendo o link
      });
  }
  
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    // this.sub.unsubscribe();
  }
}
