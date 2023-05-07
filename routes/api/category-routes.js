const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// Find all route
router.get('/', async (req, res) => {
  try {
    const category = await Category.findAll(
      {include: [Product]}
    );
    res.json(category)
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: `Internal server errror`});
  }
});

// Find specific category
router.get('/:id', async (req, res) => {
  const category = await Category.findOne({
    where: {
      id: req.params.id
    },
    include: [{
      model: Product
    }]
  })
  res.json(category)
});

// create a new category
router.post('/', async (req, res) => {
  try {
    const data = req.body;
    const result = await Category.create(data);
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({ error: 'Category not found'});
    }
    category.category_name = req.body.category_name;
    await category.save();
    res.status(200).json(category);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update category' });
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({ error: 'Category not found'});
    }
    await category.destroy();
    res.status(200).json({ message: 'Category deleted'})
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete category' });
  }
});

module.exports = router;
