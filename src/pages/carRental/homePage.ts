import { action, gondola, locator, page } from "gondolajs";

@page
export class homePage {
    @locator
    public newOrder = {
        android: "~Button New Order",
        ios: "//XCUIElementTypeButton[@name=\"ButtonNewOrder\"]",
    };
    @action("open new order", "Open new order screen")
    public async openNewOrder() {
        await gondola.waitForElement(this.newOrder, 5);
        await gondola.tap(this.newOrder);
    }
    @action("check home page opened", "Verify that the homepage hase been opened")
    public async checkOpened() {
        await gondola.checkControlExist(this.newOrder);
    }
    @action("check home page not opened", "Verify that the homepage is not opened")
    public async checkNotOpened() {
        await gondola.checkControlNotExist(this.newOrder);
    }
}
export default new homePage();
