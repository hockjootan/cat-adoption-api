const Cat = require("../models/cat");

const getAllCats = async (req, res) => {
  try {
    const cats = await Cat.findAll();
    res.status(200).json(cats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCatById = async (req, res) => {
  try {
    const cat = await Cat.findByPk(req.params.id);
    if (cat) {
      res.status(200).json(cat);
    } else {
      res.status(404).json({ message: "Cat not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createCat = async (req, res) => {
  try {
    const {
      name,
      age,
      breed,
      description,
      imageUrl,
      adoptionStatus,
      vaccinated,
      spayedNeutered,
      dewormed,
      gender,
    } = req.body;
    const newCat = await Cat.create({
      name,
      age,
      breed,
      description,
      imageUrl,
      adoptionStatus,
      vaccinated,
      spayedNeutered,
      dewormed,
      gender,
    });
    res.status(201).json(newCat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateCat = async (req, res) => {
  try {
    const {
      name,
      age,
      breed,
      description,
      imageUrl,
      adoptionStatus,
      vaccinated,
      spayedNeutered,
      dewormed,
      gender,
    } = req.body;
    const [updated] = await Cat.update(
      {
        name,
        age,
        breed,
        description,
        imageUrl,
        adoptionStatus,
        vaccinated,
        spayedNeutered,
        dewormed,
        gender,
      },
      { where: { id: req.params.id } }
    );
    if (updated) {
      const updatedCat = await Cat.findByPk(req.params.id);
      res.status(200).json(updatedCat);
    } else {
      res.status(404).json({ message: "Cat not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteCat = async (req, res) => {
  try {
    const deleted = await Cat.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.status(204).json({ message: "Cat deleted" });
    } else {
      res.status(404).json({ message: "Cat not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllCats,
  getCatById,
  createCat,
  updateCat,
  deleteCat,
};
