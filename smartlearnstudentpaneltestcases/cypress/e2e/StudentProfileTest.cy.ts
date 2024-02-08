const jsonsprofile = require("../fixtures/Base.json")
describe('StudentProfile Component', () => {
  beforeEach(() => {
    cy.visit(jsonsprofile.Url); 
  });

  it('Test1:-should display error for blank email and password', () => {
    cy.get('a').contains('Login').click();
    cy.get("button[type='submit']").type('Log In').click({ force: true });
    cy.get('[name="email"]').should('have.value', '');
    cy.contains('Email is required').type("eq","Email is required" as any);
    cy.get('[name="password"]').should('have.value', '');
    cy.contains('Password is required').type("eq","Password is required" as any);
  });

  it('Test2:-should display error for blank email', () => {
    cy.get('a').contains('Login').click();
    cy.get('[name="password"]').type(jsonObject.password);
    cy.get('[name="email"]').click();
    cy.get('[name="password"]').click();
    cy.contains('Email is required').type("eq","Email is required" as any);
  });

  it('Test3:-should display error for blank password', () => {
    cy.get('a').contains('Login').click();
    cy.get('[name="email"]').type(jsonObject.emailid);
    cy.get('[name="password"]').click();
    cy.get('[name="email"]').click();
    cy.contains('Password is required').type("eq","Password is required" as any);
  });

  it('Test4:-should validatation display password requirements like a (Password must include at least 8 characters, one special character, one digit, one uppercase and one lowercase letter)', () => {
    cy.get('a').contains('Login').click();
    cy.get('[name="password"]').type(jsonObject.dpassword);
    cy.get('[name="email"]').click();
    cy.contains('Password must include at least 8 characters, one special character, one digit, one uppercase and one lowercase letter')
    .type("eq","Password must include at least 8 characters, one special character, one digit, one uppercase and one lowercase letter" as any);
    expect(jsonObject.dpassword.length).to.be.at.least(8);


  });

  it('Test5:-should validate password requirements like a (Password must include at least 8 characters, one special character, one digit, one uppercase and one lowercase letter)', () => {
    cy.get('a').contains('Login').click();
    cy.get('[name="password"]').type(jsonObject.password);
    cy.get('[name="email"]').click();
    expect(jsonObject.password.length).to.be.at.least(8);
    
    expect(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(jsonObject.password)).to.be.true;

    expect(/\d+/.test(jsonObject.password)).to.be.true;

    expect(/[A-Z]+/.test(jsonObject.password)).to.be.true;

    expect(/[a-z]+/.test(jsonObject.password)).to.be.true;
  });

  it('Test6:-should validate email format', () => {

    cy.get('a').contains('Login').click();
    cy.get('[name="email"]').type(jsonObject.emailid);
    cy.get('[name="password"]').click();
    // Check if email format is valid using a regular expression
    expect(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/.test(jsonObject.emailid)).to.be.true;
  });

  it('Test7:-should validation display when enter invalid email format', () => {
  
    cy.get('a').contains('Login').click();
    cy.get('[name="email"]').type(jsonObject.demailid);
    cy.get('[name="password"]').click();
    cy.contains('Please enter a valid email address').type("eq","Please enter a valid email address" as any);
    // Check if email format is valid using a regular expression
    //expect(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/.test(emailid)).to.be.true;
  });

  it('Test8:-should enter invalid login credentials', () => {
    cy.get('a').contains('Login').click();
    cy.get('[name="email"]').type(jsonObject.emailid);
    cy.get('[name="password"]').type(jsonObject.ipassword);
    cy.get("button[type='submit']").type('Please wait...').click({ force: true}); 
    const expectedMessage = 'Email or password not matched';
    cy.get('[role="status"]').contains(expectedMessage);
  });

  it('Test9:-should enter valid login credentials', () => {
    cy.get('a').contains('Login').click();
    cy.get('[name="email"]').type(jsonObject.emailid);
    cy.get('[name="password"]').type(jsonObject.password);
    cy.get("button[type='submit']").type('Log In').click({ force: true }); 
    const expectedMessage = 'Student LoggedIn successFully';
    cy.get('[role="status"]').contains(expectedMessage);
  });

});