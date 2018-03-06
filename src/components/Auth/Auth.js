import React from 'react'
import PropTypes from 'prop-types'

import { config } from 'aws-cognito-redux-saga'

class Auth extends React.Component {
    static propTypes = {
        getUser: PropTypes.func
    }

    componentWillMount() {
        config.config.set({
            region: 'us-east-1',
            IdentityPoolId: '',
            UserPoolId: 'us-east-1_8ahmoXgPs',
            ClientId: '7id4ntt6iavdok56k1ed8ae7ik'
        })

        this.props.getUser()
    }

    render() {
        return null
    }
}

export default Auth