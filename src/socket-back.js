import { adicionarDocumento, atualizaDocumento, encontrarDocumento, excluir_documento, obterDocumentos } from "./documentosDb.js";
import io from "./servidor.js";


 io.on('connection', (socket) => {

    socket.on("obter_documentos", async (devolverDocumentos) => {
        const documentos = await obterDocumentos();
        console.log(documentos);

        devolverDocumentos(documentos);
    });

    socket.on("adicionar_documento", async (nomeDocumento) =>{

        const documentoExiste = (await encontrarDocumento(nomeDocumento)) !== null;

        if(documentoExiste){
            socket.emit("documento_existente", nomeDocumento)
        }else{
            const resultado = await adicionarDocumento(nomeDocumento);

            io.emit("adicionar_documento_interface", nomeDocumento);
        }

       
            
    })

    socket.on("selecionar_documento", async (nomeDocumento, devolverTexto) =>{        
        socket.join(nomeDocumento);

        const documento = await encontrarDocumento(nomeDocumento);


        if(documento){
            devolverTexto(documento.texto);
        }
        
    })

    socket.on("texto_editor", async ({ texto, nomeDocumento }) => {

        const atualizacao = await atualizaDocumento(nomeDocumento, texto);
            

        // if(atualizacao.modifiedCount){

            socket.to(nomeDocumento).emit("texto_editor_clientes", texto);
        // }
        
      
    });

    socket.on("excluir_documento", async (nome) => {
       const resultado = await excluir_documento(nome);
       if(resultado.deletedCount === 1){
        io.emit("excluir_documento_sucesso", nome);
       }
       
    });

    socket.on("disconnect", (motivo) => {
        console.log(`Cliete "${socket.id} desconectado! Motivo: ${motivo}"`);
    })

    
});

