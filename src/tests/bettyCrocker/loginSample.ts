import { TestCase, TestModule, gondola, importData } from "gondolajs";
import homePage from "../../pages/bettyCrocker/homePage";

TestModule("Login Validation");

TestCase("Sample login", async () => {
    await gondola.navigate("https://www.bettycrocker.com/");
    await homePage.openLoginDialog();
    await homePage.enterAccount();
});

