describe("New E2E Test suite", () => {
  it("Check title", () => {
    cy.visit("http://localhost:3000/");
    cy.title().should("eq", "React App");
  });

  it("should be able to render List of Campaigns", () => {
    cy.visit("http://localhost:3000/");
    cy.get("#root > div > table > tbody > tr:nth-child(1) > td:nth-child(2)")
      .invoke("text")
      .should("eq", "Divavu");
  });

  it("shoud be able to filter data using StartDate", () => {
    cy.visit("http://localhost:3000/");
    cy.get(
      "#root > div > div.card > div > form > div > div:nth-child(1) > input"
    )
      .click()
      .type("2019-09-09");
    cy.get("#root > div > table > tbody > tr:nth-child(1) > td:nth-child(3)")
      .invoke("text")
      .then((datetext) => {
        const date = new Date(datetext);
        const assertDate = new Date("2019-09-09");
        expect(date).to.be.greaterThan(assertDate);
      });
  });

  it("shoud be able to filter data using StartDate", () => {
    cy.visit("http://localhost:3000/");
    cy.get(
      "#root > div > div.card > div > form > div > div:nth-child(2) > input"
    ).type("2021-02-21");
    cy.get("#root > div > table > tbody > tr > td:nth-child(4)")
      .invoke("text")
      .then((endDateText) => {
        const date = new Date(endDateText);
        const assertDate = new Date("2021-02-21");
        expect(date).to.be.lessThan(assertDate);
      });
  });
});
