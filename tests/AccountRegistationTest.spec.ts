import { test, expect } from "@playwright/test"
import { HomePage } from "../pages/HomePage"
import { RegistrationPage } from "../pages/RegistrationPage"
import { RandomDataUtil } from "../utils/randomDataGenerator"
import { DataProvider } from "../utils/dataProvider"
import { testconfig } from "../testconfig"

let homepage: HomePage;
let registerpage: RegistrationPage;

test.beforeEach(async ({ page }) => {
    // go to url
    const config = new testconfig();
    await page.goto(config.appurl);
    homepage = new HomePage(page);
    registerpage = new RegistrationPage(page);
});


test.afterEach(async ({ page }) => {
    await page.waitForTimeout(2000);
    await page.close();

});


test('Account Registration Test @master @sanity @regression', async ({ }) => {
    // home page
    await homepage.isHomePageExists();
    homepage.clickMyAccount();
    homepage.clickRegister();

    // Registration page
    await registerpage.setFirstName(RandomDataUtil.getFirstName());
    await registerpage.setLastName(RandomDataUtil.getlastName());
    await registerpage.setEmail(RandomDataUtil.getEmail());
    await registerpage.setTelephone(RandomDataUtil.getPhoneNumber());

    const password = RandomDataUtil.getPassword();
    await registerpage.setPassword(password);
    await registerpage.setConfirmPassword(password);

    await registerpage.setPrivacyPolicy();
    await registerpage.clickContinue();

    // validate confirmation message
    const comfirmationmessage = await registerpage.getConfirmationMsg();
    expect(comfirmationmessage).toContain('Your Account Has Been Created!');



})


// npx playwright test AccountRegistationTest.spec --grep="sanity" --headed 
// allure generate ./allure-results -o ./allure-report --clean
// allure open ./allure-report
// to execute scripts from package.json - npm run test:master
