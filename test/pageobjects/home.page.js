class HomePage {
  async open() {
    await browser.url("/");
    await browser.url("https://automationintesting.online");
    await browser.maximizeWindow();
  }

  async getCheckinInput() {
    const inputs = await browser.$$(".react-datepicker-wrapper input");
    return inputs[0];
  }

  async getCheckoutInput() {
    const inputs = await browser.$$(".react-datepicker-wrapper input");
    return inputs[1];
  }

  async getCheckAvailabilityBtn() {
    return await browser.$("button=Check Availability");
  }
}

export default HomePage;
