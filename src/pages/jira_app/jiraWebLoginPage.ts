import { gondola, locator, page, action } from "gondolajs";

@page
export class JiraWebLoginPage {
    @locator public tbUsername = `//input[@id="username"]`;
    @locator public tbPassword = `//input[@id="password"]`;
    @locator public btnContinue = `//button[.="Continue"]`;
    @locator public btnLoginSubmit = `//button[@id="login-submit"]`;

    @action("login", "login")
    public async login() {
        await gondola.waitForElement(this.tbUsername, 30);
        await gondola.enter(this.tbUsername, "thanh.chi.nguyen@logigear.com");
        await gondola.click(this.btnContinue);
        await gondola.waitForClickable(this.tbPassword, 30);
        await gondola.enter(this.tbPassword, "Th99171590");
        await gondola.click(this.btnLoginSubmit);
    }
}

export default new JiraWebLoginPage();
