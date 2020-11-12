import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(
    private http: HttpClient
    ) {  }

  // metodo generico e pode ser utilizado em outros locais da aplicação
  upload(files: Set<File>, url: string){

    const formData = new FormData();
    files.forEach(file => formData.append('file', file, file.name))

    const request = new HttpRequest('POST', url, formData)
    
    return this.http.post(url, formData, {
      observe: 'events',
      reportProgress: true,
    });
  }

  download(url: string){
    return this.http.get(url, {
      responseType: 'blob', // pode adicionar as 'json'
      // reportProgress: ,
      // content-length: , // para informar o tamanho do arquivo ao angular.
    })
  }

  handleFile(res: any, fileName: string){
    const file = new Blob([res], {
      type: res.type // informa o tipo do arquivo
    });

    // IE 11
    if(window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(file);
      return;
    }

    const blob = window.URL.createObjectURL(file); //criando um link

    const link = document.createElement('a');
    link.href = blob;
    link.download = fileName;

    // link.click(); // só para o chrome e IE11, não funciona para o firefox
    // modificações para o firefox: dispatch event & settimeout
    // continua funcionando no chrome
    link.dispatchEvent(new MouseEvent('click', {
      bubbles: true,
      cancelable:true,
      view: window
    }));

    setTimeout(() => {
      window.URL.revokeObjectURL(blob);
      link.remove();
    }, 200);
  }
}
