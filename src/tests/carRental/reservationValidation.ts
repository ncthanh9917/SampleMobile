import { Data, TestCase, TestModule, gondola, importData } from "gondolajs";
import homePage from "../../pages/carRental/homePage";
import loginPage from "../../pages/carRental/loginPage";
import orderPage from "../../pages/carRental/orderPage";

TestModule("Car Reservation");

Data(importData("./data/carReservations.json")).TestCase("Validate Car Reservation", async (current: any) => {
    await loginPage.login("john", "");
    // Input car reservation information
    await homePage.openNewOrder();
    await orderPage.enterPickUpInfo(current.pickup);
    await orderPage.enterReturnInfo(current.return);
    await orderPage.selectCar(current.car, current.number);
    await orderPage.enterCustomerInfo(current.customer);
    await orderPage.selectOptions(current.options);
    await orderPage.selectPrice("Check lowest price");
    // Check total payment
    await orderPage.checkTotalPrice(current.totalPayment);
});
