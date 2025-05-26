import Controller from "sap/ui/core/mvc/Controller";
import JSONModel from "sap/ui/model/json/JSONModel";
import MessageToast from "sap/m/MessageToast";
export default class View1 extends Controller {

  public onInit(): void {
    const owner = this.getOwnerComponent() as any;
    // const formDataListModel = owner.getModel("formDataList") as JSONModel;
    // (this.getView() as any).setModel(formDataListModel, "formDataList");
    // const dataStr = localStorage.getItem("formDataList");
    // const data = dataStr ? JSON.parse(dataStr) : [];
    // const oModel = new JSONModel({ books: data });
    // console.log(data);
    // const currView= this.getView() as any;
    // currView.setModel(oModel);
    const router = owner.getRouter();
    router.getRoute("View1").attachPatternMatched(this.onRouteMatched, this);
  }
   
  private onRouteMatched(): void {
    const dataStr = localStorage.getItem("formDataList");
    const data = dataStr ? JSON.parse(dataStr) : [];
  
    const oModel = new JSONModel({ books: data });
    (this.getView() as any).setModel(oModel);
  }
  
   public createRoute(): void {
    const owner = this.getOwnerComponent() as any;
    const Router = owner.getRouter() as any;
    Router.navTo("View2");
   }
  //  public onDeleteSelected1(): void {
  //   const oTable = this.byId("libraryTable") as any;
  //   const selectedItems = oTable.getSelectedItems();
  
  //   if (selectedItems.length === 0) {
  //     MessageToast.show("No rows selected.");
  //     return;
  //   }
  
  //   const sData = localStorage.getItem("formDataList");
  //   const libraryData = sData ? JSON.parse(sData) : [];

  //   const indexesToDelete = selectedItems.map((item:any) =>
  //     oTable.getItems().indexOf(item)
  //   );
  
  //   const updatedData = libraryData.filter((_:any, index:any) => !indexesToDelete.includes(index));
  
  //   localStorage.setItem("formDataList", JSON.stringify(updatedData));
  
  //   const oModel = oTable.getModel() as JSONModel;
  //   oModel.setProperty("/books", updatedData);

  //   oTable.removeSelections();

  //   MessageToast.show("Selected entries deleted.");
  // }

  public onDeleteSelected(oEvent:any): void{
    const button = oEvent.getSource();             
    const table = button.getParent().getParent().getParent();
  
    if (!table || !table.isA("sap.ui.table.Table")) {
      console.error("Table not found.");
      return;
    }
    const selectedIndices = table.getSelectedIndices();
    if (selectedIndices.length === 0) {
      MessageToast.show("No rows selected.");
      return;
    }
    const sData = localStorage.getItem("formDataList");
    const libraryData = sData ? JSON.parse(sData) : [];

    const indexesToDelete = selectedIndices.map((index: number) => {
      const context = table.getContextByIndex(index);
      const path = context.getPath(); 
      return parseInt(path.split("/")[2]);
    });
    
    const updatedData = libraryData.filter((_: any, index: number) =>
      !indexesToDelete.includes(index)
    );
  
    localStorage.setItem("formDataList", JSON.stringify(updatedData));
  
    const oModel = table.getModel() as JSONModel;
    oModel.setProperty("/books", updatedData);

    table.removeSelections();

    MessageToast.show("Selected entries deleted.");

  }
  public newEditPage(): void {
    const owner = this.getOwnerComponent() as any;
    const router = owner.getRouter();
    console.log("Page changed to View3");
    router.navTo("View3");
  }
  
}

