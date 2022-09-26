type Props = {
  state: string
}

export const StateField = (props: Props) => {
  let color = 'white'

  switch(props.state) {
    case 'Aprobado':
      color = 'rgb(193 243 190)'
      break
    case 'Procesando':
      color = '#aed8fb'
      break
    case 'Elaborando':
      color = '#ffdd9e'
      break
    case 'Pendiente':
      color = '#ffdd9e'
      break  
    case 'Abierto':
      color = '#ffdd9e'
      break  
    case 'Cerrado':
      color = 'rgb(193 243 190)'
      break
    case 'Rechazado': 
      color = 'red'  
  }

  return (
    <p
    style={{
      backgroundColor: color,
      color: "#4a4a4a",
      fontSize: '11px',
      padding: '3px 0'
    }}
  >
    {props.state.toUpperCase()}
  </p>
  )
}
