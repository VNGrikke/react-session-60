import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import TaskInput from './TaskInput';
import Filter from './Filter';
import TaskList from './TaskList';
import Footer from './Footer';

interface Task {
  id: number;
  name: string;
  completed: boolean;
}

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:8080/task-list');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const addTask = async (task: string) => {
    try {
      const response = await axios.post('http://localhost:8080/task-list', { name: task, completed: false });
      setTasks([...tasks, response.data]);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const toggleTask = async (id: number) => {
    try {
      const task = tasks.find(t => t.id === id);
      if (task) {
        const response = await axios.patch(`http://localhost:8080/task-list/${id}`, { completed: !task.completed });
        setTasks(tasks.map(t => (t.id === id ? response.data : t)));
      }
    } catch (error) {
      console.error('Error toggling task:', error);
    }
  };

  const deleteTask = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/task-list/${id}`);
      setTasks(tasks.filter(t => t.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  // const updateTask = async (id: number) => {
  //   try {
  //     await axios.patch(`http://localhost:8080/task-list/${id}`);
  //     setTasks(tasks.filter(t => t.id !== id));


  //   } catch (error) {
  //     console.error('Error repair task:', error);
  //   }
  // }

  const clearCompletedTasks = async () => {
    try {
      await axios.delete('http://localhost:8080/task-list', { params: { completed: true } });
      setTasks(tasks.filter(task => !task.completed));
    } catch (error) {
      console.error('Error clearing completed tasks:', error);
    }
  };

  const clearAllTasks = async () => {
    try {
      await axios.delete('http://localhost:8080/task-list');
      setTasks([]);
    } catch (error) {
      console.error('Error clearing all tasks:', error);
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'active') return !task.completed;
    return true;
  });

  return (
    <div className="task-manager">
      <Header />
      <TaskInput addTask={addTask} />
      <Filter setFilter={setFilter} />
      <TaskList tasks={filteredTasks} toggleTask={toggleTask} deleteTask={deleteTask} />
      <Footer clearCompletedTasks={clearCompletedTasks} clearAllTasks={clearAllTasks} />
    </div>
  );
}
