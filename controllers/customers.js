const joi = require("joi");
const database = require("./database");

module.exports = {
  getAllcustomers: async function (req, res, next) {
    const sql = "SELECT * FROM costumers";

    try {
      const result = await database.query(sql);
      res.json(result[0]);
    } catch (err) {
      console.log(err);
      res.json(err);
    }
  },

  deleteCustomers: async function (req, res, next) {
    const sql = "DELETE * FROM costumers WHERE id=?";

    try {
      const result = await database.query(sql);
      res.json(result[0]);
    } catch (err) {
      console.log(err);
      res.json(err);
    }
  },

  addCustomer: async function (req, res, next) {
    const reqBody = req.body;

    const schema = joi.object({
      first_name: joi.string().required().min(2).max(200),
      first_name: joi.string().required().min(2).max(200),
      phone: joi
        .string()
        .required()
        .regex(/^[0-9]{8,11}$/),
      email: joi
        .string()
        .required()
        .regex(/^[^@]+@[^@]+$/),
    });

    const { error, value } = schema.validate(reqBody);

    if (error) {
      res.send(`error adding customer: ${error}`);
      return;
    }

    const sql =
      "INSERT INTO costumers(first_name,last_name, phone, email)" +
      " VALUES(?,?,?,?);";

    try {
      const result = await database.query(sql, [
        value.first_name,
        value.last_name,
        value.phone,
        value.email,
      ]);

      value.id = result[0].insertId;
      res.json(value);
    } catch (err) {
      console.log(err);
      return;
    }
  },
};
