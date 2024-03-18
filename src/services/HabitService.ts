import { IUploadData } from "../models/UploadData/IUploadData";

export class HabitService {
    private static uploadData: IUploadData = JSON.parse(localStorage.getItem("uploadedData") || "")

    public static getUploadedData(): IUploadData{
        const storedploadData = JSON.parse(localStorage.getItem("uploadedData") || "")
        this.uploadData = storedploadData
        return this.uploadData
    }
}