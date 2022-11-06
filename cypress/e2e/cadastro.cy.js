describe('Tela de cadastro Submarino', () => {

  beforeEach(() => {
    cy.visit('https://cliente.submarino.com.br/minha-conta/cadastro')
  })

  it('Verifica mensagens de erro', () => {
    cy.get('input[name="name"]')
    .click()

    cy.get('input[name="birthDate"]')
    .click()

    cy.get('input[name="cpf"]')
    .click()

    cy.get('input[name="phone"]')
    .click()

    cy.get('input[name="email"]')
    .click()

    cy.get('input[name="password"]')
    .click()

    cy.get('[data-cy="sign-submit"]')
    .click()


    cy.contains('span', 'Por favor, informe o nome e o sobrenome.')
    .should('be.visible')

    cy.contains('span', 'É necessário informar a data de nascimento.')
    .should('be.visible')

    cy.contains('span', 'É necessário informar um CPF.')
    .should('be.visible')

    cy.contains('span', 'É necessário informar o número do telefone principal.')
    .should('be.visible')

    cy.contains('span', 'É necessário informar um e-mail.')
    .should('be.visible')
    
    cy.contains('span', 'Por favor, informe o nome e o sobrenome.')
    .should('be.visible')
  })

  it('Faz cadastro com sucesso', () => {

    cy.fixture("massa-de-dados.json").then((dados) => {

      cy.get('input[name="name"]')
      .type(dados.nomeCompleto)

      cy.contains('span', 'Não informar')
      .click()

      cy.get('input[name="birthDate"]')
      .type(dados.dataNascimento)

      cy.get('input[name="cpf"]')
      .type(dados.cpf)

      cy.get('input[name="phone"]')
      .type(dados.telefone)

      cy.contains('span', 'Receber notificações por WhatsApp')
      .click()

      cy.get('input[name="cellphone"]')
      .type(dados.celular)

      cy.get('input[name="email"]')
      .type(dados.email)

      cy.get('input[name="password"]')
      .type(dados.senha)

      cy.get('span[class="sc-jvdzsS hXYyLP"]')
      .should('have.text', 'ótima')

      cy.intercept('https://www.google.com/recaptcha/api2/reload?k=6Lecgi4UAAAAADoy8olZEoD8T5dqynjjJajXSQHj')
      .as('cadastroEfetuado')

      cy.get('[data-cy="sign-submit"]')
      .click()

      cy.wait('@cadastroEfetuado')

    });
  })

  it('Verifica mensagem de erro no cadastro duplicado', () => {
      
    cy.fixture("massa-de-dados.json").then((dadosDuplicado) => {

      cy.get('input[name="name"]')
      .type(dadosDuplicado.nomeCompleto)

      cy.contains('span', 'Não informar')
      .click()

      cy.get('input[name="birthDate"]')
      .type(dadosDuplicado.dataNascimento)

      cy.get('input[name="cpf"]')
      .type(dadosDuplicado.cpf)

      cy.get('input[name="phone"]')
      .type(dadosDuplicado.telefone)

      cy.contains('span', 'Receber notificações por WhatsApp')
      .click()
      
      cy.get('input[name="cellphone"]')
      .type(dadosDuplicado.celular)

      cy.get('input[name="email"]')
      .type(dadosDuplicado.email)

      cy.get('input[name="password"]')
      .type(dadosDuplicado.senha)

      cy.get('span[class="sc-jvdzsS hXYyLP"]')
      .should('have.text', 'ótima')

      cy.get('[data-cy="sign-submit"]')
      .click()

      cy.contains('span', 'O email fornecido é inválido.')
      .should('be.visible')
    })
  })
})