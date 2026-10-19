import { Page } from "@playwright/test";
import BaseAction from "../utils/basePage";
import { LOCATORS } from "../locators/LoginLocators";

export class LoginShopPage extends BaseAction {

  constructor (page: Page){
   super (page);

}

public async fillEmailAndPassword(email: string, password: string) {
    await this.fillText(LOCATORS.username, email);
    await this.fillText(LOCATORS.password, password);
}

public async clickBtn() {
    await this.clickElements(LOCATORS.btnConnetion);
}
}