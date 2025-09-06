export const animaisInfo = [
  { nome: 'Rex', tipo: 'cão', brinquedos: ['RATO', 'BOLA'] },
  { nome: 'Mimi', tipo: 'gato', brinquedos: ['BOLA', 'LASER'] },
  { nome: 'Fofo', tipo: 'gato', brinquedos: ['BOLA', 'RATO', 'LASER'] },
  { nome: 'Zero', tipo: 'gato', brinquedos: ['RATO', 'BOLA'] },
  { nome: 'Bola', tipo: 'cão', brinquedos: ['CAIXA', 'NOVELO'] },
  { nome: 'Bebe', tipo: 'cão', brinquedos: ['LASER', 'RATO', 'BOLA'] },
  { nome: 'Loco', tipo: 'jabuti', brinquedos: ['SKATE', 'RATO'] },
];

//Array com todos os brinquedos possiveis
export const brinquedos = Array.from(new Set(animaisInfo.flatMap(animal => animal.brinquedos)));
