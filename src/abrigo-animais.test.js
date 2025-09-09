import { AbrigoAnimais } from "./abrigo-animais";

describe('Abrigo de Animais', () => {

  test('Deve rejeitar animal inválido (nome)', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('CAIXA,RATO', 'RATO,BOLA', 'Lulu');
    expect(resultado.erro).toBe('Animal inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve rejeitar brinquedo inválido (nome)', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('CAIXA,OSSO', 'RATO,BOLA', 'Rex');
    expect(resultado.erro).toBe('Brinquedo inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve rejeitar animal inválido (Animal duplicado)', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('CAIXA,RATO', 'RATO,BOLA', 'Rex,Fofo,Rex,Mimi');
    expect(resultado.erro).toBe('Animal inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve rejeitar brinquedo inválido (Brinquedo duplicado)', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('RATO,BOLA,CAIXA,BOLA,NOVELO', 'RATO,BOLA', 'Rex,Mimi,Fofo');
    expect(resultado.erro).toBe('Brinquedo inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve deixar animal no abrigo (Duas pessoas)', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('RATO,BOLA', 'RATO,BOLA', 'Rex');
      expect(resultado.lista[0]).toBe('Rex - abrigo');
      expect(resultado.lista.length).toBe(1);
      expect(resultado.erro).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('RATO,BOLA', 'RATO,NOVELO', 'Rex,Fofo');
      expect(resultado.lista[0]).toBe('Fofo - abrigo');
      expect(resultado.lista[1]).toBe('Rex - pessoa 1');
      expect(resultado.lista.length).toBe(2);
      expect(resultado.erro).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal intercalando brinquedos', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('BOLA,LASER', 'BOLA,NOVELO,RATO,LASER', 'Mimi,Fofo,Rex,Bola');
      expect(resultado.lista[0]).toBe('Bola - abrigo');
      expect(resultado.lista[1]).toBe('Fofo - pessoa 2');
      expect(resultado.lista[2]).toBe('Mimi - abrigo');
      expect(resultado.lista[3]).toBe('Rex - abrigo');
      expect(resultado.lista.length).toBe(4);
      expect(resultado.erro).toBeFalsy();
  });

  test('Deve adotar apenas o gato (Gatos não dividem seus brinquedos)', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('RATO,BOLA', 'BOLA,CAIXA,NOVELO', 'Zero,Rex');
      expect(resultado.lista[0]).toBe('Rex - abrigo');
      expect(resultado.lista[1]).toBe('Zero - pessoa 1');
      expect(resultado.lista.length).toBe(2);
      expect(resultado.erro).toBeFalsy();
  });

  test('Deve adotar apenas o Loco (Loco não se importa com a ordem dos seus brinquedos desde que tenha outro animal como companhia)', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('RATO,BOLA,SKATE', 'BOLA,CAIXA,NOVELO', 'Rex,Loco');
      expect(resultado.lista[0]).toBe('Loco - pessoa 1');
      expect(resultado.lista[1]).toBe('Rex - pessoa 1');
      expect(resultado.lista.length).toBe(2);
      expect(resultado.erro).toBeFalsy();
  });


});
