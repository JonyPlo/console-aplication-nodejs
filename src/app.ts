interface Props {
  saludo: string
}

const saludo = ({ saludo }: Props) => {
  console.log(saludo)
}

saludo({ saludo: 'Hola esto es un saludo!!!' })