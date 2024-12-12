const Category = require('../models/Category');

const getCategories = async (req, res) => {
  const { limit = 12, page = 1, fields, use_in_menu } = req.query;
  const limitValue = parseInt(limit);
  const pageValue = parseInt(page);
  const offset = (pageValue - 1) * limitValue;

  const where = {};
  if (use_in_menu !== undefined) {
    where.use_in_menu = use_in_menu === 'true';
  }

  const attributes = fields ? fields.split(',') : null;

  try {
    const { count, rows } = await Category.findAndCountAll({
      where,
      attributes,
      limit: limitValue === -1 ? null : limitValue,
      offset: limitValue === -1 ? null : offset,
    });

    res.status(200).json({
      data: rows,
      total: count,
      limit: limitValue,
      page: pageValue,
    });
  } catch (error) {
    res.status(400).json({ message: 'Erro ao buscar categorias', error });
  }
};

const getCategoryById = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ message: 'Categoria não encontrada' });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar categoria', error });
  }
};

const createCategory = async (req, res) => {
  const { name, slug, use_in_menu } = req.body;

  try {
    const newCategory = await Category.create({ name, slug, use_in_menu });
    res.status(201).json({ message: 'Categoria criada com sucesso', category: newCategory });
  } catch (error) {
    res.status(400).json({ message: 'Erro ao criar categoria', error });
  }
};

const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, slug, use_in_menu } = req.body;

  try {
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ message: 'Categoria não encontrada' });
    }

    await Category.update(
      { name, slug, use_in_menu },
      { where: { id } }
    );
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: 'Erro ao atualizar categoria', error });
  }
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ message: 'Categoria não encontrada' });
    }

    await Category.destroy({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar categoria', error });
  }
};

module.exports = { getCategories, getCategoryById, createCategory, updateCategory, deleteCategory };
