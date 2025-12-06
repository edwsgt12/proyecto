type Props = {
    descripcion: string;
    mostrarDetalleCarta: Function;
}

const Modal =({
    descripcion,
    mostrarDetalleCarta
}:Props) => {
    return (
        <div onClick={()=> mostrarDetalleCarta(true)}>
            <p>Descripcion</p>
        </div>
    )

}