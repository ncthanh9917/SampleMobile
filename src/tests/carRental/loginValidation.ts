import { TestCase, TestModule, gondola, importData } from "gondolajs";
import homePage from "../../pages/carRental/homePage";
import loginPage from "../../pages/carRental/loginPage";

TestModule("Login Validation");

TestCase("Valid login (Access granted)", async () => {
    await loginPage.login("john", "");
    await homePage.checkOpened();
});
TestCase("Access denied with invalid value", async () => {
    // Login with wrong password
    await loginPage.login("john", "wrongpass");
    await loginPage.checkAlertMessage();
    await homePage.checkNotOpened();

    // Login with empty username and password
    await loginPage.login("", "");
    await loginPage.checkAlertMessage();
    await homePage.checkNotOpened();

    // Login with not available user
    await loginPage.login("NotAvailableUser", "");
    await loginPage.checkAlertMessage();
    await homePage.checkNotOpened();
});
