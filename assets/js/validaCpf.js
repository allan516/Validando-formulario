
class ValidaCpf {
    constructor(cpfenviado) {
        Object.defineProperty(this, 'cpfLimpo', {
            value: cpfenviado.replace(/\D+/g, ''),
            enumerable: true,
            configurable: false, 
            writable: false
        });
    }

    eSequencia() {
        return this.cpfLimpo.charAt(0).repeat(11) === this.cpfLimpo;
    }

    geranovoCpf() {
        const cpfParcial = this.cpfLimpo.slice(0, -2);
        const digito1 = ValidaCpf.geraDigito(cpfParcial);
        const digito2 = ValidaCpf.geraDigito(cpfParcial + digito1);
        this.novoCpf = cpfParcial + digito1 + digito2;

    }

    static geraDigito(cpfParcial) {// quando o método não tem '.this' ela pode se tornar uma função estatic
        let total = 0;
        let reverso = cpfParcial.length + 1;

        for(let numer of cpfParcial) {
            total += reverso * Number(numer);
            reverso--;
        }

        const digito = 11 - (total % 11);
        return digito <= 9 ? String(digito) : '0';
    }

    valida() {
        if(!this.cpfLimpo) return false;
        if(typeof this.cpfLimpo !== 'string') return false;
        if(this.cpfLimpo.length !== 11) return false;
        if(this.eSequencia()) return false;
        this.geranovoCpf();
        return this.novoCpf === this.cpfLimpo;
    }
}





