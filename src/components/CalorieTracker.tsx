import React, { useState, useEffect } from 'react';
import { Typography, Container, Box } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import CalorieInput from './CalorieInput';
import UserSettings from './UserSettings';
import { db } from '../firebase';
import {
    collection,
    addDoc,
    query,
    where,
    orderBy,
    onSnapshot,
    doc,
    getDoc,
    setDoc,
    deleteDoc,
    getDocs
} from 'firebase/firestore';

const CalorieTracker: React.FC = () => {
    const { user } = useAuth();
    const [dailyCalories, setDailyCalories] = useState(0);
    const [targetCalories, setTargetCalories] = useState(2000);

    useEffect(() => {
        if (user) {
            const fetchDataAndResetIfNeeded = async () => {
                const userDocRef = doc(db, 'userSettings', user.uid);
                const userDocSnap = await getDoc(userDocRef);

                const today = new Date().toDateString();
                let lastAccessDate = today;

                if (userDocSnap.exists()) {
                    setTargetCalories(userDocSnap.data().targetCalories || 2000);
                    lastAccessDate = userDocSnap.data().lastAccessDate || today;
                }

                if (lastAccessDate !== today) {
                    // 日付が変わっているので、前日のデータを削除
                    const yesterdayQuery = query(
                        collection(db, 'calories'),
                        where('userId', '==', user.uid),
                        where('date', '==', lastAccessDate)
                    );
                    const yesterdayDocs = await getDocs(yesterdayQuery);
                    yesterdayDocs.forEach(async (doc) => {
                        await deleteDoc(doc.ref);
                    });

                    // 最終アクセス日を更新
                    await setDoc(userDocRef, { lastAccessDate: today }, { merge: true });
                }

                // 今日のカロリーデータを取得
                const todayQuery = query(
                    collection(db, 'calories'),
                    where('userId', '==', user.uid),
                    where('date', '==', today),
                    orderBy('timestamp', 'desc')
                );

                const unsubscribe = onSnapshot(todayQuery, (querySnapshot) => {
                    let total = 0;
                    querySnapshot.forEach((doc) => {
                        total += doc.data().amount;
                    });
                    setDailyCalories(total);
                });

                return () => unsubscribe();
            };

            fetchDataAndResetIfNeeded();
        }
    }, [user]);

    const addCalories = async (calories: number) => {
        if (user) {
            try {
                await addDoc(collection(db, 'calories'), {
                    userId: user.uid,
                    amount: calories,
                    date: new Date().toDateString(),
                    timestamp: new Date()
                });
            } catch (error) {
                console.error("Error adding calories: ", error);
            }
        }
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
            <UserSettings />
        </Container>
    );
};

export default CalorieTracker;