import animaisInfo from "./animaisInfo.js"


class AbrigoAnimais {

  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {

    //Transformando string em arrays
    let brinquedosPessoa1Arr = brinquedosPessoa1.split(',')
    let brinquedosPessoa2Arr = brinquedosPessoa2.split(',')
    let ordemAnimaisArr = ordemAnimais.split(',')

    let result = [
      { nome: ordemAnimaisArr[0], dono: 'abrigo', candidatosValidos: []},
      { nome: ordemAnimaisArr[1], dono: 'abrigo', candidatosValidos: []}
    ]
  
    let animal1Objeto = animaisInfo.find(animal => animal.nome === ordemAnimaisArr[0]); //Pegando o objeto do animal 1

    // console.log(brinquedosPessoa1Arr)
    // console.log(animal1Objeto.brinquedos)

    //Verifica se a pessoa 1 tem os brinquedos necessarios
    if(verificarBrinquedos(brinquedosPessoa1Arr, animal1Objeto.brinquedos)){
      result[0].candidatosValidos.push("Pessoa1")
    }

    //Verifica se a pessoa 2 tem os brinquedos necessarios
    if(verificarBrinquedos(brinquedosPessoa2Arr, animal1Objeto.brinquedos)){
      result[0].candidatosValidos.push("Pessoa2")
    }

    //Se o animal possuir APENAS um candidato válido o animal ganha um dono, do contrario permanece no abrigo
    result.map((animal) => {
      if(animal.candidatosValidos.length === 1){
        animal.dono = animal.candidatosValidos[0]
      }
    })
   

    console.log(result)

   //Funções
   //Verifica se possue todos os brinquedos desejados
   function verificarBrinquedos(brinquedos, brinquedosDesejados){
      let cadidatoValido = false
      let brinquedosNecessarios = brinquedosDesejados.every(e => brinquedos.includes(e)); //Verifica a pessoa possue os brinquedos necessarios

      //Verifica se possue os objetos na ordem correta
      //Com esse if consigo saber se a ordem está correta
      if(brinquedosNecessarios){
        let array3 = brinquedos.filter(e => brinquedosDesejados.includes(e))
        if(array3 = brinquedosDesejados){
          cadidatoValido = true
        }
      }

      return cadidatoValido
   }

  }

  
}

export { AbrigoAnimais as AbrigoAnimais };







//Chamando código

// 1. Crie uma instância da classe AbrigoAnimais
const meuAbrigo = new AbrigoAnimais();

// 2. Chame a função encontraPessoas com os argumentos desejados
meuAbrigo.encontraPessoas('RATO,BOLA', 'RATO,NOVELO,BOLA', 'Rex,Fofo');
