import { Record, List } from 'immutable';

const User = Record({
  isNull: false,
  isValidated: false,
  firstName: '',
  lastName: '',
  email: '',
  id: '',
  accountId: '',
  schools: List(),
  _rights: List(),
  _roles: List()
});

Object.assign(
  User.prototype,
  {
    hasRole(role) {
      return this._roles.includes(role);
    },

    hasRight(right) {
      return this._rights.includes(right);
    },

    hasSchool(schoolId) {
      return this.schools.includes(schoolId);
    },

    fullName() {
      return `${this.firstName} ${this.lastName}`;
    },

    toApi() {
      return {
        first_name: this.firstName,
        last_name: this.lastName,
        email: this.email,
        id: this.id,
        account_id: this.accountId,
        is_validated: this.isValidated
      };
    }
  }
);

User.NULL = User({
  isNull: true
});

User.fromApi = function deserialize(data, school_id) {
  let _roles = List(data.roles && data.roles.map(role => role.name));
  return User({
    id: data.id,
    accountId: data.account_id,
    firstName: data.first_name,
    lastName: data.last_name,
    email: data.email_address,
    _roles
  });
};

export default User;
