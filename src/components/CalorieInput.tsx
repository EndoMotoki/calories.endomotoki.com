import React, { useState } from 'react';
import {Button, TextField, Typography, Container, Box} from '@mui/material';

interface CalorieInputProps {
    onAddCalories: (calories: number) => void;
}

const CalorieInput: React.FC<CalorieInputProps> = ({ onAddCalories }) => {
    const [calories, setCalories] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const caloriesNum = parseInt(calories);
        if (!isNaN(caloriesNum)) {
            onAddCalories(caloriesNum);
            setCalories('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Box display="flex" alignItems="center">
                <TextField
                    label="カロリー"
                    type="number"
                    value={calories}
                    onChange={(e) => setCalories(e.target.value)}
                    variant="outlined"
                    fullWidth
                />
                <Button type="submit" variant="contained" color="primary" style={{ marginLeft: 16 }}>
                    追加
                </Button>
            </Box>
        </form>
    );
};

export default CalorieInput;