import { expect } from "expect-webdriverio";
import HomePageClass from "../pageobjects/home.page.js";
import ReservationPageClass from "../pageobjects/reservation.page.js";
import { formatDate } from "../../utils/dateUtil.js";
import { setDateInputs, bookRoom } from "../services/booking.service.js";

const HomePage = new HomePageClass();
const ReservationPage = new ReservationPageClass();

describe("Room Booking Tests", () => {
  let today, tomorrow, yesterday, uiToday, uiTomorrow;

  beforeEach(async () => {
    const now = new Date();
    today = formatDate(now, "url");
    tomorrow = formatDate(new Date(now.getTime() + 86400000), "url");
    yesterday = formatDate(new Date(now.getTime() - 86400000), "url");

    uiToday = formatDate(now, "ui");
    uiTomorrow = formatDate(new Date(now.getTime() + 86400000), "ui");

    await HomePage.open();
  });

  it("TC001 - Room can be booked with valid data", async () => {
    await bookRoom(
      uiToday,
      uiTomorrow,
      "John",
      "Doe",
      "test@test.com",
      "+38(012)3456789"
    );

    const successMsg = await ReservationPage.getSuccessMsg();
    await expect(successMsg).toBeDisplayed();

    const bookingDates = await ReservationPage.getBookingDates();
    await expect(bookingDates).toHaveText(`${today} - ${tomorrow}`);
  });

  it("TC002 - Booking with invalid date range", async () => {
    await setDateInputs(uiToday, formatDate(yesterday, "ui"));

    const checkAvailabilityBtn = await HomePage.getCheckAvailabilityBtn();
    expect(await checkAvailabilityBtn.isEnabled()).toBe(false);
  });

  it("TC003 - Booking with empty form fields", async () => {
    await bookRoom(uiToday, uiTomorrow, "", "", "", "");

    const reserveButton = await ReservationPage.getReserveNowBtn();
    await expect(reserveButton).toBeDisplayed();

    const errorMessages = await $$("input:invalid");
    expect(errorMessages.length).toBeGreaterThan(0);

    const successMsg = await ReservationPage.getSuccessMsg();
    const isSuccessVisible = await successMsg.isDisplayed().catch(() => false);
    expect(isSuccessVisible).toBe(false);
  });

  it("TC004 - Verify previously booked dates are unavailable", async () => {});

  it("TC005 - Booking with same check-in and check-out date (today - today)", async () => {
    await setDateInputs(uiToday, uiToday);

    const checkAvailabilityBtn = await HomePage.getCheckAvailabilityBtn();
    expect(await checkAvailabilityBtn.isEnabled()).toBe(false);
  });
});
