import { CreateTable } from '../domain/use-cases/create-table.use-case'
import { SaveFile } from '../domain/use-cases/save-file.use-case'

interface RunOptions {
  base: number
  limit: number
  showTable: boolean
  fileName: string
  fileDestination: string
}

export class ServerApp {
  // Hacer que un metodo sea estatico indica que lo queremos usar sin inicializar la clase con new, directamente lo usamos con ServerApp.run()
  static run({
    base,
    limit,
    showTable,
    fileName,
    fileDestination,
  }: RunOptions) {
    console.log('Server running...')

    const table = new CreateTable().execute({ base, limit })
    const wasCreated = new SaveFile().execute({
      fileContent: table,
      fileName,
      fileDestination,
    })

    if (showTable) {
      console.log(table)
    }

    wasCreated
      ? console.log('File created!')
      : console.error('File not created!')
  }
}
