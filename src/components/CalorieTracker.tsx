import React, { useState, useEffect } from 'react';
import { Typography, Container, Box } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import CalorieInput from './CalorieInput';

const CalorieTracker: React.FC = () => {
    const { user } = useAuth();
    const [dailyCalories, setDailyCalories] = useState(0);
    const [targetCalories, setTargetCalories] = useState(2000);

    useEffect(() => {
        // ユーザーのデータをFirebaseから取得する処理
    }, [user]);

    const addCalories = (calories: number) => {
        setDailyCalories(prevCalories => prevCalories + calories);
    };

    return (
        <Container maxWidth="md">
            <Box textAlign="center" my={4}>
                <Typography variant="h2" component="h1">
                    今日の摂取カロリー
                </Typography>
                <Typography variant="h1" component="p" style={{ fontSize: '6rem', fontWeight: 'bold' }}>
                    {dailyCalories} kcal
                </Typography>
                <Typography variant="h4" component="p">
                    目標まであと: {Math.max(0, targetCalories - dailyCalories)} kcal
                </Typography>
            </Box>
            <CalorieInput onAddCalories={addCalories} />
        </Container>
    );
};

export default CalorieTracker;