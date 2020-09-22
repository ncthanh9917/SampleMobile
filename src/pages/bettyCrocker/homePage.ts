import { action, gondola, locator, page } from "gondolajs";

@page
export class homePage {
    @locator
    public loginLink = {
        xpath: `//ul[@class="headerLogin"]//li[.="Log In"]`
    };
    @locator
    public emailTxt = {
        xpath: `//div[@class="loginViewForm"]//div[@class="Email-TextBox"]/input`
    };
    @locator
    public passwordTxt = {
        xpath: `//div[@class="loginViewForm"]//div[@class="Password-Password"]//input`
    };
    

    @action("open login dialog", "Open login dialog")
    public async openLoginDialog() {
        await gondola.waitForElement(this.loginLink, 5);
        await gondola.tap(this.loginLink);
    }
    @action("enter account value", "Enter account value")
    public async enterAccount(email:string = 'striker9917@gmail.com', password:string = 'Th99171590') {
        await gondola.waitForElement(this.emailTxt, 5);
        await gondola.enter(this.emailTxt, email);
        await gondola.enter(this.passwordTxt, password);
    } 
}
export default new homePage();
