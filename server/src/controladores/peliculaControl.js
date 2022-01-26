exports.create = (req, res) => {
  req.getConnection((errC, con) => {
    con.query("INSERT INTO movie_reviews set ?", [req.body], (err, result) => {
      console.log(err ? "Error al insertar " + err : "Datos agregados");
      res.json(
        err ? { err: "Error al guardar " } : { msg: "Datos almacenados" }
      );
    });
  });
};

exports.search = (req, res) => {
  req.getConnection((errC, con) => {
    con.query("SELECT * FROM movie_reviews", (err, result) => {
      console.log(
        err
          ? "Error al consultar."
          : "Consulta ok. Resultados: " + result.length
      );
      res.json(
        err ? { err: "Error al buscar " } : { msg: result.length, rows: result }
      );
    });
  });
};

exports.editar = (req, res) => {
  req.getConnection((errC, con) => {
    con.query(
      "UPDATE movie_reviews set ? WHERE id = ?",
      [req.body, req.params.id],
      (err, result) => {
        console.log(err ? "Error al actualiza " + err : "Actualizado");
        res.json(
          err ? { err: "Error al actualizar " } : { msg: "Actualizado" }
        );
      }
    );
  });
};

exports.eliminar = (req, res) => {
  req.getConnection((errC, con) => {
    con.query(
      "DELETE FROM movie_reviews WHERE id = ?",
      [req.params.id],
      (err, result) => {
        console.log(err ? "Error al eliminar " + err : "Eliminado");
        res.json(err ? { err: "Error al eliminar " } : { msg: "Elimiando" });
      }
    );
  });
};
