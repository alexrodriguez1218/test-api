const  {validData} = require('./../src/utils/index.js')


describe('prueba de funciones de validacion', () => {
  it('validar objeto para insertar a la base de datos', () => {
    expect(validData()).toBe(true); //envio parametros y debe retorna true
    expect(validData({ nombre: 'Alexander' })).toBe(false); // envio un objeto incompleto y debe retornar  false
    expect(validData({ fullname: 'Alexander', identification: 100, type_identification: 'CC' })).toBe(true); // envio datos para registro debe retornar true
    expect(validData({ fullname: 'Alexander', identification: 9999999999 })).toBe(false); // el numero de identificacion supera la logintud de 10
    expect(validData({ fullname: 'Alexander', identification: -1 })).toBe(false); // el numero de identificacion enviado negativo
    expect(validData({ fullname: 'Alexander', identification: 10000, type_identification: 'C' })).toBe(false); // envio type_identification errado debe returnar false
    expect(validData(null, true)).toBe(false); // Enviado sin data y valor required debe return false
  })
})