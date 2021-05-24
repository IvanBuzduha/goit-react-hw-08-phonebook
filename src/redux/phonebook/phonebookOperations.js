import axios from "axios";
import { contactsSelector } from "./contactsSelector";
import {
  addContact,
  deleteContact,
  getAllContacts,
  setError,
  setLoading,
} from "./phonebookActions";

const getAllContactsOperating = () => async (dispatch) => {
  dispatch(setLoading());
  try {
    const { data } = await axios.get(
      `https://phonebook-20-default-rtdb.firebaseio.com/contacts.json`
    );
    if (data) {
      const contacts = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));
      dispatch(getAllContacts(contacts));
    }
  } catch (error) {
    dispatch(setError(error.response.data.error));
  } finally {
    dispatch(setLoading());
  }
};
const addContactOperating = (contact) => async (dispatch, getState) => {
  const contacts = contactsSelector(getState());

  const isNameExist = contacts.find(
    (cont) => cont.name.toLowerCase() === contact.name.toLowerCase()
  );
  const isNumberExist = contacts.find((cont) => cont.number === contact.number);
  if (isNameExist) {
    dispatch(setError(`This name  ${isNameExist?.name} is already exist`));
    return;
  }
  if (isNumberExist) {
    dispatch(setError(`This number ${isNumberExist?.number} is already exist`));
    return;
  }
  dispatch(setLoading());
  try {
    const { data } = await axios.post(
      `https://phonebook-20-default-rtdb.firebaseio.com/contacts.json?auth=${
        getState().auth.token.idToken
      }`,
      contact
    );
    dispatch(addContact({ ...contact, id: data.name }));
  } catch (error) {
    dispatch(setError(error.response.data.error));
  } finally {
    dispatch(setLoading());
  }
};
const deleteContactOperating = (id) => async (dispatch, getState) => {
  dispatch(setLoading());
  try {
    await axios.delete(
      `https://phonebook-20-default-rtdb.firebaseio.com/contacts/${id}.json?auth=${
        getState().auth.token.idToken
      }`
    );
    dispatch(deleteContact(id));
  } catch (error) {
    dispatch(setError(error.response.data.error));
  } finally {
    dispatch(setLoading());
  }
};

export { getAllContactsOperating, addContactOperating, deleteContactOperating };
