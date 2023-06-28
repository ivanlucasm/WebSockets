import { MongoClient } from "mongodb";

const cliente = new MongoClient("mongodb+srv://ivanlucasm:042299%40Iv@cluster0.bqjubzk.mongodb.net/?retryWrites=true&w=majority");

let documentosColecao;

try{
    await cliente.connect();

    const db = cliente.db("aluraWebSockets");
    documentosColecao = db.collection("documentos");

    console.log("Conectado ao banco de dados com sucesso. ");
}catch(erro){
    console.log(erro);
}

export { documentosColecao };