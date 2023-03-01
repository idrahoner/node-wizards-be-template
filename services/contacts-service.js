const { ContactModel } = require('../models');
const {
  renameIdField,
  generateError,
  responseErrors,
  calculatePagination,
  constants,
} = require('../helpers');

const getAllEntities = async (
  owner,
  { page = 1, limit = 20, favorite = { $in: [true, false] } } = {}
) => {
  const contacts = await ContactModel.find(
    { owner, favorite },
    constants.DEFAULT_CONTACT_PROJECTION,
    calculatePagination({ page, limit })
  );
  return contacts.map((contact) => renameIdField(contact));
};

const getItemById = async (id, owner) => {
  const contact = await ContactModel.findOne(
    { _id: id, owner },
    constants.DEFAULT_CONTACT_PROJECTION
  );
  if (!contact) throw generateError(responseErrors.notFound);
  return renameIdField(contact);
};

const addItem = async ({ name, email, phone, favorite }, owner) => {
  const newContact = await ContactModel.create({
    name,
    email,
    phone,
    favorite,
    owner,
  });
  return {
    id: newContact._id,
    name: newContact.name,
    email: newContact.email,
    phone: newContact.phone,
    favorite: newContact.favorite,
  };
};

const removeItemById = async (id, owner) => {
  const contact = await ContactModel.findOneAndRemove({
    _id: id,
    owner,
  });
  if (!contact) throw generateError(responseErrors.notFound);
  return { message: 'Contact deleted' };
};

const updateItemById = async (id, body, owner) => {
  const { name, email, phone, favorite } = body;
  const updatedContact = await ContactModel.findOneAndUpdate(
    { _id: id, owner },
    {
      name,
      email,
      phone,
      favorite,
      owner,
    },
    constants.DEFAULT_UPDATE_OPTIONS
  ).select(constants.DEFAULT_CONTACT_PROJECTION);
  if (!updatedContact) throw generateError(responseErrors.notFound);
  return renameIdField(updatedContact);
};

module.exports = {
  getAllEntities,
  getItemById,
  addItem,
  removeItemById,
  updateItemById,
};
