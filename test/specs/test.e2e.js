import { browser, $ } from "@wdio/globals";
import { expect } from "expect-webdriverio";

function formatDate(date, format = "url") {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return format === "ui"
    ? `${day}/${month}/${year}`
    : `${year}-${month}-${day}`;
}

describe("Room Booking Tests", () => {
  const baseUrl = "https://automationintesting.online";

  let today;
  let tomorrow;
  let yesterday;
  let uiToday;
  let uiTomorrow;

  beforeEach(async () => {
    const now = new Date();
    today = formatDate(now, "url");
    tomorrow = formatDate(new Date(now.getTime() + 86400000), "url");
    yesterday = formatDate(new Date(now.getTime() - 86400000), "url");

    uiToday = formatDate(now, "ui");
    uiTomorrow = formatDate(new Date(now.getTime() + 86400000), "ui");

    await browser.url(baseUrl);
    await browser.maximizeWindow();
  });

  //Set dates in "Check In" and "Check Out" input fields
  async function setDateInputs(checkin, checkout) {
    const checkinInput = await $(".react-datepicker-wrapper input");
    await checkinInput.waitForDisplayed({ timeout: 5000 });

    const inputs = await $$(".react-datepicker-wrapper input");

    if (!inputs[0] || !inputs[1]) {
      throw new Error("Date inputs not found.");
    }

    await inputs[0].click();
    await browser.keys(["Control", "a"]);
    await browser.keys("Backspace");
    await inputs[0].setValue(checkin);

    await inputs[1].click();
    await browser.keys(["Control", "a"]);
    await browser.keys("Backspace");
    await inputs[1].setValue(checkout);
  }

  async function bookSingleRoom(
    checkin,
    checkout,
    firstname,
    lastname,
    email,
    phone
  ) {
    await setDateInputs(formatDate(checkin, "ui"), formatDate(checkout, "ui"));
    const checkAvailabilityBtn = await $("button=Check Availability");

    if (await checkAvailabilityBtn.isEnabled()) {
      await checkAvailabilityBtn.click();
      const singleRoomCard = await $("h5=Single");

      if (await singleRoomCard.isDisplayed()) {
        const bookNowBtn = await $(
          `a[href="/reservation/1?checkin=${checkin}&checkout=${checkout}"]`
        );
        await bookNowBtn.waitForDisplayed({ timeout: 5000 });
        await bookNowBtn.click();

        const reserveToggle = await $("#doReservation");
        await reserveToggle.scrollIntoView();
        await reserveToggle.click();

        if (firstname) await $("[name='firstname']").setValue(firstname);
        if (lastname) await $("[name='lastname']").setValue(lastname);
        if (email) await $("[name='email']").setValue(email);
        if (phone) await $("[name='phone']").setValue(phone);

        await $("button=Reserve Now").click();
      }
    }
  }

  //TC001
  it("TC001 - Room can be booked with valid data", async () => {
    await bookSingleRoom(
      today,
      tomorrow,
      "John",
      "Doe",
      "test@test.com",
      "+38(012)3456789"
    );

    await browser.pause(3000);
    const successMsg = await $("h2=Booking Confirmed");
    await expect(successMsg).toBeDisplayed();

    const bookingDates = await $("p.text-center.pt-2 > strong");
    await expect(bookingDates).toHaveText(`${today} - ${tomorrow}`);
  });

  //TC002
  it("TC002 - Booking with invalid date range (today - yesterday)", async () => {
    await setDateInputs(uiToday, formatDate(yesterday, "ui"));
    const checkAvailabilityBtn = await $("button=Check Availability");
    expect(await checkAvailabilityBtn.isEnabled()).toBe(false);
  });

  //TC003
  it("TC003 - Booking with empty form fields", async () => {
    await bookSingleRoom(today, tomorrow, "", "", "", "");

    const reserveButton = await $("button=Reserve Now");
    await expect(reserveButton).toBeDisplayed();

    const errorMessages = await $$("input:invalid");
    expect(errorMessages.length).toBeGreaterThan(0);

    const successMsg = await $("h2=Booking Confirmed");
    const isSuccessVisible = await successMsg.isDisplayed().catch(() => false);
    expect(isSuccessVisible).toBe(false);
  });

  //TC004
  it("TC004 - Verify previously booked dates are unavailable", async () => {});

  //TC005
  it("TC005 - Booking with same check-in and check-out date (today - today)", async () => {
    await setDateInputs(uiToday, uiToday);
    const checkAvailabilityBtn = await $("button=Check Availability");
    expect(await checkAvailabilityBtn.isEnabled()).toBe(false);
  });
});
