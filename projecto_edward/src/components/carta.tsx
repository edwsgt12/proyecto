type Props = {
    numero:number;
    nombre:string;
    tipo: string;
    ataque: number;
    defensa: number;
    descripcion: string;
    imagen: string;
}

const DiseñoCarta = ({
    ataque,
    defensa,
    descripcion,
    imagen,
    nombre,
    numero,
    tipo,
}:Props)=>{
    return (
        <div>
            <p>numero: {numero}</p>
            <h3> {nombre} (#{nombre})</h3>
            <img src={imagen} alt={nombre}/>
            <p>Tipo: {tipo}</p>
            <p>Ataque: {ataque}</p>
            <p>Defensa: {defensa}</p>
            <p>descripcion: {descripcion}</p>
        </div>
    );
}

export default DiseñoCarta;