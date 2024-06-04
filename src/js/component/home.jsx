import React, { useEffect, useState } from "react";

const Home = () => {
  const [tareas, setTareas] = useState([]);
  const [name, setName] = useState("Jorge_Enrique");
  const [label, setLabel] = useState("");
  const [isDone, setIsDone] = useState(false);

  // Método GET para obtener array con todas las tareas existentes para mi usuario
  const getAllData = async () => {
    try {
      const response = await fetch(`https://playground.4geeks.com/todo/users/${name}`);
      if (response.ok) {
        const dataJson = await response.json();
        setTareas(Array.isArray(dataJson.todos) ? dataJson.todos : []);
        console.log("Datos obtenidos:", dataJson.todos);
      } else {
        console.error("Error al recuperar datos:", response.statusText);
      }
    } catch (error) {
      console.error("Error al recuperar datos:", error);
    }
  };

  // Método POST para añadir nuevas tareas al array de mi usuario
  const createNewElement = async (event) => {
    event.preventDefault();
    const newTask = { label, done: isDone };
    try {
      const response = await fetch(`https://playground.4geeks.com/todo/todos/${name}`, {
        method: 'POST',
        body: JSON.stringify(newTask),
        headers: { "Content-Type": "application/json" }
      });

      if (response.ok) {
        const dataJson = await response.json();
        setTareas([...tareas, dataJson]);
        console.log("Tarea creada:", dataJson);
      } else {
        console.error("Error al crear tarea:", response.statusText);
      }
    } catch (error) {
      console.error("Error al crear tarea:", error);
    }
  };

  // Método DELETE para eliminar una tarea específica con un botón
  const deleteElement = async (todoId) => {
    try {
      const response = await fetch(`https://playground.4geeks.com/todo/todos/${todoId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setTareas(tareas.filter((item) => item.id !== todoId));
        console.log("Tarea eliminada:", todoId);
      } else {
        console.error("Error al eliminar tarea:", response.statusText);
      }
    } catch (error) {
      console.error("Error al eliminar tarea:", error);
    }
  };

  // Método DELETE para eliminar TODAS las tareas del array de mi usuario
  const deleteAllElements = async () => {
    try {
      // 1.-Envío DELETE para cada tarea con mapeo y el "id" dinámico
      const deletePromises = tareas.map((item) => 
        fetch(`https://playground.4geeks.com/todo/todos/${item.id}`, { method: 'DELETE' })
      );
      
      // 2.- Esperar a que todas las peticiones DELETE se completen
      await Promise.all(deletePromises);

      // 3.- Actualizar el array de "tareas"
      setTareas([]);
      console.log("Todas las tareas han sido eliminadas");
    } catch (error) {
      console.error("Error al eliminar todas las tareas:", error);
    }
  };

  useEffect(() => {
    getAllData();
  }, []);

  useEffect(() => {
    setLabel("");
  }, [tareas]);

  return (
    <div className="row m-auto py-2">
      <form onSubmit={createNewElement}>
        <div className="mb-3">
          <label className="form-label"><strong>Listado de tareas</strong></label>
          <input
            placeholder="Añade tu nueva tarea"
            value={label}
            className="form-control"
            aria-describedby="emailHelp"
            onChange={(event) => setLabel(event.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-info mb-3">¡La anoto para no olvidarla!</button>
      </form>
	  <div className="w-100 m-auto">
        <ol>
          {tareas.map((item, index) => (
            <li key={index}>
              {item.label}
              <button
                className="btn btn-success btn-sm ms-2"
                onClick={() => deleteElement(item.id)}
              >
                ¡Hecho!
              </button>
            </li>
          ))}
        </ol>
		<button 
          className="btn btn-warning text-danger my-3" 
          onClick={deleteAllElements}
        ><strong>Completar todas las tareas</strong>
        </button>
      </div>
    </div>
  );
};

export default Home;