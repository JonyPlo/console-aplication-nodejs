import yargs from 'yargs/yargs'
import { hideBin } from 'yargs/helpers'

export const yarg = yargs(hideBin(process.argv))
  // En el argumento option vamos a crear la definicion de la bandera -b que mandemos en el comando que escribamos en la terminal para ejecutar la aplicacion
  .option('b', {
    alias: 'base', // Alias para la bandera, para que en vez de usar -b, usemos --base
    type: 'number', // Tipo de dato
    demandOption: true, // Hace que la bandera -b sea obligatoria
    describe: 'Multiplication table base', // Descripcion de la bandera
  })
  // En este caso estamos definiendo una bandera '-l' o '--limit' que no es obligatoria
  .option('l', {
    alias: 'limit',
    type: 'number',
    default: 10, // Valor por defecto si no se envia la bandera -l
    describe: 'Multiplication table limit',
  })
  // En este caso como -s es un booleano, solo con especificar la bandera -s ya estamos diciendo que ahora el valor es true, pero si no se especifica la bandera, entonces es false
  .option('s', {
    alias: 'show',
    type: 'boolean',
    default: false,
    describe: 'Show multiplication table',
  })
  .option('n', {
    alias: 'name',
    type: 'string',
    default: 'multiplication-table',
    describe: 'File name',
  })
  .option('d', {
    alias: 'destination',
    type: 'string',
    default: 'outputs',
    describe: 'File destination',
  })
  // El metodo check es para realizar validaciones en las banderas, este metodo necesita como argumento un callback que recibe 2 parametros, el primero son los argument values o las banderas con sus valores, y el segundo es un objeto con diferentes opciones.
  .check((argv, options) => {
    // Si la bandera -b o --base es menor que 1, entonces lanzamos el error y no permitimos que se ejecute el comando
    if (argv.b < 1) throw 'Error: base must be greater than 0'
    return true
  })
  .parseSync()
