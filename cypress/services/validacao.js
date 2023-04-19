
export default class ValidaBookstore {

    /*----------- ACCOUNT/USERS ------------- */

    static validaCriarUser(res){
        cy.contractValidation(res, 'account/users/post-user', 201)
    }

    static validaCriarUserExistente(res){
        cy.contractValidation(res, 'account/users/post-user', 406)
        expect(res.body.message).to.be.eq('User exists!')
    }

    static validarCamposEmBranco(res){
        cy.contractValidation(res, 'account/users/post-user-undoc', 400)
        expect(res.body.message).to.be.eq('UserName and Password required.')
    }

    static validarSenha(res){
        cy.contractValidation(res, 'account/users/post-user-undoc2', 400)
        expect(res.body.message).to.be.eq("Passwords must have at least one non alphanumeric character, one digit ('0'-'9'), one uppercase ('A'-'Z'), one lowercase ('a'-'z'), one special character and Password must be eight characters or longer.")
    }

    /*----------- ACCOUNT/GENERATETOKEN ------------- */

    static validarGerarToken(res){
        cy.contractValidation(res, 'account/generateToken/post-GenerateToken', 200)
        expect(res.body.status).to.be.eq("Success")
        expect(res.body.result).to.be.eq("User authorized successfully.")
    }

    static validarGerarTokenDadosErrados(res){
        cy.contractValidation(res, 'account/generateToken/post-GenerateToken-failed', 200)
        expect(res.body.status).to.be.eq("Failed")
        expect(res.body.result).to.be.eq("User authorization failed.")
    }

    static validarGerarTokenDadosEmBranco(res){
        cy.contractValidation(res, 'account/generateToken/post-GenerateToken', 400)
        expect(res.body.message).to.be.eq('UserName and Password required.')
    }

    /*----------- ACCOUNT/AUTHORIZATION ------------- */

    static validarGerarAutorizationTrue(res){
        cy.contractValidation(res, 'account/authorization/post-authorization', 200)
        expect(res.body).to.be.true;
    }

    static validarGerarAutorizationFalse(res){
        cy.contractValidation(res, 'account/authorization/post-authorization', 200)
        expect(res.body).to.be.false;
    }

}