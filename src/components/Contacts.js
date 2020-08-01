import React, { Component } from 'react';
import Contact from './Contact';

class Contacts extends Component {
  state = {
    contacts: [
      {
        id: 1,
        name: 'Hojn',
        email: 'jd@gmail.com',
        phone: '8383-3393-333',
      },
      {
        id: 2,
        name: 'dsdsd',
        email: 'sdsdsd@gmail.com',
        phone: '9164-3393-333',
      },
      {
        id: 3,
        name: 'cvcvcv',
        email: 'cvvc@gmail.com',
        phone: '9762-3393-333',
      },
    ],
  };

  render() {
    const { contacts } = this.state;

    return (
      <React.Fragment>
        {contacts.map((contact) => (
          <Contact key={contact.id} contact={contact} />
        ))}
      </React.Fragment>
    );
  }
}

export default Contacts;
