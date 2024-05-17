import { ServerApp } from '../src/presentation/server-app'

describe('tests in app.ts', () => {
  test('should call Server.run with values', async () => {
    const serverRunMock = jest.fn()
    ServerApp.run = serverRunMock
    process.argv = [
      'node',
      'app.ts',
      '-b',
      '10',
      '-l',
      '5',
      '-s',
      '-n',
      'test-file',
      '-d',
      'test-destination',
    ]

    // En este caso hacemos await import ('../src/app'), porque cuando importamos el app.ts, este ejecuta tambien la aplicacion, pero antes de que se ejecute la aplicacion necesitamos preparar algunas cosas como mocks etc. Ahora una vez preparado todo recien importamos la aplicacion para que se ejecute, y para eso necesitamos usar 'await', para que no se importe el archivo ni se ejecute hasta que todo lo que esta antes se haya setteado. Y es por esto que al app.ts lo importamos aqui y no al principio del archivo
    await import('../src/app')

    expect(serverRunMock).toHaveBeenCalledWith({
      base: 10,
      limit: 5,
      showTable: true,
      fileName: 'test-file',
      fileDestination: 'test-destination',
    })
  })
})
