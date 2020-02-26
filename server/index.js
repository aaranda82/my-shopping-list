require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./database');
var knex = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL
});

app.get('/api/health-check', (req, res) => {
  try {
    db.query('select \'successfully connected\' as "message"')
      .then(result => res.json(result.rows[0]));
  } catch (error) {
    console.error(error);
  }
});

app.get('/api/items', async (req, res) => {
  try {
    const items = await knex('items').join('category', 'category.categoryid', '=', 'items.categoryid');
    res.json(items);
  } catch (error) {
    console.error(error);
  }
});

app.use(express.json());

app.get('/api/items/:category', async (req, res) => {
  const category = req.params.category;
  try {
    const categorySearchId = await knex('category').select('categoryid').where('category', '=', category);
    const itemSearch = await knex('items').where('categoryid', '=', categorySearchId[0].categoryid);
    res.json(itemSearch);
  } catch (error) {
    console.error(error);
  }
});

app.post('/api/items', async (req, res) => {
  let { item, category, quantity } = req.body;
  quantity = parseInt(quantity);
  try {
    const categorySearchId = await knex('category').select('categoryid').where('category', '=', category);
    if (categorySearchId.length === 0) {
      const categoryInsertId = await knex('category').insert({ category: category }, 'categoryid');
      const itemInsert = await knex('items').insert({
        item,
        categoryid: categoryInsertId[0],
        quantity
      }, 'itemid');
      const itemSearch = await knex('items').join('category', 'category.categoryid', '=', 'items.categoryid').where('itemid', '=', itemInsert[0]);
      res.json(itemSearch[0]);
    } else {
      const itemInsert = await knex('items').insert({
        item,
        categoryid: categorySearchId[0].categoryid,
        quantity
      }, 'itemid');
      const itemSearch = await knex('items').join('category', 'category.categoryid', '=', 'items.categoryid').where('itemid', '=', itemInsert[0]);
      res.json(itemSearch[0]);
    }
  } catch (error) {
    console.error(error);
  }
});

app.delete('/api/items/:id', async (req, res) => {
  try {
    const itemToDelete = await knex('items').where('itemid', '=', req.params.id).del();
    res.json(req.params.id);
  } catch (error) {
    console.error(error);
  }
});

app.put('/api/items/:id', async (req, res) => {
  let { item, category, quantity } = req.body;
  quantity = parseInt(quantity);
  const id = req.params.id;
  try {
    const categorySearchId = await knex('category').select('categoryid').where('category', '=', category);
    if (categorySearchId.length === 0) {
      const categoryInsertId = await knex('category').insert({ category }, 'categoryid');
      const itemToUpdate = await knex('items').where('itemid', '=', id).update({
        item,
        quantity,
        categoryid: categoryInsertId[0]
      });
    } else {
      const itemToUpdate = await knex('items').where('itemid', '=', id).update({
        item,
        quantity,
        categoryid: categorySearchId[0].categoryid
      });
    }
    const itemSearch = await knex('items').join('category', 'category.categoryid', '=', 'items.categoryid').where('itemid', '=', id);
    res.json(itemSearch[0]);
  } catch (error) {
    console.error(error);
  }
});

app.listen(3002, () => {
  // eslint-disable-next-line no-console
  console.log('Express Server Listening on Port 3002');
});
