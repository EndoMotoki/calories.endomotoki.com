import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button, TextField, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Auth: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login, signup } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            await login(email, password);
            navigate('/tracker');
        } catch (error) {
            console.error('Login error:', error);
            setError('ログインに失敗しました。メールアドレスとパスワードを確認してください。');
        }
    };

    const handleSignup = async () => {
        try {
            await signup(email, password);
            navigate('/tracker');
        } catch (error) {
            console.error('Signup error:', error);
            setError('新規登録に失敗しました。別のメールアドレスを試してください。');
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4">カロリートラッカー</Typography>
            {error && <Typography color="error">{error}</Typography>}
            <TextField
                label="メールアドレス"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="パスワード"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                margin="normal"
            />
            <Button onClick={handleLogin} variant="contained" color="primary">
                ログイン
            </Button>
            <Button onClick={handleSignup} variant="contained" color="secondary">
                新規登録
            </Button>
        </Container>
    );
};

export default Auth;