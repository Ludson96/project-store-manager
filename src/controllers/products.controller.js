const { productsService } = require('../services');

const findAll = async (_req, res) => {
  const { message } = await productsService.findAll();
  // if (type) return res.status(404).json({ message: 'Product not found ' });
  res.status(200).json(message);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.findById(id);
  if (type) return res.status(404).json({ message: 'Product not found' });
  res.status(200).json(message);
};

const insert = async (req, res) => {
  const { name } = req.body;
  const { message } = await productsService.insert(name);
  // if (type) return res.status(404).json({ message: 'Product not found' });
  res.status(201).json(message);
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const { type, message } = await productsService.updateById(name, id);
  if (type) return res.status(404).json({ message: 'Product not found' });
  return res.status(200).json(message);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const { type } = await productsService.deleteById(id);
  if (type) return res.status(404).json({ message: 'Product not found' });
  return res.status(204).json({ message: 'Produto deletado com sucesso' });
};

const search = async (req, res) => {
  const { q } = req.query;
  const { message } = await productsService.search(q);
  return res.status(200).json(message);
};

module.exports = {
  findAll,
  findById,
  insert,
  updateById,
  deleteById,
  search,
};