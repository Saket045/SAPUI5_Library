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
    const data = this.formModel.getData(); // current form values
  
    // Get the list model (array of entries)
    let formDataModel = owner.getModel("formDataList") as JSONModel;
    if (!formDataModel) {
      formDataModel = new JSONModel([]);
      owner.setModel(formDataModel, "formDataList");
    }
  
    // Push current data into the list
    const savedList = formDataModel.getData(); // this is an array
    savedList.push({ ...data }); // clone the object to avoid mutation
    formDataModel.setData(savedList); // update the model
   console.log(formDataModel , "main");
    // Save to localStorage to persist across sessions
    localStorage.setItem("formDataList", JSON.stringify(savedList));
  
    // Optionally reset the form
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