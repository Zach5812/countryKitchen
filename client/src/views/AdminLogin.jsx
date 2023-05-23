import React from 'react'
import Form from '../components/LoginForm'

const AdminLogin = () => {
    return (
        <main className="row justify-content-center">
            <Form
                name="Register"
                action="users"
                fields={{
                    username: "text",
                    password: "password",
                    confirmPassword: "password"
                }}
            />
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