/**
 * ImpresorasController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  getAll: function(req, res) {
    Impresora.find().exec(function(err, impresoras) {
      if (err) {
        return res.serverError(err);
      }
      return res.json(impresoras);
    });
  },

  getByID: async function(req, res) {
   
    try {
      const idImpresora = req.params.id;
  
      const [result] = await db.query(`SELECT * FROM impresora WHERE id = '${idImpresora}'`);
      const impresora = result[0];
  
      let nivelesTinta = {
        negro: impresora.negro - 2,
        amarillo: impresora.amarillo - 2,
        cyan: impresora.cyan - 2,
        magenta: impresora.magenta - 2,
        idImpresora: idImpresora
      };
  
      if (nivelesTinta.negro < 0 || nivelesTinta.amarillo < 0 || nivelesTinta.cyan < 0 || nivelesTinta.magenta < 0) {
        res.status(400).send('Los niveles de tinta no pueden ser negativos.');
        return;
      }        
  
      await db.query(
        `UPDATE impresora SET negro = ${nivelesTinta.negro}, amarillo = ${nivelesTinta.amarillo}, cyan = ${nivelesTinta.cyan}, magenta = ${nivelesTinta.magenta} WHERE id = '${nivelesTinta.idImpresora}'`
      );
  
      const updatedImpresora = {
        id: idImpresora,
        negro: impresora.negro - 2,
        amarillo: impresora.amarillo - 2,
        cyan: impresora.cyan - 2,
        magenta: impresora.magenta - 2,
      };
  
      res.json(updatedImpresora);
    } catch (error) {
      console.log(error);
      res.status(500).send('Error al actualizar la impresora.');
    }
  }
  

};
    
