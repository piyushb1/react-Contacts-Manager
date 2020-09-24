import React, { Component } from 'react';
import { Consumer } from '../../context';
import { v4 as uuidv4 } from 'uuid';
import TextInputGroup from '../layouts/TextInputGroup';

class AddContact extends Component {
  state = {
    name: '',
    email: '',
    phone: '',
    errors: '',
  };

  onSubmit = (dispatch, e) => {
    e.preventDefault();

    const { name, email, phone } = this.state;

    if (name === '') {
      this.setState({ errors: { name: 'Name is required' } });
      return;
    }
    if (email === '') {
      this.setState({ errors: { email: 'Email is required' } });
      return;
    }
    if (phone === '') {
      this.setState({ errors: { phone: 'Phone is required' } });
      return;
    }

    const newContact = {
      id: uuidv4(),
      name,
      email,
      phone,
    };

    dispatch({ type: 'ADD_CONTACT', payload: newContact });

    this.setState({
      name: '',
      email: '',
      phone: '',
      errors: {},
    });

    this.props.history.push('/');
  };

  onNameChange = (e) => this.setState({ name: e.target.value });
  onEChange = (e) => this.setState({ email: e.target.value });
  onChange = (e) => this.setState({ phone: e.target.value });

  render() {
    const { name, email, phone, errors } = this.state;

    return (
      <Consumer>
        {(value) => {
          const { dispatch } = value;
          return (
            <div className="card mb-3">
              <div className="card-header">
                <h4>Add Contact</h4>
              </div>
              <div className="card-body">
                <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                  <TextInputGroup
                    label="Name"
                    name="name"
                    placeholder="Enter Name.."
                    value={name}
                    onChange={this.onNameChange}
                    error={errors.name}
                  />

                  <TextInputGroup
                    label="Email"
                    name="email"
                    placeholder="Enter Email.."
                    value={email}
                    onChange={this.onEChange}
                    type="email"
                    error={errors.email}
                  />

                  <TextInputGroup
                    label="Phone"
                    name="phone"
                    placeholder="Enter Phone.."
                    value={phone}
                    onChange={this.onChange}
                    error={errors.phone}
                  />

                  <div>
                    <input
                      type="submit"
                      value="Add Contact"
                      className="btn btn-dark btn-block"
                    />
                  </div>
                </form>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default AddContact;
