import React, { useState, useEffect } from 'react';

const ContactForm = () => {
  const [contacts, setContacts] = useState([]);
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', phone: '' });
  const [editIndex, setEditIndex] = useState(-1);


  // locale storage get

  useEffect(() => {
    const storedContacts = JSON.parse(localStorage.getItem('contacts')) ;
    setContacts(storedContacts);
  }, []);


  //locale storage set

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex === -1) {
      setContacts([...contacts, formData]);
    } else {
      const updatedContacts = [...contacts];
      updatedContacts[editIndex] = formData;
      setContacts(updatedContacts);
      setEditIndex(-1); 
    }
    setFormData({ firstName: '', lastName: '', email: '', phone: '' });
  };


  const handleEdit = (index) => {
    setFormData(contacts[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedContacts = [...contacts];
    updatedContacts.splice(index, 1);
    setContacts(updatedContacts);
    setEditIndex(-1); 
  };

  return (
    <div>
      <h1 style={{textAlign:'center'}}>Contact List</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleInputChange} />
        <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleInputChange} />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} />
        <input type="tel" name="phone" placeholder="Phone" value={formData.phone} onChange={handleInputChange} />
        <button type="submit">{editIndex === -1 ? 'Add Contact' : 'Edit Contact'}</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact, index) => (
            <tr key={index}>
              <td>{contact.firstName}</td>
              <td>{contact.lastName}</td>
              <td>{contact.email}</td>
              <td>{contact.phone}</td>
              <td>
                <button onClick={() => handleEdit(index)}>Edit</button>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactForm;

