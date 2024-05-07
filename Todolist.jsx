import React, { useState, useEffect } from 'react';
import './TodoList.css';

function Todolist() {
    const [value, setValue] = useState(() => {
        const savedValue = localStorage.getItem('todoList');
        return savedValue ? JSON.parse(savedValue) : [];
    });
    const [newValue, setNewValue] = useState("");
    const [editingIndex, setEditingIndex] = useState(-1);
    const [editedValue, setEditedValue] = useState("");
    const [newDate, setNewDate] = useState("");
    const [editedDate, setEditedDate] = useState("");

    useEffect(() => {
        localStorage.setItem('todoList', JSON.stringify(value));
    }, [value]);

    function handle(e) {
        setNewValue(e.target.value);
    }

    function handleDate(e){
        setNewDate(e.target.value);
    }

    function addValue() {
        if (newValue.trim() !== "") {
            setValue([...value, {task: newValue, date: newDate}]);
            setNewValue("");
            setNewDate("");
        }
    }

    function editValue(idx) {
        setEditingIndex(idx);
        setEditedValue(value[idx].task);
        setEditedDate(value[idx].date);
    }

    function saveEditedValue(idx) {
        const updatedList = [...value];
        updatedList[idx] = {task: editedValue, date: editedDate};
        setValue(updatedList);
        setEditingIndex(-1);
    }

    function cancelEdit() {
        setEditingIndex(-1);
        setEditedValue("");
        setEditedDate("");
    }

    function removeValue(idx) {
        const removed = value.filter((_, i) => i !== idx);
        setValue(removed);
    }

    function moveUp(idx) {
        if (idx > 0) {
            const updatedList = [...value];
            [updatedList[idx], updatedList[idx - 1]] = [updatedList[idx - 1], updatedList[idx]];
            setValue(updatedList);
        }
    }

    function moveDown(idx) {
        if (idx < value.length - 1) {
            const updatedList = [...value];
            [updatedList[idx], updatedList[idx + 1]] = [updatedList[idx + 1], updatedList[idx]];
            setValue(updatedList);
        }
    }

    return (
        <div className="todo">
            <h1>To-Do List</h1>
            <div className='cont'>
                <input type="text" placeholder='Enter the Task' value={newValue} onChange={handle}></input>
                <input type="datetime-local" value={newDate} onChange={handleDate} className='date' ></input>
                <button className='btn' onClick={addValue}>Add Task</button>
            </div>
            <ol className='list'>
                {value.map((taskItem, idx) =>
                    <li key={idx} className='list'>
                        {editingIndex === idx ? (
                            <>
                                <input type="text" value={editedValue} onChange={(e) => setEditedValue(e.target.value)} className='text' />
                                <input type="datetime-local" value={editedDate} onChange={(e)=> setEditedDate(e.target.value)} className='date'/>
                                <button onClick={() => saveEditedValue(idx)} className='save'>Save</button>
                                <button onClick={cancelEdit} className='cancel'>Cancel</button>
                            </>
                        ) : (
                            <div className='list'>
                                <span className='text'>{taskItem.task} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    {taskItem.date ?
                                        <span className='col-date'> (Due: {taskItem.date.replace('T','   ')})</span> :
                                        <span className='col-no-due'> (No Due)</span>}
                                </span>
                                <button className='edit-bnt' onClick={() => editValue(idx)}>Edit Task</button>
                                <button className='del-bnt' onClick={() => removeValue(idx)}>Delete Task</button>
                                <button className='move-up' onClick={() => moveUp(idx)}>&uarr;</button>
                                <button className='move-down' onClick={() => moveDown(idx)}>&darr;</button>
                            </div>
                        )}
                    </li>
                )}
            </ol>
        </div>
    );
}
export default Todolist;
