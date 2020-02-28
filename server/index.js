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
    const items = await knex('items').join('store', 'store.storeid', '=', 'items.storeid').orderBy('created_on', 'asc');
    res.json(items);
  } catch (error) {
    console.error(error);
  }
});

app.use(express.json());

app.get('/api/items/:store', async (req, res) => {
  const store = req.params.store;
  try {
    const categorySearchId = await knex('store').select('storeid').where('store', '=', store);
    const itemSearch = await knex('items').where('storeid', '=', categorySearchId[0].storeid);
    res.json(itemSearch);
  } catch (error) {
    console.error(error);
  }
});

app.post('/api/items', async (req, res) => {
  let { item, store, quantity } = req.body;
  quantity = parseInt(quantity);
  try {
    const categorySearchId = await knex('store').select('storeid').where('store', '=', store);
    if (categorySearchId.length === 0) {
      const categoryInsertId = await knex('store').insert({ store: store }, 'storeid');
      const itemInsert = await knex('items').insert({
        item,
        storeid: categoryInsertId[0],
        quantity
      }, 'itemid');
      const itemSearch = await knex('items').join('store', 'store.storeid', '=', 'items.storeid').where('itemid', '=', itemInsert[0]);
      res.json(itemSearch[0]);
    } else {
      const itemInsert = await knex('items').insert({
        item,
        storeid: categorySearchId[0].storeid,
        quantity
      }, 'itemid');
      const itemSearch = await knex('items').join('store', 'store.storeid', '=', 'items.storeid').where('itemid', '=', itemInsert[0]);
      res.json(itemSearch[0]);
    }
  } catch (error) {
    console.error(error);
  }
});

app.delete('/api/items/:id', async (req, res) => {
  try {
    await knex('items').where('itemid', '=', req.params.id).del();
    res.json(req.params.id);
  } catch (error) {
    console.error(error);
  }
});

app.put('/api/items/:id', async (req, res) => {
  const { item, store, quantity } = req.body;
  const id = parseInt(req.params.id);
  try {
    const categorySearchId = await knex('store').select('storeid').where('store', '=', store);
    if (categorySearchId.length === 0) {
      const categoryInsertId = await knex('store').insert({ store }, 'storeid');
      await knex('items').where('itemid', '=', id).update({
        item,
        quantity,
        storeid: categoryInsertId[0]
      });
    } else {
      await knex('items').where('itemid', '=', id).update({
        item,
        quantity,
        storeid: categorySearchId[0].storeid
      });
    }
    const itemSearch = await knex('items').join('store', 'store.storeid', '=', 'items.storeid').where('itemid', '=', id);
    res.json(itemSearch[0]);
  } catch (error) {
    console.error('** Error:', error);
  }
});

app.listen(3002, () => {
  // eslint-disable-next-line no-console
  console.log('Express Server Listening on Port 3002');
});
