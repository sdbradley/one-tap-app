import { connect } from 'react-redux';

function Righteous({ user, right, children }) {
  let render = !right || user.hasRight(right);
  return render ? children : null;
}

export default connect(state => ({user: state.authentication.user}))(Righteous);
