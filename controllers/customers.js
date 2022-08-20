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

  addCustomer: async function (req, res, next) {
    const reqBody = req.body;

    const schema = joi.object({
      first_name: joi.string().required().min(2).max(200),
      last_name: joi.string().required().min(2).max(200),
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

  updateCustomer: async function (req, res, next) {
    const reqBody = req.body;

    const schema = joi.object({
      first_name: joi.string().required().min(2).max(200),
      last_name: joi.string().required().min(2).max(200),
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
      res.send(`error editing customer: ${error}`);
      return;
    }
    const keys = Object.keys(value);
    const values = Object.values(value);
    const fields = keys.map((key) => `${key}=?`).join(",");
    values.push(req.params.id);
    const sql = `UPDATE costumers SET ${fields} WHERE id=?`;

    try {
      const result = await database.query(sql, values);
      res.json(value);
    } catch (err) {
      console.log(err);
      return;
    }
  },
  deleteCustomers: async function (req, res, next) {
    const schema = joi.object({
      id: joi.number().required(),
    });

    const { error, value } = schema.validate(req.params);

    if (error) {
      res.status(400).send("error delete customer");
      console.log(error.details[0].message);
      return;
    }

    const sql = `DELETE FROM costumers WHERE id=?`;

    try {
      const result = await database.query(sql, [value.id]);
      res.json({
        id: value.id,
      });
    } catch (err) {
      res.status(400).send("error delete customer");
      console.log(err.message);
    }
  },
};
