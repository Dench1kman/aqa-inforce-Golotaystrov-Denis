# UI Automation Tests with WebdriverIO

This project contains UI automation tests for [https://automationintesting.online](https://automationintesting.online) using **WebdriverIO**.

## 📁 Project Structure

- **Test file**: `test/specs/test.e2e.js`
- **Test cases**: Described in `test-cases.txt`
- **Framework**: WebdriverIO (standard setup)
- **Editor**: [Visual Studio Code](https://code.visualstudio.com/)
- **Scope**: **UI automation only** (API automation planned for the future)
- **Manual testing**: Admin panel and API-related tasks were explored manually but not yet automated.

## ▶️ How to Run the Tests


 > Important:
   > The automated tests interact with the real UI of the website,
   > where room data (availability, types, status) depends on the admin panel.
   >
   > Before running the tests, make sure that:
   > - No one is modifying room information, bookings, or dates in the admin panel;
   > - Required rooms for the tests (e.g., "Single") exist and are available;
   > - Test bookings are not being manually deleted during test execution.
   >
   > Otherwise, tests may behave unpredictably or fail.


### 1. Clone the Repository
git clone <your-repo-url>
cd <project-folder>

### 2. Install Dependencies
Make sure you have Node.js installed (v16+ recommended). Then run:
npm install

### 3. Run the Tests
npm run wdio

## 🎥 Setup Guide Followed
All setup was done using default WebdriverIO configuration, as shown in this tutorial:
📺 [WebdriverIO UI Testing Full Guide](https://www.youtube.com/watch?v=gdd5ZC5L9TM&list=PLhW3qG5bs-L9K2xtu-04jZFqykzXzqJW8)
