import React, { useState } from "react";

//crear los estados que voy a implementar
const Home = () => {
	const [nuevaTarea,setNuevaTarea] = useState("")
	const [tareas, setTareas] = useState (["Make the bed", "Wash my Hands", "Eat", "Walk the dog"])

// crear la función manejadora
	const actualizarValorNuevaTarea = (event) => {
		// nueva tarea = event.target.value
		setNuevaTarea(event.target.value)
	}

	const adicionarNuevaTarea = (event) => {
		event.preventDefault()
		setTareas([...tareas, nuevaTarea])
		setNuevaTarea("")
	}

	const borrarElementos = (index) => {
		const arrayModificado = tareas.filter ((item, i) => i !== index)
		setTareas(arrayModificado)
	}

	return (
		<div className="container bg-light bg-gradient d-flex justify-content-center">
			<div className="w-100 m-3">
				<h2 className="text-center text-warning">todos</h2>
				<form onSubmit={adicionarNuevaTarea}>
					<div className="mb-3 w-100 d-flex">
						<input className="form-control border" id="exampleInputEmail1" placeholder="What needs to be done?" aria-describedby="emailHelp" value={nuevaTarea} onChange={actualizarValorNuevaTarea} />
						<button type="submit" className="btn btn-success">Create</button>
					</div>
					
				</form>
				<ul style={{listStyle:"none"}}>
					{ 
						tareas.map((item,index) => {
							return (<li className="border-bottom" key={index}>
							<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
							  <span>{item}</span>
							  <button className="btn btn-primary m-1 btn-light border-light" onClick={() => borrarElementos(index)}>X</button>
							</div>
						  </li>)})
					}
				</ul>
				{tareas.length === 0 ? (<span className="text-success">No tasks. Add a task</span>) : <span className="text-warning">{tareas.length} tasks remaining</span>}
			</div>
		</div>	
	);
};

export default Home;
