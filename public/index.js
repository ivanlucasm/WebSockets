import { emitirAdicionarDocumento } from "./socket-front-index.js";

const listaDocumantos = document.getElementById("lista-documentos");
const form = document.getElementById("form-adiciona-documento");
const imputDocumento = document.getElementById("input-documento");

form.addEventListener("submit", (evento) => {
    
    evento.preventDefault();
    
    emitirAdicionarDocumento(imputDocumento.value);
    imputDocumento.value = "";
});


function inserirLinkDocumento(nomeDocumento){
    listaDocumantos.innerHTML += `
    <a href="documento.html?nome=${nomeDocumento}" 
    class="list-group-item list-group-item-action"
    id="documento-${nomeDocumento}">
        ${nomeDocumento}
  </a>
    `;
}

function removerLinkDocumento(nomeDocumento){
    const documento = document.getElementById(`documento-${nomeDocumento}`);

    listaDocumantos.removeChild(documento);
}
export { inserirLinkDocumento, removerLinkDocumento };