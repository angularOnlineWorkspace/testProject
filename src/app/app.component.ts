import { Component, ViewChild , AfterViewInit,ElementRef }  from '@angular/core';
import { jqxGridComponent } from 'node_modules/jqwidgets-scripts/jqwidgets-ts/angular_jqxgrid'
import { jqxDropDownListComponent } from 'node_modules/jqwidgets-scripts/jqwidgets-ts/angular_jqxdropdownlist';
import { jqxNotificationComponent } from 'node_modules/jqwidgets-scripts/jqwidgets-ts/angular_jqxnotification';
import { jqxTabsComponent }  from 'node_modules/jqwidgets-scripts/jqwidgets-ts/angular_jqxtabs';

import {DataService,JSONData, UserData} from '../data.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent  implements AfterViewInit{
  @ViewChild('myGrid') myGrid: jqxGridComponent;
  @ViewChild('myDropDownList') myDropDownList: jqxDropDownListComponent;
  @ViewChild('popover') myPopover: jqxNotificationComponent;
  @ViewChild('myTabs') myTabs: jqxTabsComponent;
  @ViewChild('notificationText') popoverText: ElementRef;
  @ViewChild('loadedText') loadText: ElementRef;
  innerHTML = '';
  title = 'testProject';
  values: number[] = [102, 115, 130, 137];
   JSONdata: any;
  constructor(private dataService: DataService) {
    this.dataService.getData()
.subscribe((data) => {this.JSONdata =data ;
  //this.popoverText.nativeElement.innerHTML += '<p>'+JSON.stringify(this.JSONdata)+'</p>';
  this.source.localdata = this.JSONdata;
  this.myGrid.updatebounddata('cells');
//  this.myGrid.autoresizecolumns();
},error => alert(error) );

  }

  source: any =
  {
      datatype: 'json',
      datafields: [
          { name: 'postId', type: 'number' },
          { name: 'id',  type: 'number' },
          { name: 'name',  type: 'string' },
          { name: 'email',  type: 'string' },
          { name: 'body', type: 'string' }
          //{ name: 'ShipCountry', map: 'm\\:properties>d\\:ShipCountry', type: 'string' }
      ],
      //root: 'entry',
     // record: 'content',
     // id: 'm\\:properties>d\\:OrderID',
     //localdata: this.JSONdata
     // ,data: {
     //   postId: 1
      //} 
  };
getWidth() : any {
  if (document.body.offsetWidth < 850) {
    return '90%';
  }
  
  return '100%';
}
  dataAdapter: any = new jqx.dataAdapter(this.source,
    {   formatData: function (data) {
     //  data = {postID:1}
      return data;
  },
      loadError:function (jqXHR, status, error) 
        {
          //this.title = error;
        //  this.myDropDownList.sourceListBox=[jqXHR, status, error];

          console.log('123123');
         // console.log(jqXHR.responseText);
          alert('status'+status)
        },
        downloadComplete: function (edata, textStatus, jqXHR)
        {
            //data empty - we have a problem
            if (!jqXHR || jqXHR.responseText.length<=2)
           {
  
            this.myPopover.open();
           } //alert("little/no data");
            //alert( jqXHR.responseText.length);

        }.bind(this)
    }

    );
  columns: any[] =
  [
      { text: 'Ship Name', datafield: 'postId', width: 250 },
      { text: 'Ship City', datafield: 'id', width: 250 },
      { text: 'Ship Country', datafield: 'name', width: 200 },
      { text: 'Freight', datafield: 'email', width: 130,   cellsalign: 'right' },
      { text: 'Ship Address', datafield: 'body', width: 350 }
  ];
  refreshBtnOnClick(): void {
   // this.source.data.postId = 3
    // passing 'cells' to the 'updatebounddata' method will refresh only the cells values when the new rows count is equal to the previous rows count.
    this.myGrid.updatebounddata('cells');
    this.update();
}
clearBtnOnClick(): void {
  this.myGrid.clear();
}
excelBtnOnClick() {
  this.myGrid.exportdata('xls', 'jqxGrid');
};
xmlBtnOnClick() {
  this.myGrid.exportdata('xml', 'jqxGrid');
};
csvBtnOnClick() {
  this.myGrid.exportdata('csv', 'jqxGrid');
};
tsvBtnOnClick() {
  this.myGrid.exportdata('tsv', 'jqxGrid');
};
htmlBtnOnClick() {
  this.myGrid.exportdata('html', 'jqxGrid');
};
jsonBtnOnClick() {
  this.myGrid.exportdata('json', 'jqxGrid');
};
pdfBtnOnClick() {
  this.myGrid.exportdata('pdf', 'jqxGrid');
};



ngAfterViewInit(): void {
  this.myDropDownList.checkIndex(0);
 // this.myDropDownList.checkIndex(1);
 // this.myDropDownList.checkIndex(2);
 // this.myDropDownList.checkIndex(5);
 //this.myDropDownList.dropDownVerticalAlignment('top');
//console.log('kljkljklj');


this.myPopover.open();

};

test:UserData ;

update()
{this.dataService.getUsers()
.subscribe((data:JSONData) => {this.test =data.data ;
  this.popoverText.nativeElement.innerHTML += '<p>'+JSON.stringify(this.test[0])+'</p>';
  var arr = [];
  for (var i = 0; i < Object.keys(this.test).length; i++) {
      arr.push(this.test[i]['last_name']);
  }
  this.loadText.nativeElement.innerHTML= 'Loaded:'+data.total;
  this.sourceListBox = arr;
  this.myDropDownList.checkIndex(1);
} );


}

sourceListBox: string[] = [
  "1",
  "2",
  "3"
 
];
listOnSelect(event: any): void {

  let items = this.myDropDownList.getCheckedItems();
  let checkedItems = '';
  let postIDString = '';
  for (let i = 0; i < items.length; i++) {
    postIDString += items[i].label+'+';

  }
 // this.source.data.postId =postIDString;
  // passing 'cells' to the 'updatebounddata' method will refresh only the cells values when the new rows count is equal to the previous rows count.
  this.myGrid.updatebounddata('cells');
//  checkedItemsContainer.innerHTML = checkedItems;
};
myTabsOnSelected(event: any): void {
  this.update();
};


}
