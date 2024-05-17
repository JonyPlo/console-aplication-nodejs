// Si queremos testear una aplicacion de consola, tenemos que hacerlo de esta forma ya que no podemos mandar las banderas mediante algun comando en el testing, asi que podemos crear esta funcion para modificar el metodo argv del process y mediante esta funcion enviar las banderas que nuestro yarg requiere para funcionar
const runCommand = async (args: string[]) => {
  process.argv = [...process.argv, ...args]

  const { yarg } = await import('../../../src/config/plugins/yargs.plugin')

  return yarg
}

describe('tests in yargs.plugin.ts', () => {
  const originalArgv = process.argv

  // Este beforeEach es necesario para resetear los argv del objeto process en cada test, ya que si no lo hacemos, los arg se iran acumulando a medida que pasen los test y los resultados de las pruebas no seran los que esperamos
  beforeEach(() => {
    process.argv = originalArgv
    jest.resetModules()
  })

  test('should return default values', async () => {
    const argv = await runCommand(['-b', '5'])

    expect(argv).toEqual(
      expect.objectContaining({
        b: 5,
        l: 10,
        s: false,
        n: 'multiplication-table',
        d: 'outputs',
      })
    )
  })

  test('should return configuration with custom values', async () => {
    const argv = await runCommand([
      '-b',
      '10',
      '-l',
      '15',
      '-s',
      '-n',
      'custom-name',
      '-d',
      'custom-destination',
    ])

    expect(argv).toEqual(
      expect.objectContaining({
        b: 10,
        l: 15,
        s: true,
        n: 'custom-name',
        d: 'custom-destination',
      })
    )
  })
})
