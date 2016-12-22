import { connect } from 'react-redux'

const mapStateToProps = (state) => ({
  showSettings: state.showSettings,
})

const mapDispatchToProps = () => ({})

export default (component) =>
  connect(mapStateToProps, mapDispatchToProps)(component)