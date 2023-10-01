// Classe ContaBancaria
class ContaBancaria {
    constructor(agencia, numero, tipo, saldo) {
        this.agencia = agencia;
        this.numero = numero;
        this.tipo = tipo;
        this.saldo = saldo;
    }

    // Métodos get e set para saldo
    getSaldo() {
        return this.saldo;
    }

    setSaldo(novoSaldo) {
        this.saldo = novoSaldo;
    }

    // Métodos para sacar e depositar valores
    sacar(valor) {
        if (valor <= this.saldo) {
            this.saldo -= valor;
            return true;
        }
        return false;
    }

    depositar(valor) {
        this.saldo += valor;
    }
}

// Classe ContaCorrente (Herda de ContaBancaria)
class ContaCorrente extends ContaBancaria {
    constructor(agencia, numero, saldo, cartaoCredito) {
        super(agencia, numero, "Conta Corrente", saldo);
        this.cartaoCredito = cartaoCredito;
    }

    
   
// Métodos get e set para cartaoCredito
    getCartaoCredito() {
        return this.cartaoCredito;
    }

    setCartaoCredito(novoCartaoCredito) {
        this.cartaoCredito = novoCartaoCredito;
    }
}

// Classe ContaPoupanca (Herda de ContaBancaria)
class ContaPoupanca extends ContaBancaria {
    constructor(agencia, numero, saldo) {
        super(agencia, numero, "Conta Poupança", saldo);
    }
}

// Classe ContaUniversitaria (Herda de ContaBancaria)
class ContaUniversitaria extends ContaBancaria {
    constructor(agencia, numero, saldo) {
        super(agencia, numero, "Conta Universitária", saldo);
    }

    // Modifique o método de saque para contas universitárias
    sacar(valor) {
        if (this.tipo === "Conta Universitária" && valor <= 500) {
            this.saldo -= valor;
            return true;
        } else {
            
           
return super.sacar(valor);
        }
    }
}

// Lista de contas
const contas = [];

// Função para inserir uma nova conta na lista
function inserirConta() {
    const agencia = document.getElementById("agencia").value;
    const numero = document.getElementById("numero").value;
    const tipo = document.getElementById("tipo").value;
    const saldo = parseFloat(document.getElementById("saldo").value);

    let novaConta;

    if (tipo === "Conta Corrente") {
        novaConta = new ContaCorrente(agencia, numero, saldo, 0);
    } else if (tipo === "Conta Poupança") {
        novaConta = new ContaPoupanca(agencia, numero, saldo);
    } else if (tipo === "Conta Universitária") {
        novaConta = new ContaUniversitaria(agencia, numero, saldo);
    }

    contas.push(novaConta);
    alert("Conta inserida com sucesso!");
}

// Função para deletar uma conta da lista
function deletarConta() {
    const numeroConta = prompt("Digite o número da conta que deseja deletar:");
    const index = contas.findIndex(conta => conta.numero === numeroConta);

    if (index !== -1) {
        contas.splice(index, 1);
        alert("Conta deletada com sucesso!");
    } else {
        alert("Conta não encontrada.");
    }
}

// Função para visualizar todas as contas
function visualizarContas() {
    const listaContas = document.getElementById("listaContas");
    listaContas.innerHTML = "";

    for (const conta of contas) {
        listaContas.innerHTML += `Agência: ${conta.agencia}, Número: ${conta.numero}, Tipo: ${conta.tipo}, Saldo: R$ ${conta.saldo.toFixed(2)}<br>`;
    }
}