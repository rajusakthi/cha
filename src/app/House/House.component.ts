import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HouseService } from './House.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-House',
	templateUrl: './House.component.html',
	styleUrls: ['./House.component.css'],
  providers: [HouseService]
})
export class HouseComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
	private errorMessage;

  
      
          houseId = new FormControl("", Validators.required);
        
  
      
          ownershipType = new FormControl("", Validators.required);
        
  
      
          apt = new FormControl("", Validators.required);
        
  
      
          address = new FormControl("", Validators.required);
        
  
      
          city = new FormControl("", Validators.required);
        
  
      
          state = new FormControl("", Validators.required);
        
  
      
          zip = new FormControl("", Validators.required);
        
  


  constructor(private serviceHouse:HouseService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          houseId:this.houseId,
        
    
        
          ownershipType:this.ownershipType,
        
    
        
          apt:this.apt,
        
    
        
          address:this.address,
        
    
        
          city:this.city,
        
    
        
          state:this.state,
        
    
        
          zip:this.zip
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceHouse.getAll()
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else{
            this.errorMessage = error;
        }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: "org.groci.house.House",
      
        
          "houseId":this.houseId.value,
        
      
        
          "ownershipType":this.ownershipType.value,
        
      
        
          "apt":this.apt.value,
        
      
        
          "address":this.address.value,
        
      
        
          "city":this.city.value,
        
      
        
          "state":this.state.value,
        
      
        
          "zip":this.zip.value
        
      
    };

    this.myForm.setValue({
      
        
          "houseId":null,
        
      
        
          "ownershipType":null,
        
      
        
          "apt":null,
        
      
        
          "address":null,
        
      
        
          "city":null,
        
      
        
          "state":null,
        
      
        
          "zip":null
        
      
    });

    return this.serviceHouse.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "houseId":null,
        
      
        
          "ownershipType":null,
        
      
        
          "apt":null,
        
      
        
          "address":null,
        
      
        
          "city":null,
        
      
        
          "state":null,
        
      
        
          "zip":null 
        
      
      });
    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else{
            this.errorMessage = error;
        }
    });
  }


   updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: "org.groci.house.House",
      
        
          
        
    
        
          
            "ownershipType":this.ownershipType.value,
          
        
    
        
          
            "apt":this.apt.value,
          
        
    
        
          
            "address":this.address.value,
          
        
    
        
          
            "city":this.city.value,
          
        
    
        
          
            "state":this.state.value,
          
        
    
        
          
            "zip":this.zip.value
          
        
    
    };

    return this.serviceHouse.updateAsset(form.get("houseId").value,this.asset)
		.toPromise()
		.then(() => {
			this.errorMessage = null;
		})
		.catch((error) => {
            if(error == 'Server error'){
				this.errorMessage = "Could not connect to REST server. Please check your configuration details";
			}
            else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
			}
			else{
				this.errorMessage = error;
			}
    });
  }


  deleteAsset(): Promise<any> {

    return this.serviceHouse.deleteAsset(this.currentId)
		.toPromise()
		.then(() => {
			this.errorMessage = null;
		})
		.catch((error) => {
            if(error == 'Server error'){
				this.errorMessage = "Could not connect to REST server. Please check your configuration details";
			}
			else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
			}
			else{
				this.errorMessage = error;
			}
    });
  }

  setId(id: any): void{
    this.currentId = id;
  }

  getForm(id: any): Promise<any>{

    return this.serviceHouse.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "houseId":null,
          
        
          
            "ownershipType":null,
          
        
          
            "apt":null,
          
        
          
            "address":null,
          
        
          
            "city":null,
          
        
          
            "state":null,
          
        
          
            "zip":null 
          
        
      };



      
        if(result.houseId){
          
            formObject.houseId = result.houseId;
          
        }else{
          formObject.houseId = null;
        }
      
        if(result.ownershipType){
          
            formObject.ownershipType = result.ownershipType;
          
        }else{
          formObject.ownershipType = null;
        }
      
        if(result.apt){
          
            formObject.apt = result.apt;
          
        }else{
          formObject.apt = null;
        }
      
        if(result.address){
          
            formObject.address = result.address;
          
        }else{
          formObject.address = null;
        }
      
        if(result.city){
          
            formObject.city = result.city;
          
        }else{
          formObject.city = null;
        }
      
        if(result.state){
          
            formObject.state = result.state;
          
        }else{
          formObject.state = null;
        }
      
        if(result.zip){
          
            formObject.zip = result.zip;
          
        }else{
          formObject.zip = null;
        }
      

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else{
            this.errorMessage = error;
        }
    });

  }

  resetForm(): void{
    this.myForm.setValue({
      
        
          "houseId":null,
        
      
        
          "ownershipType":null,
        
      
        
          "apt":null,
        
      
        
          "address":null,
        
      
        
          "city":null,
        
      
        
          "state":null,
        
      
        
          "zip":null 
        
      
      });
  }

}
