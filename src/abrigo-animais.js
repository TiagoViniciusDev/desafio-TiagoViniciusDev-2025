import {animaisInfo, brinquedosValidos} from "./data.js"


class AbrigoAnimais {

  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, animaisParaAdocao) {

    //Transformando string em arrays
    let brinquedosPessoa1Arr = brinquedosPessoa1.split(',')
    let brinquedosPessoa2Arr = brinquedosPessoa2.split(',')
    let animaisParaAdocaoArr = animaisParaAdocao.split(',')

    //Verificando se o nome dos animais são validos
    for (const nomeAnimal of animaisParaAdocaoArr) {
      let existeNomeAnimal = animaisInfo.some(animal => animal.nome === nomeAnimal);
      if (!existeNomeAnimal) {
        console.log(`Nome de animal inválido: ${nomeAnimal}`)
        return { erro: 'Animal inválido', lista: undefined }
      }
    }

    //Verificando se brinquedos das pessoas são válidos (nome)
      //Verificando se pessoa1 tem brinquedos válidos
      if(!brinquedosPessoa1Arr.every(item => brinquedosValidos.includes(item))){
        console.log(`Erro: Brinquedo inválido encontrado (Pessoa1)`)
        return { erro: 'Brinquedo inválido', lista: undefined }
      }

      //Verificando se pessoa2 tem brinquedos válidos
      if(!brinquedosPessoa2Arr.every(item => brinquedosValidos.includes(item))){
        console.log(`Erro: Brinquedo inválido encontrado (Pessoa2)`)
        return { erro: 'Brinquedo inválido', lista: undefined }
      }


    //Verificando se há animais duplicados
    if(verificarDuplicados(animaisParaAdocaoArr)){
      console.log(`Erro: Animais duplicados encontrados`)
      return { erro: 'Animal inválido', lista: undefined }
    }

    //Verificando brinquedos duplicados
      //Verificando se pessoa1 tem brinquedos duplicados
      if(verificarDuplicados(brinquedosPessoa1Arr)){
        console.log(`Erro: Brinquedos duplicados encontrados (Pessoa1)`)
        return { erro: 'Brinquedo inválido', lista: undefined }
      }

      //Verificando se pessoa2 tem brinquedos duplicados
      if(verificarDuplicados(brinquedosPessoa2Arr)){
        console.log(`Erro: Brinquedos duplicados encontrados (Pessoa2)`)
        return { erro: 'Brinquedo inválido', lista: undefined }
      }

    //Array de objetos que armazena informações
    let listaDeAnimais = []
    animaisParaAdocaoArr.map((animal) => {
      let animalObj = animaisInfo.find(e => e.nome === animal)
      listaDeAnimais.push({ nome: animal, tipo: animalObj.tipo, dono: 'abrigo', candidatosValidos: []})
    })

    //Verificando candidatos validos animais
    listaDeAnimais.map((animal) => {

      //Verificando Pessoa 1
      if(verificarBrinquedos(brinquedosPessoa1Arr, animal.nome)){
        const index = listaDeAnimais.findIndex(e => e.nome === animal.nome) //Obtem o index do animal
        const animaisAdotadosPessoa1 = listaDeAnimais.filter(e => e.dono === 'pessoa 1') //Todos os animais da pessoa
        let gatoPodeserAdotadoPessoa1 = false

        if(animaisAdotadosPessoa1.length < 3){ //Verifica se a pessoa já tem 3 animais adotados
          if(animal.tipo == 'gato'){ //Verifica se o animal é um gato
          
            if(animaisAdotadosPessoa1.length >= 1){ //Verifica se a pessoa possui ao menos um animal adotado
              console.log("pessoa 1 já tem pelo menos um animal adotado")
              console.log(animaisAdotadosPessoa1)
              animaisAdotadosPessoa1.map((e) => { //Map verifica se nenhum dos animais adotados pela pessoa está usando os brinquedos
                const brinquedosAnimal = animaisInfo.filter(a => a.nome === e.nome)[0].brinquedos
                const brinquedosGato = animaisInfo.filter(a => a.nome === animal.nome)[0].brinquedos
                if(arraysIguais(brinquedosAnimal, brinquedosGato)){ //Se os brinquedos já estiverem em uso por outro animal adotado recusa a adoção do gato
                  gatoPodeserAdotadoPessoa1 = false
                } else{
                  //Removendo brinquedos do gato da pessoa, já que o gato não divide
                  //Testar se funciona com rex e mimi
                  const RemovendoBrinquedosDoGato = brinquedosPessoa1Arr.filter(elemento => !brinquedosGato.includes(elemento))
                  console.log(brinquedosPessoa1Arr)
                  console.log(RemovendoBrinquedosDoGato)
                  gatoPodeserAdotadoPessoa1 = true
                }
              })
            } else{
              listaDeAnimais[index].candidatosValidos.push("pessoa 1") //Inseri pessoa como cadidato válido
            }

          } else{
            listaDeAnimais[index].candidatosValidos.push("pessoa 1") //Inseri pessoa como cadidato válido
          }

          if(gatoPodeserAdotadoPessoa1){
            listaDeAnimais[index].candidatosValidos.push("pessoa 1")
          }
        }
      }


      //Verificando Pessoa 2
      if(verificarBrinquedos(brinquedosPessoa2Arr, animal.nome)){
        const index = listaDeAnimais.findIndex(e => e.nome === animal.nome) //Obtem o index do animal
        const animaisAdotadosPessoa2 = listaDeAnimais.filter(e => e.dono === 'pessoa 2') //Todos os animais da pessoa
        let gatoPodeserAdotadoPessoa2 = false

        if(animaisAdotadosPessoa2.length < 3){ //Verifica se a pessoa já tem 3 animais adotados
          if(animal.tipo == 'gato'){ //Verifica se o animal é um gato
          
            if(animaisAdotadosPessoa2.length >= 1){ //Verifica se a pessoa possui ao menos um animal adotado
              console.log("pessoa 2 já tem pelo menos um animal adotado")
              console.log(animaisAdotadosPessoa2)
              animaisAdotadosPessoa2.map((e) => { //Map verifica se nenhum dos animais adotados pela pessoa está usando os brinquedos
                const brinquedosAnimal = animaisInfo.filter(a => a.nome === e.nome)[0].brinquedos
                const brinquedosGato = animaisInfo.filter(a => a.nome === animal.nome)[0].brinquedos
                if(arraysIguais(brinquedosAnimal, brinquedosGato)){ //Se os brinquedos já estiverem em uso por outro animal adotado recusa a adoção do gato
                  gatoPodeserAdotadoPessoa2 = false
                } else{
                  //Removendo brinquedos do gato da pessoa, já que o gato não divide
                  //Testar se funciona com rex e mimi
                  const RemovendoBrinquedosDoGato = brinquedosPessoa2Arr.filter(elemento => !brinquedosGato.includes(elemento))
                  console.log(brinquedosPessoa2Arr)
                  console.log(RemovendoBrinquedosDoGato)
                  gatoPodeserAdotadoPessoa2 = true
                }
              })
            } else{
              listaDeAnimais[index].candidatosValidos.push("pessoa 2") //Inseri pessoa como cadidato válido
            }

          } else{
            listaDeAnimais[index].candidatosValidos.push("pessoa 2") //Inseri pessoa como cadidato válido
          }

          if(gatoPodeserAdotadoPessoa2){
            listaDeAnimais[index].candidatosValidos.push("pessoa 2")
          }
        }
      }

      //Se o animal possuir APENAS um candidato válido o animal ganha um dono, do contrario permanece no abrigo
      listaDeAnimais.map((animal) => {
        if(animal.candidatosValidos.length === 1){
          animal.dono = animal.candidatosValidos[0]

          //Se for um gato remover brinquedos de gato dessa pessoa, já que o gato não vai dividir
          if(animal.tipo === 'gato'){
            // console.log("GATO DETECTADO")
            // console.log(animal)
            const numeroPessoa = animal.candidatosValidos[0].split(' ')[1] //Diz se é a pessoa 1 ou pessoa 2
            const brinquedosGato = animaisInfo.filter(a => a.nome === animal.nome)[0].brinquedos //Quais brinquedos o gato usa
            if(numeroPessoa == 1){
              const RemovendoBrinquedosDoGato = brinquedosPessoa1Arr.filter(elemento => !brinquedosGato.includes(elemento))
              brinquedosPessoa2Arr = RemovendoBrinquedosDoGato
            } else if(numeroPessoa == 2){
              const RemovendoBrinquedosDoGato = brinquedosPessoa2Arr.filter(elemento => !brinquedosGato.includes(elemento))
              brinquedosPessoa2Arr = RemovendoBrinquedosDoGato
            }
          }
        }

      })


    })


    let result = {
      lista: []
    }

    listaDeAnimais.map((animal) => {
      result.lista.push(`${animal.nome} - ${animal.dono}`)
    })

    result.lista = result.lista.sort()
    console.log(listaDeAnimais)
    console.log(result)
    return result

   //Funções

   function arraysIguais(arr1, arr2) {
      if (arr1.length !== arr2.length) {
        return false // Comprimentos diferentes, não são iguais
      }

      for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
          return false // Elementos diferentes encontrados
        }
      }

      return true // Todos os elementos correspondem
   }

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
const meuAbrigo = new AbrigoAnimais()

//Chamando a função encontraPessoas da classe
meuAbrigo.encontraPessoas('BOLA,LASER', 'BOLA,NOVELO,RATO,LASER', 'Mimi,Fofo,Rex,Bola')