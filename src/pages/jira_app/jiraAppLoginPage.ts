import { gondola, locator, page, action } from "gondolajs";
import jiraWebLoginPage from "./jiraWebLoginPage";

@page
export class JiraAppLoginPage {
    @locator public btnLogin = { id: `com.atlassian.android.jira.core:id/login_btn`};
    @locator public webViewLogin = `//header`;
    @locator public btnUseAnotherAccount = `//*[@text="Use another account"]`;

    @action("login", "login")
    public async login() {
        await gondola.tap(this.btnLogin);
        let doesWebContextExist = false;
        while (doesWebContextExist === false){
            await gondola.wait(5);
            if ((await gondola.getAllContexts()).length > 1){
                doesWebContextExist = true;
            }
        }
        await gondola.switchToContext("WEBVIEW_chrome");
        await gondola.waitForElement(this.webViewLogin, 120);
        //await gondola.waitForElement(this.btnUseAnotherAccount, 20);
        //let checkRememberAccount = await gondola.doesControlExist(this.btnUseAnotherAccount);
        //if (checkRememberAccount === true){
        //    await gondola.tap(this.btnUseAnotherAccount);
        //}
        let accountLocation = `//*[.="thanh.chi.nguyen@logigear.com"]`
        if ((await gondola.doesControlExist(accountLocation)) === true){
            await gondola.click(accountLocation);
        }
        else{
            await jiraWebLoginPage.login();
        }
        await gondola.switchToContext("NATIVE_APP");
    }
}

export default new JiraAppLoginPage();
