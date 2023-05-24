import React from 'react'
import Form from '../components/LoginForm'
import { Paper } from '@mui/material'

const AdminLogin = () => {
    return (
        <div className="Body">
        <Paper id="Mat">
            <Form
                name="Login"
                action="auth"
                fields={{
                    username: "text",
                    password: "password"
                }}

            />
        </Paper>
        </div>
    )
}

export default AdminLogin