import React, { useEffect, useState } from 'react';
import MainScreen from '../../components/MainScreen';
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import { Link } from 'react-router-dom'
import axios from 'axios'
import ReactMarkdown from "react-markdown";


function MyNotes(props) {

    const [notes, setNotes] = useState([])

    const fetchNotes = async () => {
        // const data = await axios.get('/api/notes');
        const { data } = await axios.get('/api/notes');
        console.log(data)
        setNotes(data)
    }

    useEffect(() => {
        fetchNotes()
    }, [])

    const deleteHandler = (id) => {
        if (window.confirm("Are you sure?")) {
            // dispatch(deleteNoteAction(id));
        }
    };

    return (
        <MainScreen title="welcome back to my list">

            <Link to="/createnote">
                <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
                    Create new Note
                </Button>
            </Link>
            {
                notes.map((note) => {
                    return (
                        <Accordion>
                            <Card style={{ margin: 10 }}>
                                <Card.Header style={{ display: "flex" }}>
                                    <span
                                        style={{
                                            color: "black",
                                            textDecoration: "none",
                                            flex: 1,
                                            cursor: "pointer",
                                            alignSelf: "center",
                                            fontSize: 18,
                                        }}
                                    >
                                        
                                            {note.title}
                                       
                                    </span>

                                    <div>
                                        <Button href={`/note/${note._id}`}>Edit</Button>
                                        <Button
                                            variant="danger"
                                            className="mx-2"
                                            onClick={() => deleteHandler(note._id)}
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </Card.Header>
                                <Card.Body>
                                    <blockquote className="blockquote mb-0">
                                        <h4>
                                            <Badge variant="success">
                                                Category - {note.category}
                                            </Badge>
                                        </h4>
                                        <p>
                                            {note.content}
                                        </p>
                                        <footer className="blockquote-footer">
                                            created on date
                                        </footer>
                                    </blockquote>
                                </Card.Body>
                            </Card>
                        </Accordion>
                    )
                })
            }
        </MainScreen>
    );
}

export default MyNotes;