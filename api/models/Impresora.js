/**
 * Impresora.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    id: { type: 'string', required: true, unique: true },
    negro: {type: 'number', required: true},
    amarillo: {type: 'number', required: true},
    cyan: {type: 'number', required: true},
    magenta: {type: 'number', required: true},
  },

};

