import animaisInfo from "./animaisInfo.js"


class AbrigoAnimais {

  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {

    //Transformando string em arrays
    let brinquedosPessoa1Arr = brinquedosPessoa1.split(',')
    let brinquedosPessoa2Arr = brinquedosPessoa2.split(',')
    let ordemAnimaisArr = ordemAnimais.split(',')

    let animal1 = ordemAnimaisArr[0]
    let animal1Objeto = animaisInfo.find(animal => animal.nome === ordemAnimaisArr[0]); //Pegando o objeto do animal 1

    console.log(brinquedosPessoa1Arr)
    console.log(animal1Objeto.brinquedos)

    if(verificarBrinquedos(brinquedosPessoa1Arr, animal1Objeto.brinquedos)){
      console.log("Possue todos os brinquedos necessarios")
    } else{
      console.log("Não tem todos os brinquedos necessarios")
    }

  //  console.log(animal1Objeto)
   
   //Verifica se possue todos os brinquedos desejados
   function verificarBrinquedos(brinquedos, brinquedosDesejados){
      return brinquedos.every(e => brinquedosDesejados.includes(e));
   }

  }

  
}

export { AbrigoAnimais as AbrigoAnimais };







//Chamando código

// 1. Crie uma instância da classe AbrigoAnimais
const meuAbrigo = new AbrigoAnimais();

// 2. Chame a função encontraPessoas com os argumentos desejados
meuAbrigo.encontraPessoas('RATO,BOLA', 'RATO,NOVELO', 'Rex,Fofo');
