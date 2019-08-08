import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  productArray: any;
  output : any;
  product: string[];
  private BASE_URL: string = "http://localhost:3000/products";
  constructor(private httpService: HttpClient) { }


  ngOnInit() {
    this.httpService.get(this.BASE_URL).subscribe(data => {
      this.productArray = data;
      let productarray = this.productArray;
      // console.log("productarray", productarray);
      //  Filter Parent Category
      let products = this.distinctObject(productarray, 'parent_category', 'parent_name');

      // Filter Catefory by Group
      products.forEach(parent => {
      let filterGroup = this.distinctObject(parent.value, 'group_category', 'group_name');
      // console.log("filterGroup",filterGroup)
      parent.value = filterGroup;
        // console.log("parent",parent);
        // console.log("parent value",parent);
      });
      this.output = products;
      // console.log("output==",this.output);
    });
  }


  // Distinct objects by property value from an array of objects 
  distinctObject(category, filterby, keyName) {
    const result = [];
    const map = new Map();
  //  console.log("result",result)
    for (const item of category) {
        // console.log("item",item)
      if (!map.has(item[filterby].id)) {
        // console.log("map1",map)
      //  console.log("item filter by id",item[filterby].id);  // it filtered id 1,2 & 1,2,3,4
        map.set(item[filterby].id, true); 
        // console.log("item filter by id",item[filterby].id);  // it filtered id 1,2 & 1,2,3,4
        // console.log("map2",map)
        var tempArray = [];
        //  console.log("item",item)
        tempArray.push(item);
       
      //  console.log("item in temp array",tempArray)
        result.push({
          id: item[filterby].id,
          name: item[filterby][keyName],
          value: tempArray
        });
        // console.log("filterby",filterby)
          // console.log("result",result)
      } else {
        
        let filterCat = result.find(cat => cat.id === item[filterby].id);
        // console.log("result",result)
        filterCat.value.push(item);
        // console.log(" item[filterby].id ", item[filterby].id) // it filtered id 1,2 & 1,2,3,4
        // console.log("filterCat",filterCat)
        //  console.log("item pushing in else cdn",item);  // it filtered item 2 to 16
      }
    }
    // console.log("result array",result);
    return result;
   
  }
  
}