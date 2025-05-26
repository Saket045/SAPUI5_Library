import Controller from "sap/ui/core/mvc/Controller";
import JSONModel from "sap/ui/model/json/JSONModel";
import MessageToast from "sap/m/MessageToast";
export default class View1 extends Controller {
  public formModel: JSONModel = new JSONModel({
    name: "",
    book: "",
    issuedDate: "",
    expiryDate: "",
  });

  public onInit(): void {
    const owner = this.getOwnerComponent() as any;
    const savedList = localStorage.getItem("formDataList");
    const parsed = savedList ? JSON.parse(savedList) : [];
  
    const formDataListModel = new JSONModel(parsed);
    owner.setModel(formDataListModel, "formDataList");
    console.log(owner.getModel());
    this.formModel = new JSONModel({
      name: "",
      book: "",
      issuedDate: "",
      expiryDate: "",
    });
    (this.getView() as any).setModel(this.formModel, "form");
  }
  

  public onInputChange(oEvent: any): void {
    const input = oEvent.getSource();
    const fieldName = input.getName(); 

    let value = "";
    if (input.getMetadata().getName() === "sap.m.DatePicker") {
      value = input.getDateValue(); 
    } else {
      value = input.getValue();
    }

    this.formModel.setProperty(`/${fieldName}`, value);
    console.log(`${fieldName} updated to:`, value);
  }

  public onSavePress(): void {
    const owner = this.getOwnerComponent() as any;
    const oView = this.getView() as any;
    const data = this.formModel.getData(); 
    const name = (oView.byId("inputName") as any).getValue();
    const book = (oView.byId("inputBook") as any).getValue();
    let issueDate = oView.byId("inputIssued").getValue();
    let expiryDate = oView.byId("inputExpiry").getValue();
  
  expiryDate = new Date(data.expiryDate).toISOString().slice(0, 10);
  console.log(name , book , issueDate , expiryDate);
   if(name === ""){
   MessageToast.show("Name is invalid");
   return;
   }
   if(book === ""){
   MessageToast.show("Book is invalid");
   return;
   }

   if(!issueDate){
   MessageToast.show("Issue date not valid");
   return;
   }
   if(!expiryDate){
   MessageToast.show("Expiry date not valid");
   return;
   }

  issueDate = new Date(issueDate);
  expiryDate = new Date(expiryDate);
   
   if (issueDate && expiryDate && expiryDate <= issueDate) {
     MessageToast.show("Expiry Date cannot be less than or equal to Issue Date");
     return;
   }

    let formDataModel = owner.getModel("formDataList") as JSONModel;
    if (!formDataModel) {
      formDataModel = new JSONModel([]);
      owner.setModel(formDataModel, "formDataList");
    }
  const updatedList = JSON.parse(localStorage.getItem("formDataList") || "[]");
updatedList.push({
  ...data,
  expiryDate: new Date(data.expiryDate).toISOString().slice(0, 10),
});

formDataModel.setData(updatedList); 
localStorage.setItem("formDataList", JSON.stringify(updatedList)); 
  
    this.formModel.setData({
      name: "",
      book: "",
      issuedDate: "",
      expiryDate: "",
    });
  
    MessageToast.show("Form data saved!");
    const Router = owner.getRouter() as any;
    console.log("page changed");
    Router.navTo("View1");
  }
  
  public onCancelPress(): void {
    const oView = this.getView() as any;
    (oView.byId("inputName") as any).setValue("");
    (oView.byId("inputBook") as any).setValue("");
    (oView.byId("inputIssued") as any).setValue("");
    (oView.byId("inputExpiry") as any).setValue("");
  
    MessageToast.show("Form cleared.");
  }
}