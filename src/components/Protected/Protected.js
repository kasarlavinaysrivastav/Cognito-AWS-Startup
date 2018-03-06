import React from 'react'
import PropTypes from 'prop-types'

import { state } from 'aws-cognito-redux-saga'

const style = {
  page: {},
    layout: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'calc(100vh - 56px)'
    },
  heading: {
    textAlign: 'center',
    fontSize: '48px',
    margin: '64px'
  },
  label: {
    fontSize: '24px',
    margin: '8px 0',
    color: 'rgb(0,64,128)'
  },
  token: {
    overflow: 'auto',
    overflowWrap: 'break-word',
    fontSize: '16px',
    width: '90vw'
  }
}

export class ProtectedComponent extends React.Component {
  static propTypes = {
    isSignedIn: PropTypes.string,
    auth: PropTypes.object
  }

  renderAuthInfo(auth) {
    return (
      <div style={style.token}>
        <div style={style.label}>Logged in Successfully with SAML tocken</div>
      </div>
    )
  }

  render() {
    const { auth } = this.props

    return (
      <div style={style.page}>
        <div style={style.layout}>
          <div style={style.heading}>Landing Page</div>

          {auth.isSignedIn === state.AUTH_SUCCESS
            ? this.renderAuthInfo(auth)
            : null}
        </div>
      </div>
    )
  }
}
