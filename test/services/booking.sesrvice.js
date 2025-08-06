import HomePageClass from "../pageobjects/home.page.js";
import ReservationPageClass from "../pageobjects/reservation.page.js";

const HomePage = new HomePageClass();
const ReservationPage = new ReservationPageClass();

export async function setDateInputs(checkin, checkout) {
  const checkinInput = await HomePage.getCheckinInput();
  await checkinInput.click();
  await browser.keys(["Control", "a"]);
  await browser.keys("Backspace");
  await checkinInput.setValue(checkin);

  const checkoutInput = await HomePage.getCheckoutInput();
  await checkoutInput.click();
  await browser.keys(["Control", "a"]);
  await browser.keys("Backspace");
  await checkoutInput.setValue(checkout);
}

export async function bookRoom(
  checkin,
  checkout,
  firstname,
  lastname,
  email,
  phone
) {
  await setDateInputs(checkin, checkout);

  const checkAvailabilityBtn = await HomePage.getCheckAvailabilityBtn();
  if (await checkAvailabilityBtn.isEnabled()) {
    await checkAvailabilityBtn.click();

    const singleRoomCard = await ReservationPage.getSingleRoomCard();
    if (await singleRoomCard.isDisplayed()) {
      const bookNowBtn = await ReservationPage.getBookNowBtn();
      await bookNowBtn.waitForDisplayed({ timeout: 5000 });
      await bookNowBtn.click();

      const reserveToggle = await ReservationPage.getReserveToggle();
      await reserveToggle.scrollIntoView();
      await reserveToggle.click();

      if (firstname) {
        const firstnameInput = await ReservationPage.getFirstnameInput();
        await firstnameInput.setValue(firstname);
      }

      if (lastname) {
        const lastnameInput = await ReservationPage.getLastnameInput();
        await lastnameInput.setValue(lastname);
      }

      if (email) {
        const emailInput = await ReservationPage.getEmailInput();
        await emailInput.setValue(email);
      }

      if (phone) {
        const phoneInput = await ReservationPage.getPhoneInput();
        await phoneInput.setValue(phone);
      }

      const reserveNowBtn = await ReservationPage.getReserveNowBtn();
      await reserveNowBtn.click();
    }
  }
}
