const numeroSenha = document.querySelector('.parametro-senha__texto');
const campoSenha = document.querySelector('#campo-senha');
const checkbox = document.querySelectorAll('.checkbox');
const forcaSenha = document.querySelector('.forca');
const valorEntropia = document.querySelector('.entropia');
const botoes = document.querySelectorAll('.parametro-senha__botao');

let tamanhoSenha = 12;

const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const letrasMinusculas = 'abcdefghijklmnopqrstuvwxyz';
const numeros = '0123456789';
const simbolos = '!@#$%&*?';

numeroSenha.textContent = tamanhoSenha;

// Atualiza ano do footer
document.getElementById('ano-atual').textContent = new Date().getFullYear();

// Eventos dos botões
botoes[0].addEventListener('click', diminuiTamanho);
botoes[1].addEventListener('click', aumentaTamanho);

// Eventos dos checkboxes
checkbox.forEach(item => {
item.addEventListener('click', geraSenha);
});

function diminuiTamanho() {
if (tamanhoSenha > 1) {
tamanhoSenha--;
numeroSenha.textContent = tamanhoSenha;
geraSenha();
}
}

function aumentaTamanho() {
if (tamanhoSenha < 30) {
tamanhoSenha++;
numeroSenha.textContent = tamanhoSenha;
geraSenha();
}
}

function geraSenha() {

```
let alfabeto = '';

if (checkbox[0].checked) alfabeto += letrasMaiusculas;
if (checkbox[1].checked) alfabeto += letrasMinusculas;
if (checkbox[2].checked) alfabeto += numeros;
if (checkbox[3].checked) alfabeto += simbolos;

if (alfabeto.length === 0) {
    campoSenha.value = 'Selecione uma opção';
    valorEntropia.textContent = '';
    forcaSenha.className = 'forca fraca';
    return;
}

let senha = '';

for (let i = 0; i < tamanhoSenha; i++) {
    const indice = Math.floor(Math.random() * alfabeto.length);
    senha += alfabeto[indice];
}

campoSenha.value = senha;

classificaSenha(alfabeto.length);
```

}

function classificaSenha(tamanhoAlfabeto) {

```
const entropia = tamanhoSenha * Math.log2(tamanhoAlfabeto);

forcaSenha.classList.remove('fraca', 'media', 'forte');

if (entropia >= 57) {
    forcaSenha.classList.add('forte');
} else if (entropia >= 35) {
    forcaSenha.classList.add('media');
} else {
    forcaSenha.classList.add('fraca');
}

const dias = Math.floor(
    (2 ** entropia) / (100000000 * 60 * 60 * 24)
);

valorEntropia.textContent =
    "Um computador pode levar até " +
    dias.toLocaleString('pt-BR') +
    " dias para descobrir essa senha.";
```

}

// Copiar senha ao clicar
campoSenha.addEventListener('click', () => {

```
if (campoSenha.value === 'Selecione uma opção') return;

navigator.clipboard.writeText(campoSenha.value);

const textoOriginal = campoSenha.value;

campoSenha.value = 'Senha copiada!';

setTimeout(() => {
    campoSenha.value = textoOriginal;
}, 1000);
```

});

geraSenha();
