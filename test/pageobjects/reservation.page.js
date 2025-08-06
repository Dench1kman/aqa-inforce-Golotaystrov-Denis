class ReservationPage {
  async getSingleRoomCard() {
    return await browser.$("h5=Single");
  }

  async getBookNowBtn() {
    return await browser.$(`a[href*="/reservation/1"]`);
  }

  async getReserveToggle() {
    return await browser.$("#doReservation");
  }

  async getFirstnameInput() {
    return await browser.$("[name='firstname']");
  }

  async getLastnameInput() {
    return await browser.$("[name='lastname']");
  }

  async getEmailInput() {
    return await browser.$("[name='email']");
  }

  async getPhoneInput() {
    return await browser.$("[name='phone']");
  }

  async getReserveNowBtn() {
    return await browser.$("button=Reserve Now");
  }

  async getSuccessMsg() {
    return await browser.$("h2=Booking Confirmed");
  }

  async getBookingDates() {
    return await browser.$("p.text-center.pt-2 > strong");
  }
}

export default ReservationPage;
