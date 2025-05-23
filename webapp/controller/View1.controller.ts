import Controller from "sap/ui/core/mvc/Controller";
import JSONModel from "sap/ui/model/json/JSONModel";

export default class View1 extends Controller {
  public onInit(): void {
    const data = {
      books: [
        {
          name: "Rahul Sharma",
          book: "Clean Code",
          issueDate: "2025-05-01",
          expiryDate: "2025-05-21",
          status: "Returned"
        },
        {
          name: "Anita Desai",
          book: "Atomic Habits",
          issueDate: "2025-05-05",
          expiryDate: "2025-05-25",
          status: "Overdue"
        },
        {
          name: "Vikram Seth",
          book: "Deep Work",
          issueDate: "2025-05-10",
          expiryDate: "2025-05-30",
          status: "Issued"
        }
      ]
    };

    const oModel = new JSONModel(data);
    const currView = this.getView() as any;
    currView.setModel(oModel);
  }
   
   public createRoute(): void {
    const owner = this.getOwnerComponent() as any;
    const Router = owner.getRouter() as any;
    console.log("page changed");
    Router.navTo("View2");
   }
}

