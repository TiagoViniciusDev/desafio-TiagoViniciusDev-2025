import {animaisInfo, brinquedosValidos} from "./data.js"


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

    //Verificando se brinquedos das pessoas são válidos (nome)
      //Verificando se pessoa1 tem brinquedos válidos
      if(!brinquedosPessoa1Arr.every(item => brinquedosValidos.includes(item))){
        console.log(brinquedosValidos)
        console.log(brinquedosPessoa1Arr)
        console.log(`Erro: Brinquedo inválido encontrado (Pessoa1)`)
        throw new Error("Brinquedo inválido")
      }

      //Verificando se pessoa2 tem brinquedos válidos
      if(!brinquedosPessoa2Arr.every(item => brinquedosValidos.includes(item))){
        console.log(`Erro: Brinquedo inválido encontrado (Pessoa2)`)
        throw new Error("Brinquedo inválido")
      }


    //Verificando se há animais duplicados
    if(verificarDuplicados(animaisParaAdocaoArr)){
      console.log(`Erro: Animais duplicados encontrados`)
      throw new Error("Animal inválido")
    }

    //Verificando brinquedos duplicados
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

    //Array de objetos que armazena informações
    let result = []
    animaisParaAdocaoArr.map((animal) => {
      result.push({ nome: animal, dono: 'abrigo', candidatosValidos: []})
    })

    //Animais disponiveis para cada pessoa
      //Animais validos para pessoa 1
      result.map((animal) => {
        if(verificarBrinquedos(brinquedosPessoa1Arr, animal.nome)){
          const index = result.findIndex(e => e.nome === animal.nome) //Obtem o index do animal
          result[index].candidatosValidos.push("Pessoa 1") //Inseri a pessoa como cadidato válido
        }
      })

      //Animais validos para pessoa 2
      result.map((animal) => {
        if(verificarBrinquedos(brinquedosPessoa2Arr, animal.nome)){
          const index = result.findIndex(e => e.nome === animal.nome) //Obtem o index do animal
          result[index].candidatosValidos.push("Pessoa 2") //Inseri a pessoa como cadidato válido
        }
      })

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
      const set = new Set(arr)
      return set.size !== arr.length //Set tiver elementos duplicados retorna true
   }

   //Verifica se possue todos os brinquedos desejados
   function verificarBrinquedos(brinquedosPessoa, nomeAnimal){
      let animalObj = animaisInfo.find(animal => animal.nome === nomeAnimal)
      let brinquedosDesejados = animalObj.brinquedos
      let cadidatoValido = false
      let brinquedosNecessarios = brinquedosDesejados.every(e => brinquedosPessoa.includes(e)); //Verifica a pessoa possue os brinquedos necessarios

      //Verifica se possue os objetos na ordem correta
      //Com esse if consigo saber se a ordem está correta
      if(brinquedosNecessarios){
        let array3 = brinquedosPessoa.filter(e => brinquedosDesejados.includes(e))
        if(array3 = brinquedosDesejados){
          cadidatoValido = true
        } else if(nomeAnimal === 'Loco'){ //Loco não se importa com a ordem dos brinquedos
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
meuAbrigo.encontraPessoas('RATO,BOLA,CAIXA,NOVELO', 'RATO,NOVELO,SKATE', 'Rex,Fofo,Zero,Bola,Loco');
