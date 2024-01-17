class ValidaFormulario {
    constructor() {
        this.formulario = document.querySelector('.formulario');
        this.eventos();
    }

    eventos() {
        this.formulario.addEventListener('submit', e => {
            this.handleSubmit(e);
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const validFields = this.isValid();
        const validPassword = this.validPassword();

        if(validFields && validPassword) {
            alert('Formulário enviado!');
            this.formulario.submit();
        }
    }

    validPassword() {
        let valid = true;
        const password = this.formulario.querySelector('.senha');
        const passwordRepeat = this.formulario.querySelector('.repetir');
        if(password.value !== passwordRepeat.value) {
            valid = false;
            this.createError(password, '* Senhas não conferem.');
            this.createError(passwordRepeat, '* Senhas não conferem.');
        }

        if(password.value.length < 6 || password.value.length > 12) {
            valid = false;
            this.createError(password, '* Senha precisa estar entre 6 e 12 caracteres.');
        }
        return valid;
    }

    isValid() {
        let valid = false;

        for(let errorText of this.formulario.querySelectorAll('.error-text')) {
            errorText.remove();
        }
        for(let field of this.formulario.querySelectorAll('.validating')){
            const label = field.previousElementSibling.innerHTML;
            if(!field.value) {
                this.createError(field, `* Campo "${label}" não pode estar em branco.`);
            }
            if(field.classList.contains('cpf')) {
                if(!this.validaCpf(field)) valid = false;
            }

            if(field.classList.contains('usuario')) {
                if(!this.validaUsuario(field)) valid = false;
            }
        }

        return valid;
    }
    
    validaUsuario(field) {
        const usuario = field.value;
        let valid = true;
        if(usuario.length < 3 || usuario.length > 12) {
            this.createError(field, '* Usuário precisa ter entre 3 e 12 caracteres');
            valid = false;
        }

        if(!usuario.match(/^[a-zA-Z0-9]+$/g)){
            this.createError(field, '* Usuário precisa ter apenas letras e/ou números')
        }

        return valid;
    }

    validaCpf(field) {
        const cpf = new ValidaCpf(field.value);
        if(!cpf.valida()) {
            this.createError(field, '* CPF inválido!');
            return false;
        }
        return true;

    }
    createError(field, msg) {
        const div = document.createElement('div');
        div.innerHTML = msg;
        div.classList.add('error-text');
        field.insertAdjacentElement('afterend', div);
    }
}

const valida = new ValidaFormulario();