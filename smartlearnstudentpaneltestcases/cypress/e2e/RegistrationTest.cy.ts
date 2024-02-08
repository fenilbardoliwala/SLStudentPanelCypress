const jsonRegister = require("../fixtures/Base.json")
describe('Registration Component', () => {
  beforeEach(() => {
    cy.visit(jsonRegister.Url); 
  });

  it('Test1:-should display error for blank email and password', () => {
    cy.get('a').contains('Get started for free').click();
    cy.get("button[type='submit']").type('Log In').click({ force: true });
    cy.get('[name="firstName"]').should('have.value', '');
    cy.contains('First name is required').type("eq","First name is required" as any);
    cy.get('[name="lastName"]').should('have.value', '');
    cy.contains('Last name is required').type("eq","Last name is required" as any);
    cy.get('[name="mobileNo"]').should('have.value', '');
    cy.contains('Mobile number is required').type("eq","Mobile number is required" as any);
    cy.get('[name="email"]').should('have.value', '');
    cy.contains('Email is required').type("eq","Email is required" as any);
    cy.get('[name="password"]').should('have.value', '');
    cy.contains('Password is required').type("eq","Password is required" as any);
    cy.get('[name="confirmPassword"]').should('have.value', '');
    cy.contains('Password confirmation is required').type("eq","Password confirmation is required" as any);
  });

  it('Test2:-should validate email format', () => {

    cy.get('a').contains('Get started for free').click();
    cy.get('[name="email"]').type(jsonRegister.emailid);
    cy.get('[name="password"]').click();
    // Check if email format is valid using a regular expression
    expect(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/.test(jsonRegister.emailid)).to.be.true;
  });

  it('Test3:-should validation display when enter invalid email format', () => {
  
    cy.get('a').contains('Get started for free').click();
    cy.get('[name="email"]').type(jsonRegister.demailid);
    cy.get('[name="password"]').click();
    cy.contains('Wrong email format').type("eq","Wrong email format" as any);
    // Check if email format is valid using a regular expression
    //expect(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/.test(emailid)).to.be.true;
  });


  it('Test4:-should validatation display password requirements like a (Password must include at least 8 characters, one special character, one digit, one uppercase and one lowercase letter)', () => {
    cy.get('a').contains('Get started for free').click();
    cy.get('[name="password"]').type(jsonRegister.dpassword);
    cy.get('[name="email"]').click();
    cy.contains('Password must include at least 8 characters, one special character, one digit, one uppercase and one lowercase letter')
    .type("eq","Password must include at least 8 characters, one special character, one digit, one uppercase and one lowercase letter" as any);
    expect(jsonRegister.dpassword.length).to.be.at.least(8);


  });

  it('Test5:-should validate password requirements like a (Password must include at least 8 characters, one special character, one digit, one uppercase and one lowercase letter)', () => {
    cy.get('a').contains('Get started for free').click();
    cy.get('[name="password"]').type(jsonRegister.password);
    cy.get('[name="email"]').click();
    expect(jsonRegister.password.length).to.be.at.least(8);
    
    expect(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(jsonRegister.password)).to.be.true;

    expect(/\d+/.test(jsonRegister.password)).to.be.true;

    expect(/[A-Z]+/.test(jsonRegister.password)).to.be.true;

    expect(/[a-z]+/.test(jsonRegister.password)).to.be.true;
  });



  it('Test6:-should displays validation message when passwords and re-enter password do not match', () => {
    cy.get('a').contains('Get started for free').click();
    cy.get('[name="password"]').type(jsonRegister.password);
    cy.get('[name="confirmPassword"]').type(jsonRegister.ipassword);
    cy.get('[name="email"]').click();
    cy.contains("Password and Re-Enter Password didn't match").type("eq","Password and Re-Enter Password didn't match" as any);
  });

  it('Test7:-Enter a valid 10-digit mobile number in the input field', () => {
    cy.get('a').contains('Get started for free').click();
    cy.get('input[name="mobileNo"]').type(jsonRegister.mobileno);
    expect(jsonRegister.mobileno).to.match(/^\d{10}$/);
   
  });

  it('Test8:-display validation only 10-digit mobile number in the input field', () => {
    cy.get('a').contains('Get started for free').click();
    cy.get('input[name="mobileNo"]').type(jsonRegister.imobileno);
    cy.get('[name="email"]').click();
    //expect(jsonRegister.imobileno).to.match(/^\d{10}$/);
    cy.contains("Mobile number is not valid").type("eq","Mobile number is not valid" as any);
   
  });


  it('Test9:-should enter valid registration details', () => {
    cy.get('a').contains('Get started for free').click();
    cy.get('[name="firstName"]').type("TestFenil");
    cy.get('[name="lastName"]').type("TestBardoliwala");
    cy.get('[name="mobileNo"]').type(jsonRegister.mobileno);
    cy.get('[name="email"]').type(jsonRegister.emailid);
    cy.get('[name="password"]').type(jsonRegister.password);
    cy.get('[name="confirmPassword"]').type(jsonRegister.password);
    cy.get("button[type='submit']").type('Log In').click({ force: true }); 
    const expectedMessage = 'Student LoggedIn successFully';
    cy.get('[role="status"]').contains(expectedMessage);
    cy.get("button[type='submit']").type('Sign Up').click({ force: true });
  });

});