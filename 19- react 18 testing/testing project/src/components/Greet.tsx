
const Greet = ({name}: {name?: string}) => {
  if (name) return <h3 className='h3'>Hola, {name}</h3>
  return <h3 className='h3 text-danger'>Hola, usuario</h3>
}

export default Greet