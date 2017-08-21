import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class ProductService {

  private products = [];
  
  constructor(private http: Http) { }

  async getProduct(id: number): Promise<object> {
    const response = await this.http.get('https://fumblie-backend.herokuapp.com/products/' + id).toPromise();
    return response.json().product;
  }

  getProducts(ids: array): Promise<array> {
  	  $.each(ids, function(index, value){
        products.push(JSON.stringify(getProduct(value)));
      });

  	return products;
  }



}
