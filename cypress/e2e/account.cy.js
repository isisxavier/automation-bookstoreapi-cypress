import ValidaBookstore from '../services/validacao'


describe('Casos de teste sobre a rota /account/v1/Users da API Book Store', () => {


    describe('Casos positivos de sucesso.', () => {
  
      it('Cria usuário', () => {
        cy.geraUser().then(res => {
            ValidaBookstore.validaCriarUser(res)
        })
      })
    })

    describe('Casos positivos de erro', () => {

      it('Deve retornar erro ao tentar gerar usuário ja existente', () => {
        cy.geraUserExistente().then(res => {
            ValidaBookstore.validaCriarUserExistente(res)
        })
      })
    })

    describe('Casos de erros não documentados', () => {
  
        it('Deve retornar erro se o campo USERNAME estiver em branco', () => {
          cy.geraUserSemUserName().then(res => {
              ValidaBookstore.validarCamposEmBranco(res)
            })
        })
        
        it('Deve retornar erro se o campo PASSWORD estiver em branco', () => {
            cy.geraUserSemSenha().then(res => {
                ValidaBookstore.validarCamposEmBranco(res)
            })
        })


        context('Validando senhas', () => {

            it('Deve retornar erro se a senha não possuir número', () => {
            cy.gerarSenhaSemNúmero().then(res => {
                ValidaBookstore.validarSenha(res)
                })
            })

            it('Deve retornar erro se a senha não possuir letra maiúscula', () => {
            cy.gerarSenhaSemLetraMaiuscula().then(res => {
                ValidaBookstore.validarSenha(res)
                })
            })

            it('Deve retornar erro se a senha não possuir letra minúscula', () => {
                cy.gerarSenhaSemLetraMinuscula().then(res => {
                    ValidaBookstore.validarSenha(res)
                    })
                })

            it('Deve retornar erro se a senha não possuir caractere especial', () => {
            cy.gerarSenhaSemCaractereEspc().then(res => {
                ValidaBookstore.validarSenha(res)
                })
            })  

            it('Deve retornar erro se a senha for menor que 8 caracteres', () => {
            cy.gerarSenhaMenorOito().then(res => {
                ValidaBookstore.validarSenha(res)
                })
            })
        })  
    })
})

describe('Casos de teste sobre a rota /account/v1/GenerateToken da API Book Store', () => {

    describe('Casos positivos de sucesso.', () => {
  
        it('Gera token', () => {
          cy.geraUserParaToken().then((user) => {
              cy.geraToken(user.userName, user.password).then(res =>{
                ValidaBookstore.validarGerarToken(res)
              })
          })
        })
    })

    describe('Casos positivos de erro', () => {

        it('Não deve ser possível gerar token com UserName errado', () => {
            cy.geraTokenUserErrado().then(res =>{
                ValidaBookstore.validarGerarTokenDadosErrados(res)
            })
        })

        it('Não deve ser possível gerar token com Senha errada', () => {
            cy.geraTokenSenhaErrada().then(res =>{
                ValidaBookstore.validarGerarTokenDadosErrados(res)
            })
            
        })

        it('Deve retornar erro se o campo USERNAME estiver em branco', () => {
            cy.geraTokenUserEmBranco().then(res => {
                ValidaBookstore.validarGerarTokenDadosEmBranco(res)
              })
          })
          
        it('Deve retornar erro se o campo PASSWORD estiver em branco', () => {
            cy.geraTokenSenhaEmBranco().then(res => {
                ValidaBookstore.validarGerarTokenDadosEmBranco(res)
            })
        })
    })
})

describe('Casos de teste sobre a rota /account/v1/Authorized da API Book Store', () => {

    describe('Casos positivos de sucesso.', () => {
  
        it('Gera autorização', () => {
            cy.geraUserParaToken().then((user) => {
                cy.geraToken(user.userName, user.password).then(() =>{
                    cy.geraAutorização(user.userName, user.password).then(res => {
                        ValidaBookstore.validarGerarAutorizationTrue(res)
                    })
                })
            })
        })
    })

    describe('Casos positivos de erro', () => {

        it('Não deve ser permitido gerar autorização para usuário sem token', () => {
            cy.geraUserParaToken().then((user) => {
                cy.geraAutorização(user.userName, user.password).then(res => {
                    ValidaBookstore.validarGerarAutorizationFalse(res)
                })
            })
        })

        it('Deve retornar erro se o campo USERNAME estiver em branco', () => {
            cy.geraUserParaToken().then((user) => {
                cy.geraToken(user.userName, user.password).then(() =>{
                    cy.geraAutorizaçãoSemUser(user.password).then(res => {
                        ValidaBookstore.validarGerarAutorizationUserVazio(res)
                    })
                })
            })
        })

        it('Deve retornar erro se o campo PASSWORD estiver em branco', () => {
            cy.geraUserParaToken().then((user) => {
                cy.geraToken(user.userName, user.password).then(() =>{
                    cy.geraAutorizaçãoSemSenha(user.userName).then(res => {
                        ValidaBookstore.validarGerarAutorizationUserVazio(res)
                    })
                })
            })
        }) 

        it('Deve retornar erro se tentar gerar autorização para usuário inexistente', () => {
            cy.geraAutorizationUserInexistente().then(res => {
                 ValidaBookstore.validarGerarAutorizationUserInexistente(res)
            })
        }) 
    })
})

describe('Casos de teste sobre a rota /account/v1/User/{UUID} da API Book Store', () => {

    describe('Casos positivos de sucesso.', () => {
  
        it('Buscar Usuário', () => {
            cy.geraUserParaToken().then(user => {
                cy.geraToken(user.userName, user.password).then(() =>{
                    cy.geraAutorização(user.userName, user.password).then(() => {
                        cy.buscaDetalhesUser().then(res => {
                            ValidaBookstore.validaBuscaUser(res)
                        })
                    })
                })
            })
        })
    })

    describe('Casos positivos de erro', () => {

        it('Deve dar erro quando o usuário não possuir token', () => {
            cy.geraUserParaToken().then(() => {
                        cy.buscaDetalhesUserSemToken().then(res => {
                            ValidaBookstore.validaBuscaUserSemAutorization(res)
                        })
            })
        })

        it('Deve dar erro quando o usuário não possuir autorização', () => {
            cy.geraUserParaToken().then(user => {
                cy.geraToken(user.userName, user.password).then(() =>{
                        cy.buscaDetalhesUser().then(res => {
                            cy.log('está retornando undefined pq esse cenário deu sucesso, e no body de sucesso não existe uma propriedade "message"').then(() => {
                                 ValidaBookstore.validaBuscaUserSemAutorization(res)
                            })
                        })
                })
            })
        })

        it('Deve dar erro quando for passado um userID inválido', () => {
            cy.geraUserIDInvalido().then(user => {
                cy.geraToken(user.userName, user.password).then(() =>{
                        cy.buscaDetalhesUser().then(res => {
                            ValidaBookstore.validaBuscaUserIDInvalido(res)
                        })
                })
            })
        })
    })
})