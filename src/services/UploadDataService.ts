import { IUploadData } from "@/models/UploadData/IUploadData";

export class UploadDataService {
    private static uploadData: IUploadData = JSON.parse(localStorage.getItem("uploadData") || "{}")

    public static setUploadData(newUploadData: IUploadData): void {
        localStorage.setItem("uploadData", JSON.stringify(newUploadData))
        this.uploadData = newUploadData;
    }
    
    public static getUploadData(): IUploadData {
        const storedUploadData = JSON.parse(localStorage.getItem("uploadData") || "{}")
        this.uploadData = storedUploadData
        return this.uploadData
    }
}