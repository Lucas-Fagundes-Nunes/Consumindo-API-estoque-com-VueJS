<template>
  <div id="app">

    <nav>
      <div class="nav-wrapper blue darken-1">
        <a href="#" class="brand-logo center">Estoque de Produtos API</a>
      </div>
    </nav>

    <div class="container">
      <form @submit.prevent="salvar">

          <label>Código</label>
          <input v-model="produto.codigo" type="text" placeholder="Código de Barras">

          <label>Nome</label>
          <input v-model="produto.nome" type="text" placeholder="Digite o Nome">

          <label>Detalhe do produto</label>
          <textarea v-model="produto.detalhe"></textarea>

          <label>Quantidade</label>
          <input v-model="produto.quantidade" type="number">

          <label>Serie</label>
          <input v-model="produto.serie" type="text" placeholder="Digite a Serie">

          <label>Valor</label>
          <input v-model="produto.valor" type="number">

          <label>Status</label>
          <input v-model="produto.status" type="text" placeholder="Entrada/Saída">


            <br><br>
          <button class="waves-effect waves-light btn-small">Salvar<i class="material-icons left">save</i></button>

      </form>

      <table>

        <thead>

          <tr>
            <th>Código</th>
            <th>Nome</th>
   
            <th>Quantidade</th>
            <th>Serie</th>
            <th style="width:100px; ">Valor</th>
            <th>Status</th>
            <th>Cadastrado</th>
            <th>Atualizado</th>
            <th>OPÇÕES</th>
          </tr>

        </thead>

        <tbody>

          <tr v-for="produto of produtos" :key="produto.id">

            <td> {{ produto.codigo }} </td>
            <td> {{ produto.nome }} </td>
          
            <td> {{ produto.quantidade }} </td>
            <td> {{ produto.serie }} </td>
            <td> {{ 'R$ '+produto.valor }} </td>
            <td> {{ produto.status }} </td>
            <td> {{ produto.data_inicio }} </td>
            <td> {{ produto.data_atualizada }} </td>
            <td>
              <button @click="editar(produto)" class="waves-effect btn-small blue darken-1"><i class="material-icons">create</i></button>
              <button @click="remover(produto)" class="waves-effect btn-small red darken-1"><i class="material-icons">delete_sweep</i></button>
            </td>

          </tr>

        </tbody>
      
      </table>

    </div>

  </div>
</template>

<script>
import Produto from './services/produtos'

export default {

  data() {
    return {
      // POST
      produto: {
        id:'',
        img: '',
        codigo: '',
        nome: '',
        detalhe: '',
        quantidade: '',
        serie: '',
        valor: '',
        fornecedor: '',
        status: '',
        data_inicio: '',
        data_atualizada: '',
        inativo: '',
      },

      // GET
      produtos: [] // array dos produtos
    }
  },


  mounted() // Retorna os valores do Json
  {
    this.listar()
  },

  methods: {

    // Listar
    listar(){
      Produto.listar().then(resposta => {
      this.produtos = resposta.data.produtos // retorna para o array criado a cima
    })
    },

    // POST / PUT
    salvar(){

      if(!this.produto.id)
      {
          Produto.salvar(this.produto).then(resposta => {
          this.produto = {} // Limpar os campos, após POST
          alert('Salvo com Sucesso!', resposta)
          this.listar()
          }).catch(e => {
            console.log(e)
          })
      }else
      {
        Produto.atualizar(this.produto).then(resposta => {
          this.produto = {} // Limpar os campos, após POST
          alert('Atualizado com Sucesso!', resposta)
          this.listar()
          }).catch(e => {
            console.log(e)
          })
      }
      
    },

    // PUT
    editar(produto){
      this.produto = produto
    },

    // DELETE
    remover(produto){

      if(confirm('Deseja deletar o produto ?'))
      {
        Produto.apagar(produto).then(resposta => {
        alert('Deletado com Sucesso!', resposta)
        this.listar()
        }).catch(e => {
          console.log(e)
        })
      }
      
    }
  }
}
</script>

<style>
</style>
