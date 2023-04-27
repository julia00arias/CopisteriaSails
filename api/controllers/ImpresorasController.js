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

      const impresora = await Impresora.find({
        where: { id: idImpresora },
        limit: 1,
      });

      let nivelesTinta = {
        negro: impresora[0].negro - 2,
        amarillo: impresora[0].amarillo - 2,
        cyan: impresora[0].cyan - 2,
        magenta: impresora[0].magenta - 2,
        idImpresora: idImpresora
      };
  
      if (nivelesTinta.negro < 0 || nivelesTinta.amarillo < 0 || nivelesTinta.cyan < 0 || nivelesTinta.magenta < 0) {
        res.status(400).send('Los niveles de tinta no pueden ser negativos.');
        return;
      }

      await Impresora.update({ id: idImpresora }, {
        negro: nivelesTinta.negro,
        amarillo: nivelesTinta.amarillo,
        cyan: nivelesTinta.cyan,
        magenta: nivelesTinta.magenta
      });
  
      const updatedImpresora = {
        id: idImpresora,
        negro: impresora[0].negro,
        amarillo: impresora[0].amarillo,
        cyan: impresora[0].cyan,
        magenta: impresora[0].magenta,
      };
      
      res.json(updatedImpresora);
      
      console.log(updatedImpresora);
      res.json(updatedImpresora);
    } catch (error) {
      console.log(error);
      res.status(500).send('Error al actualizar la impresora.');
    }
  }

};
    
