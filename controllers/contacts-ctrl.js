const { contactsService } = require('../services');

const getAll = async (req, res) => {
  const contacts = await contactsService.getAllEntities(
    req.user._id,
    req.query
  );
  res.status(200).json(contacts);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await contactsService.getItemById(contactId, req.user._id);
  res.status(200).json(contact);
};

const add = async (req, res) => {
  const newContact = await contactsService.addItem(req.body, req.user._id);
  res.status(201).json(newContact);
};

const remove = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsService.removeItemById(contactId, req.user._id);
  res.status(200).json(result);
};

const update = async (req, res) => {
  const { contactId } = req.params;
  const updatedContact = await contactsService.updateItemById(
    contactId,
    req.body,
    req.user._id
  );
  res.status(200).json(updatedContact);
};

module.exports = {
  getAll,
  getById,
  add,
  remove,
  update,
};
