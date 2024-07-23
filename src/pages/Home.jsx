
import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { addToDo, deleteToDo, getToDo, completeToDo } from '../Services/AllApis';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Home() {
    const [addtodo, setAddTodo] = useState({
        Title: "",
        Description: ""
    });
    const [getView, setGetView] = useState([]);
    const [del, setDelete] = useState("");
    const [complete, setComplete] = useState("");

    const todoAdd = async () => {
        const { Title, Description } = addtodo;

        // Validate that Title and Description are not empty
        if (Title.trim() === "" || Description.trim() === "") {
            toast.error("Title and description cannot be empty!");
            return;
        }

        const todo = { Title, Description };
        const result = await addToDo(todo);
        console.log(result);
        console.log(addtodo);
        setAddTodo({ Title: "", Description: "" });
        toast.success("To-do added successfully!");
        getTodo();
    }

    const getTodo = async () => {
        const getRes = await getToDo();
        console.log(getRes);
        setGetView(getRes.data);
    }

    useEffect(() => {
        getTodo();
    }, [del, complete]);

    const dltTodo = async (id) => {
        const delTodo = await deleteToDo(id);
        if (delTodo.status === 200) {
            toast.success("To-do deleted!");
            setDelete(delTodo);
        } else {
            toast.error("Something went wrong!");
        }
        getTodo(); 
    }

    const completeTodo = async (id) => {
        const result = await completeToDo(id);
        if (result.status === 200) {
            toast.success("To-do marked as complete!");
            setComplete(result);
        } else {
            toast.error("Something went wrong!");
        }
        getTodo(); 
    }

    return (
        <div className='bg-dark d-flex flex-column align-items-center justify-content-center' style={{ minHeight: '100vh' }}>
            <ToastContainer />
            <div className='text-center text-info mb-4'>
                <h1>To Do App</h1>
            </div>
            <div className='p-5 mx-5'>
                <Row className="g-2 w-100">
                    <Col md={5}>
                        <FloatingLabel controlId="floatingInputGrid" label="Title">
                            <Form.Control
                                type="text"
                                placeholder="Enter title"
                                value={addtodo.Title}
                                onChange={(e) => setAddTodo({ ...addtodo, Title: e.target.value })}
                            />
                        </FloatingLabel>
                    </Col>
                    <Col md={5}>
                        <FloatingLabel controlId="floatingInputGrid" label="Description">
                            <Form.Control
                                type="text"
                                placeholder="Enter description"
                                value={addtodo.Description}
                                onChange={(e) => setAddTodo({ ...addtodo, Description: e.target.value })}
                            />
                        </FloatingLabel>
                    </Col>
                    <Col md={2} className='d-flex align-items-end'>
                        <Button onClick={todoAdd} variant="success" style={{ height: '55px', width: '100%' }}>Add</Button>
                    </Col>
                </Row>
            </div>
            <div>
                {getView.length > 0 && getView.map((todo, index) => (
                    <div key={index} className='p-2 d-flex justify-content-center'>
                        <Card style={{ width: '20rem' }}>
                            <Card.Body>
                                <Card.Title>{todo.Title}</Card.Title>
                                <Card.Text>
                                    {todo.Description}
                                </Card.Text>
                                <div className='d-flex justify-content-center p-1'>
                                    <Button
                                        onClick={() => completeTodo(todo.id)}
                                        variant="success"
                                        className="me-2"
                                    >
                                        Complete
                                    </Button>
                                    <Button
                                        onClick={() => dltTodo(todo.id)}
                                        variant="danger"
                                        className="me-2"
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;

