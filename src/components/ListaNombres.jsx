import React, { useState } from 'react'
import uniqid from 'uniqid'
import './ListaNombres.css'

const ListaNombres = () => {

    const [nombre, setNombre] = useState('');
    const [listaNombre, setListaNombre] = useState([]);
    const [modoEdicion, setModoEdicion] = useState (false);
    const [id, setId] = useState ('')
    const [error, setError] = useState (null)

    const addNombre = (e) => {
        e.preventDefault()
        if(!nombre.trim()){
            setError('El Campo nombre está vacío')
         return
        }
        const nuevoNombre = {
            id: uniqid(),
            tituloNombre: nombre
        }

        // los 3 puntos hacen una iteración para añadir los nombres al array listaNombre
        setListaNombre([...listaNombre, nuevoNombre])
        setNombre('')
        setError (null);
    }
//simplemente creamos un nuevo Array utilizando filter
    const deletNombre = (id) => {
        const nuevoArray = listaNombre.filter(item => item.id !== id)
        setListaNombre(nuevoArray)
    }

    const editar = (item) => {
        setModoEdicion (true)
        setNombre(item.tituloNombre)
        setId (item.id)
    }

    const editarNombre = (e) => {
        e.preventDefault()
        const NuevoArray = listaNombre.map ( item =>  item.id === id ? {id:id, tituloNombre:nombre} : item)
        setListaNombre(NuevoArray)
        setModoEdicion (false)
        setNombre ('')

    }


    return (
        <div className="container">
            <h2>Aplicación de CRUD BÁSICA</h2>
            <div className="row">
                <div className="col">Listado de nombres</div>
                <ul className="list-group">
                    {
                        listaNombre.map(item =>
                            <li key="{item.id}" className="list-group-item">{item.tituloNombre}

                                <button className="btn btn-danger float-md-right"
                                    onClick={() => { deletNombre(item.id) }} > 
                                    BORRAR
                                </button>

                                <button className="btn btn-info float-md-right"
                                    onClick={() => { editar(item) }} > 
                                    EDITAR
                                </button>

                            </li>

                        )

                    }
                </ul>
                    <div className="col">Formulario para añadir nombres
                    <form onSubmit={modoEdicion ? editarNombre : addNombre} className="form-group">
                        <input onChange={(e) => { setNombre(e.target.value) }} className="form-control mb-3 " type="text" placeholder="Introduce el nombre" value={nombre}></input>
                        <input className="btn btn-info btn-block" type="submit" placeholder={"Registrar nombre"} value={modoEdicion ? 'EDITAR NOMBRE' : 'REGISTRAR NOMBRE' } ></input>
                    </form>
                    {
                        error != null ? (
                            <div className="alert alert-danger">{error}</div>
                         ) : (
                            <div></div>     
                         )
                    }
                </div>
            </div>
        </div>
    )
}

export default ListaNombres
