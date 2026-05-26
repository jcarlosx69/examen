//Componente reutilizable 'Medalla'
//Se puede usar en cualquier parte: <Medalla nombre=<Carlos"/>

function Medalla({ nombre }){
    return (
        <div className="medalla" style={{
            background: 'gold', padding: '10 px 20 px',
            borderRadius: '8px', display: 'inline-block'
        }}>
            <span>El usuario {nombre} tiene medalla</span>
        </div>
    );
}
export default Medalla;