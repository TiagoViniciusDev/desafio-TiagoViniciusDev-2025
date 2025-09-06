import {animaisInfo, brinquedos} from "./data.js"


class AbrigoAnimais {

  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, animaisParaAdocao) {

    //Transformando string em arrays
    let brinquedosPessoa1Arr = brinquedosPessoa1.split(',')
    let brinquedosPessoa2Arr = brinquedosPessoa2.split(',')
    let animaisParaAdocaoArr = animaisParaAdocao.split(',')

    //Verificando se o nome dos animais são validos
    animaisParaAdocaoArr.map((nomeAnimal => {
      let existeNomeAnimal = animaisInfo.some(animal => animal.nome === nomeAnimal)
      if(existeNomeAnimal == false){
       console.log(`Erro: Nome de animal inválido. ${nomeAnimal}`)
       throw new Error("Animal inválido")
      }
    }))

    //Verificando se há animais duplicados
    if(verificarDuplicados(animaisParaAdocaoArr)){
      console.log(`Erro: Animais duplicados encontrados`)
      throw new Error("Animal inválido")
    }

    //Verificando se pessoa1 tem brinquedos duplicados
    if(verificarDuplicados(brinquedosPessoa1Arr)){
      console.log(`Erro: Brinquedos duplicados encontrados (Pessoa1)`)
      throw new Error("Brinquedo inválido")
    }

    //Verificando se pessoa2 tem brinquedos duplicados
    if(verificarDuplicados(brinquedosPessoa2Arr)){
      console.log(`Erro: Brinquedos duplicados encontrados (Pessoa2)`)
      throw new Error("Brinquedo inválido")
    }

    //Array de objetos que armazena as informações
    let result = [
      { nome: animaisParaAdocaoArr[0], dono: 'abrigo', candidatosValidos: []},
      { nome: animaisParaAdocaoArr[1], dono: 'abrigo', candidatosValidos: []}
    ]
  
    let animal1Objeto = animaisInfo.find(animal => animal.nome === animaisParaAdocaoArr[0]); //Pegando o objeto do animal 1

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

   //Verifica se há elementos duplicados
   function verificarDuplicados(arr){
      const set = new Set(arr);
      return set.size !== arr.length; //Set tiver elementos duplicados retorna true
   }

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

//Instância da classe AbrigoAnimais
const meuAbrigo = new AbrigoAnimais();

//Chamando a função encontraPessoas da classe
meuAbrigo.encontraPessoas('RATO,BOLA', 'RATO,NOVELO,BOLA', 'Rex,Fofo');
