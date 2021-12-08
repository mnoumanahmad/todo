import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { addTask, deleteTask, updateTaskStatus, editTask } from "./tasksSlice"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark, faTrash, faEdit, faCheckSquare, faCheckDouble } from '@fortawesome/free-solid-svg-icons'
import './App.css';
import { InputGroup, FormControl, Button, Row } from "react-bootstrap";

function App() {
  const todos_list = useSelector((state) => state.tasks.tasks)
  const dispatch = useDispatch()
  const [newTodo, setNewTodo] = useState({ val: "" }); // hook for new todo
  const [editTodo, setEditTodo] = useState({}); // hook for editng a exisiting todo

  // To save todo upon enter
  const handleKeyDownAddTask = (event) => {
    if (event.key === 'Enter') {
      newTodo.val && dispatch(addTask({ todo: newTodo.val, key: + new Date(), state: "view" }));
      setNewTodo({ val: "" })
    }
  }

  // to save editied todo upon enter
  const handleKeyDownEditTask = (event, id) => {
    if (event.key === 'Enter') {
      editTodo[id].val && dispatch(editTask({ todo: editTodo[id].val, key: id }));
      editTodo[id] = {};
      setEditTodo({ ...editTodo });
    }
  }

  // to change state of todo upon editing
  const handleEditUpdate = (e, id) => {
    editTodo[id] = { val: e.target.value };
    setEditTodo({ ...editTodo })
  }

  return (
    <div className="App">

      <div className="d-flex justify-content-center  p-3 mb-3 rounded">
        <h2>Todo App ({todos_list.length})</h2>
      </div>
      <div className="container fluid tasks-div">
        <Row>
          <InputGroup className="mb-3 ">
            <FormControl
              placeholder="Add Task"
              aria-label="Add Task"
              aria-describedby="basic-addon2"
              value={newTodo.val}
              onChange={e => setNewTodo({ val: e.target.value })}
              onKeyDown={handleKeyDownAddTask}
            />
            <Button variant="primary" id="button-addon2" onClick={() => { dispatch(addTask({ todo: newTodo.val, key: + new Date(), state: "view" })); setNewTodo({ val: "" }) }}>
              Add Task
            </Button>
          </InputGroup>
        </Row>

        <Row>
          <div className="container">
            <div className="row">
              {todos_list.map(k =>
                (k.state === "view" || k.state === "done") ?
                  <div key={k.key} className="col-12 mb-4">

                    {k.state === "done" ?
                      <><FontAwesomeIcon icon={faCheckDouble} />
                        <strike><p >{k.todo}</p> </strike> </> :
                      <>
                        <FontAwesomeIcon className="checkIcon" icon={faCheckSquare} onClick={() => {
                          let i = k.key;
                          editTodo[i] = { val: k.todo };
                          setEditTodo({ ...editTodo });
                          //setEditTodo({ val: k.todo, key: k.key });
                          dispatch(updateTaskStatus({ key: k.key, state: "done" }));
                        }} />
                        <p>{k.todo}</p>
                      </>
                    }
                    <span className="operations float-right">
                      <FontAwesomeIcon icon={faEdit} onClick={() => {
                        let i = k.key;
                        editTodo[i] = { val: k.todo };
                        setEditTodo({ ...editTodo });
                        //setEditTodo({ val: k.todo, key: k.key });
                        dispatch(updateTaskStatus({ key: k.key }));
                      }
                      } />
                      <FontAwesomeIcon icon={faTrash} onClick={() => dispatch(deleteTask({ key: k.key }))} />
                    </span>
                  </div>
                  :
                  <div key={k.key} className="col-12 mb-4">

                    <InputGroup className="mb-3 ">
                      <FormControl
                        placeholder="Add Text"
                        aria-label="Add Text"
                        aria-describedby="basic-addon2"
                        value={editTodo[k.key] ? editTodo[k.key].val || "" : ""}
                        key={k.key}
                        onChange={e => handleEditUpdate(e, k.key)}
                        onKeyDown={(e) => handleKeyDownEditTask(e, k.key)}
                      />
                      <Button variant="secondary" id="button-addon3" onClick={() => {
                        dispatch(editTask({ todo: editTodo[k.key].val, key: k.key }));
                        editTodo[k.key] = {};
                        setEditTodo({ ...editTodo });
                      }}>
                        Save
                      </Button>
                    </InputGroup>
                  </div>)}
            </div>
          </div>
        </Row>
      </div>
    </div>
  );
}

export default App;
