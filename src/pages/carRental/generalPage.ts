import { action, gondola, locator, page } from "gondolajs";

@page
export class generalPage {
    @locator
    public commonPicker = { className: "XCUIElementTypePickerWheel" };
    @locator
    public monthPicker = {
        android: { xpath: "//android.widget.NumberPicker[1]" },
        ios: { xpath: "//XCUIElementTypePickerWheel[1]" },
    };
    @locator
    public datePicker = {
        android: { xpath: "//android.widget.NumberPicker[2]" },
        ios: { xpath: "//XCUIElementTypePickerWheel[2]" },
    };
    @locator
    public yearPicker = {
        android: { xpath: "//android.widget.NumberPicker[3]" },
        ios: { xpath: "//XCUIElementTypePickerWheel[3]" },
    };
    @locator
    public doneBtn = {
        android: "//android.widget.Button[@text=\"Set\"]",
        ios: "~Done",
    };
    @action("select", "select value in list or picker")
    public async select(list: any, value: any) {
        let platformName = (await gondola.getCapabilities()).platformName.toLowerCase();
        if (platformName === "android") {
            await gondola.tap(list);
            await gondola.tap(value);
        }
        if (platformName === "iOS") {
            let listBound = await gondola.getElementBounds(list);
            await gondola.swipeByCoordinates(listBound.left + 5, listBound.top + (listBound.height / 2), -(listBound.width), 0);
            await gondola.setPickerValue(this.commonPicker, value);
            await gondola.tap(this.doneBtn);
        }
    }
    @action("select calendar", "select date on calendar")
    public async setCalendar(calendar: any, date: any) {
        let platformName = (await gondola.getCapabilities()).platformName.toLowerCase();
        let monthNames: string[] = [];
        if (platformName === "android") {
            monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            await gondola.tap(calendar);
        }
        if (platformName === "iOS") {
            monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            let calendarBound = await gondola.getElementBounds(calendar);
            await gondola.swipeByCoordinates(calendarBound.left + 2, calendarBound.top + (calendarBound.height / 2), -(calendarBound.width), 0);
        }
        await gondola.waitForElement(this.yearPicker, 10);
        await gondola.setPickerValue(this.yearPicker, date.getFullYear().toString());
        if (platformName === "android") {
            await gondola.setPickerValue(this.datePicker, ("0" + date.getDate()).slice(-2));
        }
        if (platformName === "iOS") {
            await gondola.setPickerValue(this.datePicker, date.getDate().toString());
        }
        await gondola.setPickerValue(this.monthPicker, monthNames[date.getMonth()]);
        await gondola.tap(this.doneBtn);
    }
}
export default new generalPage();
