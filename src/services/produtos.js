import { http } from './config'

export default {

    listar: () => {
        return http.get('/estoqueapi/') // Buscar os produtos
    },

    salvar: (produto) => {
        return http.post('/estoqueapi/post.php', produto)
    },

    atualizar: (produto) => {        
        return http.put('/estoqueapi/put.php', produto)
    },

    apagar: (produto) => {
        return http.delete('/estoqueapi/delete.php?id='+produto.id, produto.id )
    }

}