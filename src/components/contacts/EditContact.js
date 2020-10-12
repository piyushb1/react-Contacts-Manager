import React, { Component } from 'react';
import { Consumer } from '../../context';
import axios from 'axios';
import TextInputGroup from '../layouts/TextInputGroup';

class EditContact extends Component {
  state = {
    name: '',
    email: '',
    phone: '',
    errors: '',
  };

  async componentDidMount() {
    const { id } = this.props.match.params;
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );

    const contact = res.data;
    this.setState({
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
    });
  }

  onSubmit = async (dispatch, e) => {
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

    const updContact = {
      name,
      email,
      phone
    }

    const { id } = this.props.match.params;

    const res = await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`,updContact);

    dispatch({type: 'UPDATE_CONTACT', payload: res.data});

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
                <h4>Edit Contact</h4>
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
                      value="Update Contact"
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

export default EditContact;
