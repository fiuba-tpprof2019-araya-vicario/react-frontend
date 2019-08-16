import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { clearAlert, getRequirements } from './requirementReducer'
import { Alert } from 'react-bootstrap'
import Title from '../../utils/Title'
import { requirementMessages } from '../../utils/messages'
import { withRouter } from 'react-router-dom'
import { RequirementTable } from './RequirementTable'

export class RequirementIndex extends React.Component {

  componentDidMount () {
    console.log('this.props', this.props)
    console.log('this.props.clearAlert', this.props.clearAlert)
    this.props.clearAlert()
    this.props.getRequirements()
  }

  render () {
    return (
      <Fragment>
        <Title
          title={requirementMessages.TITLE}
          subtitle={requirementMessages.SUBTITLE}
        />
        { this.renderTable() }
      </Fragment>
    )
  }

  renderTable () {
    if (this.props.requirements == null || this.props.requirements.length === 0) {
      return (<Fragment>
        <br />
        <Alert bsStyle='info'>La búsqueda no trajo resultados</Alert>
      </Fragment>)
    } else {
      return (
        <Fragment>
          <RequirementTable data={this.props.requirements} />
        </Fragment>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    requirements: state.requirementReducer.requirements
  }
}

const mapDispatch = dispatch => ({
  getRequirements: () => {
    dispatch(getRequirements())
  },
  clearAlert: () => {
    dispatch(clearAlert())
  }
})

export default withRouter(connect(mapStateToProps, mapDispatch)(RequirementIndex))
