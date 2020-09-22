import { action, gondola, locator, page } from "gondolajs";
import { generalPage } from "./generalPage";
import utilities from "../../utilities/utility";

@page
export class orderPage extends generalPage {
    @locator
    public pickDate = {
        android: "~Text View Current Date",
        ios: "~pickupDate",
    };
    @locator
    public returnCalendar = {
        android: "~Return Date Calendar",
        ios: "~returnDate",
    };
    @locator
    public pickState = {
        android: "#com.logigear:id/spinStates",
        ios: "~pickupState",
    };
    @locator
    public pickCity = {
        android: "~Pickup City",
        ios: "~pickupCityText",
    };
    @locator
    public returnState = {
        android: "#com.logigear:id/spinStates",
        ios: "~returnState",
    };
    @locator
    public returnCity = {
        android: "~Return City",
        ios: "~returnCityText",
    };
    @locator
    public nextButton = {
        android: "~Button Next",
        ios: "~btn next",
    };
    @locator
    public nextButtonId = {
        android: "#com.logigear:id/btnNext",
        ios: "~btn next",
    };
    @locator
    public customerFirstName = {
        android: "~First Name",
        ios: "~firstname",
    };
    @locator
    public customerLastName = {
        android: "~Last Name",
        ios: "~lastname",
    };
    @locator
    public returnSameLocation = {
        android: "~Return at same location",
        ios: "//XCUIElementTypeButton[@name=\"returnAtSameLocation\"]",
    };
    @locator
    public customerLicense = {
        android: "~Driver License",
        ios: "~driverlicence",
    };
    @locator
    public customerPassport = "~passport";
    @locator
    public customerPhoneNo = "~phonenumber";
    @locator
    public paymentInfo = {
        android: "PAYMENT INFORMATION",
        ios: "//XCUIElementTypeButton[@name=\"Payment\"]",
    };
    @locator
    public totalPayment = {
        android: "~Total Payment",
        ios: "//XCUIElementTypeStaticText[@name=\"Total Payment\"]"
            + "/following-sibling::XCUIElementTypeStaticText",
    };
    @locator
    public time = {
        android: "PAYMENT INFORMATION",
        ios: "//XCUIElementTypeButton[@name=\"Payment\"]",
    };
    @locator
    public carNumber = {
        android: "~Number Car Rent",
        ios: "~icon-dropdown.png",
    };
    @action("enter pickup info", "Enter the pickup information")
    public async enterPickUpInfo(pickUpInfo: any) {
        let platformName = (await gondola.getCapabilities()).platformName.toLowerCase();

        await gondola.tap({
            android: `~Pickup ${pickUpInfo.country}`,
            ios: `~pickupCountry_${pickUpInfo.country}`,
        });
        await this.select(this.pickState, pickUpInfo.state);
        await gondola.enter(this.pickCity, pickUpInfo.city);
        await gondola.tap({ android: "~Text View Pickup City", ios: "~Pickup City" });
        if (platformName === "android") {
            await gondola.tap(this.nextButtonId);
        }
    }
    @action("enter return info", "Enter the return information")
    public async enterReturnInfo(returnInfo: any) {
        // The default return date already +1 day
        if (returnInfo.duration !== 1) {
            const returnDate = new Date();
            returnDate.setDate(returnDate.getDate() + returnInfo.duration);
            await this.setCalendar(this.returnCalendar, returnDate);
        }
        if (!returnInfo.sameAsPickup) {
            await gondola.tap(this.returnSameLocation);
            await gondola.tap({
                android: `~Return ${returnInfo.country}`,
                ios: `~returnCountry_${returnInfo.country}`,
            });
            await this.select(this.returnState, returnInfo.state);
            await gondola.enter(this.returnCity, returnInfo.city);
        }
        await gondola.tap(this.nextButtonId);
    }
    @action("select car", "Select the given car name and number")
    public async selectCar(carName: string, number: any) {
        // Car selection page
        await gondola.tap({
            android: carName,
            ios: `~${carName}`,
        });
        let platformName = (await gondola.getCapabilities()).platformName.toLowerCase();
        if (platformName === "android") {
            await gondola.enter(this.carNumber, number.toString());
        }
        if (platformName === "iOS") {
            await this.select(this.carNumber, number.toString());
        }
        await gondola.tap(this.nextButtonId);
    }
    @action("enter customer info", "Enter customer information")
    public async enterCustomerInfo(customerName: string) {
        // Customer info page
        const customer = await utilities.getUserInfo(customerName);
        await gondola.enter(this.customerFirstName, customer.firstName);
        await gondola.enter(this.customerLastName, customer.lastName);
        await gondola.enter(this.customerLicense, customer.driverLicense);
        let platformName = (await gondola.getCapabilities()).platformName.toLowerCase();
        if (platformName !== "android") {
            // iOS needs below fields be filled to continue
            await gondola.enter(this.customerPassport, customer.passport);
            await gondola.enter(this.customerPhoneNo, customer.phoneNumber);
        }
        await gondola.tap(this.nextButtonId);
    }
    @action("select rental options", "Select the car options")
    public async selectOptions(options: string | string[]) {
        await gondola.wait(1);
        if (options && options !== "N/A") {
            if (typeof (options) === "string") {
                await this.selectOption(options);
            }
            else {
                await Promise.all(options.map(async (option) => {
                    await this.selectOption(option);
                }));
            }
        }
        await gondola.tap(this.nextButtonId);
    }
    @action("select rental option", "Select the car option")
    public async selectOption(option: string) {
        await gondola.tap({
            android: `//android.widget.TextView[@text="${option}"]` +
                "/following-sibling::android.widget.CheckBox",
            ios: `//XCUIElementTypeStaticText[@name="${option}"]` +
                "/following-sibling::XCUIElementTypeImage",
        });
    }
    @action("select price", "Select price")
    public async selectPrice(priceOption: string) {
        await gondola.waitForElement(this.nextButtonId, 5);
        await gondola.tap({
            android: priceOption,
            ios: `//XCUIElementTypeStaticText[@name="${priceOption}"]` +
                "/preceding-sibling::XCUIElementTypeButton",
        });
        await gondola.tap(this.nextButtonId);
    }
    @action("check total price", "Check the total price matches the expected")
    public async checkTotalPrice(price: any) {
        let strPrice;
        if (typeof price === "number") {
            strPrice = price.toFixed(2);
        }
        else {
            strPrice = price;
        }
        await gondola.waitForElement(this.paymentInfo, 5);
        await gondola.tap(this.paymentInfo);
        let platformName = (await gondola.getCapabilities()).platformName.toLowerCase();
        if (platformName === "android") {
            await gondola.checkControlProperty(this.totalPayment, "text", strPrice);
        }
        else {
            await gondola.checkControlProperty(this.totalPayment, "value", strPrice);
        }
    }
}
export default new orderPage();
