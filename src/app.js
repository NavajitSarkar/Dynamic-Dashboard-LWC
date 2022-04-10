import { LightningElement,track } from "lwc";
const URL = 'https://services9.arcgis.com/N9p5hsImWXAccRNI/arcgis/rest/services/Z7biAeD8PAkqgmWhxG2A/FeatureServer/1/query?f=json&where=Confirmed+%3E+0&outFields=Country_Region%2CConfirmed%2CDeaths%2CRecovered%2CLast_Update%2CActive&orderByFields=Confirmed+desc';
var initialValue={
  total_deaths : 0,
  total_confirmed : 0,
  total_active : 0,
  total_recovered : 0,
  total_fatality_rate : 0,
  total_recovery_rate : 0 
}
export default class App extends LightningElement {
  @track total = initialValue;

  connectedCallback()
  {
    this.fetchData();
  }

  async fetchData(){
    let response = await fetch(URL);
    console.log('Print response',response);
    let responseJson =await response.json();
    console.log('Print response',responseJson.features);
    this.formatData(responseJson)
  }

  formatData(result)
  {
     result.features.forEach(data=>{
      console.log(data);
      var attr = data.attributes;
      if(attr != null)
        {
          this.total.total_deaths += attr.Deaths;
          this.total.total_confirmed += attr.Confirmed;
          this.total.total_active += attr.Active;
          this.total.total_recovered += attr.Recovered;
        }
    });
    console.log('Total'+JSON.stringify(this.total));
  }
  
   
}
