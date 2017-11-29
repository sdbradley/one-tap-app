import { Component, Children } from 'react';

function matches(a, b) {
  if (a === b) {
    return true;
  }
  if (a instanceof Array && b instanceof Array) {
    return listsMatch(a, b);
  }
  if (typeof a === 'function') {
    return typeof b === 'function';
  }
  if (a instanceof Object && b instanceof Object) {
    return objectsMatch(a, b);
  }
  return false
}

function listsMatch(a, b) {
  return a.length === b.length && !a.find((item, i) => !objectsMatch(item, b[i]))
}

function objectsMatch(a, b) {
  if (!a || !b) return false;
  let keys = Object.keys(a)
  return keys.length === Object.keys(b).length && !keys.find(prop => !matches(a[prop], b[prop]))
}

export default class Options extends Component {
  constructor(props) {
    super(props);
    this.getOption = this.getOption.bind(this);
    this.renderOptions = this.renderOptions.bind(this);
    this.renderOption = this.renderOption.bind(this);
    this.state = this.inferState(props);
  }

  componentWillUpdate(nextProps) {
    let inferred = this.inferState(nextProps);
    if (!matches(inferred, this.inferState(this.props))) {
      this.setState(inferred);
    }
  }

  inferState(props) {
    let options = this.getOptions(props);
    let selected = options.find(option => props.value ? props.value === option.value : option.default) || this.getNullOption();
    return {
      options,
      selected: selected
    };
  }

  getOptions(props) {
    return Children.map(props.children, this.getOption);
  }

  getNullOption() {
    return {
      id: null,
      label: '',
      value: '',
      default: false,
    }
  }

  getOption(optionEl, i) {
    return {
      ...optionEl.props,
      id: i,
      label: optionEl.props.children || optionEl.props.label,
      value: optionEl.props.value,
      default: optionEl.props.default || false,
      disabled: optionEl.props.disabled || this.props.uneditable,
      handleClick: () => this.handleClick(i, optionEl.props.value)
    };
  }

  handleClick(id, value) {
    if (this.state.selected.id === id) return;

    if (this.state.options[id].value === this.props.onChange(value)) {
      this.setState({ selected: this.state.options[id]});
    }
  }

  render() {
    return this.props.render({
      options: this.state.options,
      selected: this.state.selected,
      renderOptions: this.renderOptions
    });
  }

  renderOptions() {
    return this.state.options.map(this.renderOption);
  }

  renderOption(option, key) {
    return this.props.renderOption({
      ...option,
      isSelected: option === this.state.selected || option.fakeSelect
    });
  }
}
