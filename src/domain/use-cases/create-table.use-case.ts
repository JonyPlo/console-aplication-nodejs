// Esta interfaz es la regla de negocio que vamos a forzar a la clase CreateTable para que la implemente
export interface CreateTableUseCase {
  execute: (options: CreateTableOptions) => string
}

export interface CreateTableOptions {
  base: number
  limit?: number
}

// Con implements CreateTableUseCase ya estamos agregando el tipado o la regla de negocio que definimos en las interfaces
export class CreateTable implements CreateTableUseCase {
  /**
   * DI - Dependency Injection
   */
  constructor() {}

  // Cada caso de uso suele tener un metodo 'execute' o 'run'
  execute({ base, limit = 10 }: CreateTableOptions) {
    let outputMessage = ''
    for (let i = 1; i <= limit; i++) {
      outputMessage += `${base} x ${i} = ${base * i}`

      if (i < limit) {
        outputMessage += '\n'
      }
    }

    return outputMessage
  }
}
