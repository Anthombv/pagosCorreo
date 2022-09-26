type Props = {
    finan: string
}

export const FinanField = (props: Props) => {
    let color = 'white'

    switch(props.finan) {
        case 'Aprobado':
            color = 'rgb(193 243 190)'
            break
        case 'Pendiente':
            color = '#ffdd9e'
            break      
    }

    return (
        <p
        style={{
            backgroundColor: color,
            color: "#4a4a4a",
            fontSize: "11px",
            padding: "3px 0"
        }}      
        >
            {props.finan.toUpperCase()}
        </p>
    )
}