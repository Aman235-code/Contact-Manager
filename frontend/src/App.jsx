import { useState, useEffect } from "react";
import ContactForm from "./ContactForm";
import ContactList from "./ContactList";
import "./App.css";

function App() {
  const [contacts, setcontacts] = useState([]);
  const [isModalOpen, setisModalOpen] = useState(false);
  const [currentContact, setcurrentContact] = useState({});
  useEffect(() => {
    fetchContacts();
  }, []);
  const fetchContacts = async () => {
    const response = await fetch("http://127.0.0.1:5000/contacts");
    const data = await response.json();
    setcontacts(data.contacts);
    console.log(data.contacts);
  };

  const closeModal = () => {
    setisModalOpen(false);
    setcurrentContact({});
  };

  const openCreateModal = () => {
    if (!isModalOpen) {
      setisModalOpen(true);
    }
  };

  const openEditModal = (contact) => {
    if (isModalOpen) return;
    setcurrentContact(contact);
    setisModalOpen(true);
  };

  const onUpdate = () => {
    closeModal();
    fetchContacts();
  };
  return (
    <>
      <ContactList
        contacts={contacts}
        updateContact={openEditModal}
        updateCallback={onUpdate}
      />
      <button onClick={openCreateModal}>Create New Contact</button>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <ContactForm
              existingContact={currentContact}
              updateCallback={onUpdate}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default App;
