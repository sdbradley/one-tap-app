import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import SGButton from 'components/shared/button/button';
import '../css/admin.scss';

class UserDetailForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        id: props.user.id,
        first_name: props.user.firstName || '',
        last_name: props.user.lastName || '',
        email: props.user.email || '',
        password: '',
        password_confirmation: '',
        prefix: props.user.prefix || '',
        is_validated: props.user.isValidated || false
      },
      role_id: props.role.id,
      school_id: props.school_id
    };

    this._handleUserInputChange = this._handleUserInputChange.bind(this);
    this._handleRoleInputChange = this._handleRoleInputChange.bind(this);
    this._handleSaveClick = this._handleSaveClick.bind(this);
    this._handleCancelClick = this._handleCancelClick.bind(this);
  }

  componentWillUpdate(nextProps) {
    if ((nextProps.role && nextProps.role.id !== this.state.role_id) || (nextProps.school_id !== this.state.school_id)) {
      this.setState({
        role_id: nextProps.role.id,
        school_id: nextProps.school_id
      })
    }
  }

  _handleRoleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
        [name]: value
    });
  }
  _handleUserInputChange(event) {
    const target = event.target;
    const user = this.state.user;
    const name = target.name;
    const value = name === 'is_validated' ?  !user[name] : target.value;

    user[name] = value;
    this.setState({
        user
    });
  }
  _handleSaveClick(e) {
      e.preventDefault();
      var data = this.state;
      if(!data.user.id) {
          this.props.onCreate(data);
      } else {
          this.props.onUpdate(data);
      }
  }
  _handleCancelClick(e) {
      e.preventDefault();
      hashHistory.goBack();
  }

  render() {
    return (
        <div className="Container Container--padded">
          <form>
            <div className="Container Container--form Container--admin">
                <div className="Container--form-input">
                    <label>
                    First Name:
                    <input type="text" className="SG-input SG-input--admin" name="first_name" value={this.state.user.first_name} onChange={this._handleUserInputChange} />
                    </label>
                </div>
                <div className="Container--form-input">
                    <label>
                    Last Name:
                    <input type="text" className="SG-input SG-input--admin" name="last_name" value={this.state.user.last_name} onChange={this._handleUserInputChange} />
                    </label>
                </div>
                <div className="Container--form-input">
                    <label>
                    Email:
                    <input type="email" className="SG-input SG-input--admin" name="email" value={this.state.user.email} onChange={this._handleUserInputChange} />
                    </label>
                </div>
                <div className="Container--form-input">
                    <label>
                    Validated:
                    <input type="checkbox" className="SG-input SG-input--admin" name="is_validated" checked={this.state.user.is_validated} onChange={this._handleUserInputChange} />
                    </label>
                </div>
                <div className="Container--form-input">
                    <label>
                    Password:
                    <input type="password" className="SG-input SG-input--admin" name="password" value={this.state.user.password} onChange={this._handleUserInputChange} />
                    </label>
                </div>
                <div className="Container--form-input">
                    <label>
                    Password Confirmation:
                    <input type="password" className="SG-input SG-input--admin" name="password_confirmation" value={this.state.password_confirmation} onChange={this._handleUserInputChange} />
                    </label>
                </div>
                {!this.props.role && this.props.roles &&
                <div className="Container--form-input">
                    <label>
                    Role:<br/>
                    <select name="role_id" className="SG-input SG-input--admin SG-input--select" value={this.state.role_id} onChange={this._handleRoleInputChange}>
                      {this.props.roles.map((role) => {
                        return (<option key={role.id} value={role.id}>{role.name}</option>)
                      })}
                    </select>
                    </label>
                </div>
                }
            </div>
            <div className="SGButton--container">
                <SGButton
                    classOverride="SGButton--action"
                    buttonText="Save"
                    onClick={this._handleSaveClick}
                />
                <SGButton
                    classOverride="SGButton--action SGButton--action-cancel"
                    buttonText="Cancel"
                    onClick={this._handleCancelClick}
                />
            </div>
          </form>
        </div>
    );
  }

}

export default UserDetailForm;
