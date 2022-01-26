import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function App() {
  const [movieName, setMovieName] = useState("");
  const [review, setReview] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [id, setId] = useState("");
  const [modoEdicion, setModoEdicion] = useState(false);

  // This make the get
  useEffect(() => {
    buscar();
  }, []);

  // GET consulta a la base de datos
  const buscar = async () => {
    let res = await axios.get("http://localhost:3001/api/get/");
    setMovieList(res.data.rows);
  };

  const initialForm = () => {
    setMovieName("");
    setReview("");
  };

  const submit = () => {
    modoEdicion ? editar() : submitReview();
  };

  // POST envío a la base de datos
  const submitReview = async () => {
    let res = await axios.post("http://localhost:3001/api/insert/", {
      movieName: movieName,
      movieReview: review,
    });

    if (res.data.err) {
      Swal.fire(res.data.err);
    } else {
      Swal.fire(res.data.msg);
      buscar();
    }
  };

  // PUT actualiza la base de datos
  const editar = async () => {
    try {
      let res = await axios.put(`http://localhost:3001/api/put/${id}`, {
        movieName: movieName,
        movieReview: review,
      });
      if (res.data.err) {
        Swal.fire(res.data.err);
      } else {
        Swal.fire(res.data.msg);
        buscar();
      }
    } catch (err) {
      console.error = err;
    }
  };

  // DELETE elimina de la base de datos
  const eliminar = async (id) => {
    try {
      let res = await axios.delete(`http://localhost:3001/api/delete/${id}`);
      res.data.err ? alert(res.data.err) : buscar();
      if (res.data.err) {
        Swal.fire(res.data.err);
      } else {
        Swal.fire(res.data.msg);
        buscar();
      }
    } catch (err) {
      console.error = err;
    }
  };

  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <h1>CRUD </h1>
          <div className="col-4">
            {modoEdicion && (
              <button
                className="btn btn-warning"
                onClick={() => {
                  initialForm();
                  setModoEdicion(false);
                }}
              >
                Registrar
              </button>
            )}
          </div>
          <p>Segúndo CRUD usando REACT, NODE y MYSQL.</p>
          <div className="col-12">
            <form onSubmit={submit}>
              <div className="col-4">
                <label>Usuario:</label>
                <input
                  className="form-control"
                  type="text"
                  name="movieName"
                  value={movieName}
                  onChange={(e) => {
                    setMovieName(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="col-4">
                <label>Tarea:</label>
                <input
                  className="form-control"
                  type="text"
                  name="review"
                  value={review}
                  onChange={(e) => {
                    setReview(e.target.value);
                  }}
                  required
                />
              </div>

              <div className="col-4">
                <button className="btn btn-success form-control" type="submit">
                  {modoEdicion ? "Actualizar" : "Guardar"}
                </button>
              </div>
            </form>
          </div>
          <div className="col-12">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Acciones</th>
                  <th scope="col">#</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Referencia</th>
                </tr>
              </thead>
              <tbody>
                {movieList.map((item, index) => (
                  <tr key={index}>
                    <th>
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          setMovieName(item.movieName);
                          setReview(item.movieReview);
                          setId(item.id);
                          setModoEdicion(true);
                        }}
                      >
                        Editar
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => eliminar(item.id)}
                      >
                        Eliminar
                      </button>
                    </th>
                    <th>{item.id}</th>
                    <td>{item.movieName}</td>
                    <td>{item.movieReview}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
