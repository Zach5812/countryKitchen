import React from 'react'
import Form from '../components/LoginForm'

const AdminLogin = () => {
    return (
        <main className="row justify-content-center">
            <Form
                name="Login"
                action="auth"
                fields={{
                    username: "text",
                    password: "password"
                }}

            />
        </main>
    )
}

export default AdminLogin