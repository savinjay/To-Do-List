import * as React from 'react';
import { Box, Paper, Typography, TextField, Button, List, ListItem, ListItemText, Checkbox, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function TodoList() {
    const [task, setTask] = React.useState('');
    const [tasks, setTasks] = React.useState(() => {
        // Load tasks from localStorage on initial render
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : [];
    });

    const handleAddTask = () => {
        if (task.trim()) {
            const newTasks = [...tasks, { text: task, completed: false }];
            setTasks(newTasks);
            setTask('');
            // Save tasks to localStorage
            localStorage.setItem('tasks', JSON.stringify(newTasks));
        }
    };

    const handleToggleComplete = (index) => {
        const newTasks = tasks.map((task, i) =>
            i === index ? { ...task, completed: !task.completed } : task
        );
        setTasks(newTasks);
        // Save tasks to localStorage
        localStorage.setItem('tasks', JSON.stringify(newTasks));
    };

    const handleDeleteTask = (indexToDelete) => {
        const newTasks = tasks.filter((_, index) => index !== indexToDelete);
        setTasks(newTasks);
        // Save tasks to localStorage
        localStorage.setItem('tasks', JSON.stringify(newTasks));
    };

    return (
        <Box component="section" sx={{
            height: 'auto', minHeight:'100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'linear-gradient(180deg, black, red)', // Gradient background
        }}>
            <Paper sx={{
                p: 3, width: '80%', maxWidth: 500,
                py: 10,
                px: 20,
                backgroundColor: 'white',
                textAlign: 'center',
                borderRadius: 10,
                boxShadow: '0px 0px 50px rgba(0, 0, 0, 0.76)',
                color: 'black',
            }}>
                <Typography variant="h5" gutterBottom sx={{ color: 'black' }}>
                    To-do List
                </Typography>
                <TextField
                    label="New Task"           
                    variant="outlined"
                    fullWidth
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    sx={{ mb: 2,}}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddTask}
                    sx={{borderRadius: 10, width: '100%'}}
                >
                    Add Task
                </Button>
                <Paper
                    sx={{
                        p: 0,
                        mt: 1,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        border: '1px solid #ccc',
                        borderRadius: 4,
                        // backgroundColor: '#f0f0f0',
                        // cursor: 'pointer',
                        // '&:hover': {
                        //     backgroundColor: '#ccc',
                        // },
                        '&:active': {
                            backgroundColor: '#ccc',
                        },
                        '&:focus': {
                            outline: 'none',
                        },
                        '&:focus-visible': {
                            outline: '2px dotted #000',
                        },
                        '&:focus-within': {
                            outline: '2px solid #000',
                        },
                        '&:focus-visible:active': {
                            outline: '2px solid #000',
                        },
                        '&:focus-within:active': {
                            outline: '2px solid #000',
                        },
                    }}>
                    <List sx={{ marginTop: 2 }}>
                        {tasks.map((task, index) => (
                            <ListItem key={index} secondaryAction={
                                <IconButton color='error' edge="end" aria-label="delete" onClick={() => handleDeleteTask(index)}>
                                    <DeleteIcon />
                                </IconButton>
                            }>
                                <Checkbox
                                    checked={task.completed}
                                    onChange={() => handleToggleComplete(index)}
                                />
                                <ListItemText
                                    primary={task.text}
                                    sx={{ textDecoration: task.completed ? 'line-through' : 'none' }}
                                />
                            </ListItem>
                        ))}
                    </List></Paper>
            </Paper>
        </Box>
    );
}