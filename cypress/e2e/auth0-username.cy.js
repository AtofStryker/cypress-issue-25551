describe("Username/Password login via auth0", () => {
  beforeEach(() => {
    const log = Cypress.log({
      displayName: "AUTH0 LOGIN",
      message: [`🔐 Authenticating | ${Cypress.env("AUTH0_USERNAME")}`],
      autoEnd: false,
    });
    log.snapshot("before");

    cy.session(
      `session-${Cypress.env("AUTH0_USERNAME")}`,
      () => {
        cy.visit("/");

        cy.origin(Cypress.env("AUTH0_DOMAIN"), () => {
          cy.get("input[type=text]").type(Cypress.env("AUTH0_USERNAME"));
          cy.get("input[type=password]").type(Cypress.env("AUTH0_PASSWORD"), {
            log: false,
          });
          cy.get("form").first().submit();
        });
        cy.url().should("contain", Cypress.config().baseUrl);
        // there likely needs to be an assertion here, either verifying localStorage, cookies
        // or something else to verify the state is set and you are logged in before caching the
        // session
        cy.get('[data-cy="user-name"]')
          .invoke("text")
          .should("equal", Cypress.env("AUTH0_USERNAME"));
        cy.get('[data-cy="user-email"]')
          .invoke("text")
          .should("equal", Cypress.env("AUTH0_USERNAME"));
      },
      {
        cacheAcrossSpecs: true,
      }
    );
    cy.visit("/");

    log.snapshot("after");
    log.end();
  });

  it("works", () => {
    cy.get('[data-cy="user-name"]')
      .invoke("text")
      .should("equal", Cypress.env("AUTH0_USERNAME"));
    cy.get('[data-cy="user-email"]')
      .invoke("text")
      .should("equal", Cypress.env("AUTH0_USERNAME"));
  });

  it("works again", () => {
    cy.get('[data-cy="user-name"]')
      .invoke("text")
      .should("equal", Cypress.env("AUTH0_USERNAME"));
    cy.get('[data-cy="user-email"]')
      .invoke("text")
      .should("equal", Cypress.env("AUTH0_USERNAME"));
  });
});
