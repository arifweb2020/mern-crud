import React, { useEffect } from "react";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
import { deleteNoteAction, listNotes } from "../../actions/notesActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";


function MyNotes({history,search}) {

    const dispatch = useDispatch();

    const noteList = useSelector((state) => state.noteList);
    const { loading, error, notes } = noteList;
  
    // const filteredNotes = notes.filter((note) =>
    //   note.title.toLowerCase().includes(search.toLowerCase())
    // );
  
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
  
    const noteDelete = useSelector((state) => state.noteDelete);
    const {
      loading: loadingDelete,
      error: errorDelete,
      success: successDelete,
    } = noteDelete;
  
    const noteCreate = useSelector((state) => state.noteCreate);
    const { success: successCreate } = noteCreate;
  
    const noteUpdate = useSelector((state) => state.noteUpdate);
    const { success: successUpdate } = noteUpdate;
  
    useEffect(() => {
      dispatch(listNotes());
      if (!userInfo) {
        history.push("/");
      }
    }, [
      dispatch,
      history,
      userInfo,
      successDelete,
      successCreate,
      successUpdate,
    ]);
  
    const deleteHandler = (id) => {
      if (window.confirm("Are you sure?")) {
        dispatch(deleteNoteAction(id));
      }
    };
    return (
        <MainScreen title={`Welcome Back ${userInfo && userInfo.name}..`}>

            <Link to="/createnote">
                <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
                    Create new Note
                </Button>
            </Link>
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {errorDelete && (
        <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
      )}
      {loading && <Loading />}
      {loadingDelete && <Loading />}
            {
                notes?.reverse()
                .filter((filteredNote) =>
            filteredNote.title.toLowerCase().includes(search.toLowerCase())
          )
                .map((note) => {
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
                                        Created on{" "}
                        <cite title="Source Title">
                          {note.createdAt.substring(0, 10)}
                        </cite>
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