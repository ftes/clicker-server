import { connect } from 'react-redux'

const mapStateToProps = (state) => ({
  showSettings: state.showSettings,
})

const mapDispatchToProps = () => ({})

const ShowSettingsDependentC = connect(mapStateToProps, mapDispatchToProps)

export default ShowSettingsDependentC