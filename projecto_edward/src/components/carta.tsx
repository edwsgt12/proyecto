

type Props = {
    numero:number;
    nombre:string;
    tipo: string;
    ataque: number;
    defensa: number;
    descripcion: string;
    imagen: string;
    mostrarDetalleCarta: Function;
}

const DiseñoCarta = ({
    ataque,
    defensa,
    descripcion,
    imagen,
    nombre,
    numero,
    tipo,
    mostrarDetalleCarta
}:Props)=>{
    return (
        <div className="flex flex-col items-center w-100 rounded-2xl">
            <h1 > {nombre} (#{numero})</h1>
            <img className=" w-90 h-90 boder-5 border-dashed rounded-5 " src={imagen} alt={nombre}/>
            <p className="pl-5 pr-5 text-center">Tipo: {tipo}</p>
            <p className="pl-5 pr-5 text-center">Ataque: {ataque}</p>
            <p className="pl-5 pr-5 text-center">Defensa: {defensa}</p>
            <div onClick={()=> mostrarDetalleCarta(true)}>
                <p>Descripcion</p>
            </div>
        </div>
    );
}

export default DiseñoCarta;