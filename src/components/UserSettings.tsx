import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const UserSettings: React.FC = () => {
    const { user } = useAuth();
    const [targetCalories, setTargetCalories] = useState('');

    useEffect(() => {
        const fetchTargetCalories = async () => {
            if (user) {
                const userDocRef = doc(db, 'userSettings', user.uid);
                const userDocSnap = await getDoc(userDocRef);
                if (userDocSnap.exists()) {
                    setTargetCalories(userDocSnap.data().targetCalories.toString());
                }
            }
        };
        fetchTargetCalories();
    }, [user]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (user) {
            const userDocRef = doc(db, 'userSettings', user.uid);
            await setDoc(userDocRef, { targetCalories: parseInt(targetCalories) }, { merge: true });
            alert('目標カロリーが更新されました');
        }
    };

    return (
        <Box mt={4}>
            <Typography variant="h5" component="h2" gutterBottom>
                目標カロリー設定
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="目標カロリー"
                    type="number"
                    value={targetCalories}
                    onChange={(e) => setTargetCalories(e.target.value)}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                />
                <Button type="submit" variant="contained" color="primary">
                    保存
                </Button>
            </form>
        </Box>
    );
};

export default UserSettings;