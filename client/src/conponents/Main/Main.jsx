import React, { useCallback, useEffect, useState } from "react";
import "./main.css";
import axios from "axios";

const Main = () => {
  const [text, setText] = useState("");
  const [notes, setNotes] = useState([]);

  const getNote = useCallback(async () => {
    try {
      const response = await axios.get("/api/note", {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setNotes(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const createNode = useCallback(async () => {
    if (!text) return null;
    try {
      const response = await axios.post(
        "/api/note/add",
        { text },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setNotes([response.data]);
      setText("");

      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [text]);

  const removeNote = useCallback(
    async (index) => {
      try {
        const updatedNotes = [...notes];
        updatedNotes.splice(index, 1);
        setNotes(updatedNotes);
        await axios.delete("/api/note/delete", {
          headers: {
            "Content-Type": "application/json",
          },
          data: { index },
        });
      } catch (error) {
        console.log(error);
      }
    },
    [notes]
  );

  //редактирование

  const [selectedNoteIndex, setSelectedNoteIndex] = useState(null);
  const [editNoteText, setEditNoteText] = useState("");

  const editNote = async (index) => {
    setSelectedNoteIndex(index);
    setEditNoteText(notes[index].text);
  };

  const cancelEditNote = () => {
    setSelectedNoteIndex(null);
    setEditNoteText("");
  };

  useEffect(() => {
    getNote();
  }, [getNote]);

  return (
    <div className="container">
      <div className="main">
        <h2 className="main__title text-left text-secondary">Новая заметка</h2>
        <form className="main__form mb-3" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            className="form-control"
            id="input"
            name="input"
            value={text}
            rows="3"
            onChange={(e) => setText(e.target.value)}
          ></input>
        </form>
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={createNode}
        >
          Добавить
        </button>

        <h2 className="main__title text-left text-secondary mt-3">
          Активные заметки
        </h2>

        {selectedNoteIndex !== null ? (
          <div>
            <form onSubmit={(e) => e.preventDefault()}>
              <input
                type="text"
                className="form-control"
                id="edit-input"
                name="edit-input"
                value={editNoteText}
                rows="3"
                onChange={(e) => setEditNoteText(e.target.value)}
              ></input>
              <div className="btn-group mt-2" role="group">
                <button
                  type="submit"
                  className="btn btn-outline-secondary"
                  onClick={async () => {
                    const noteToUpdate = {
                      ...notes[selectedNoteIndex],
                      text: editNoteText,
                    };
                    const updatedNotes = [...notes];
                    updatedNotes[selectedNoteIndex] = noteToUpdate;
                    setNotes(updatedNotes);
                    await axios.put(
                      `/api/note/update?index=${selectedNoteIndex}`,
                      noteToUpdate,
                      {
                        headers: {
                          "Content-Type": "application/json",
                        },
                      }
                    );
                    cancelEditNote();
                  }}
                >
                  Сохранить
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={cancelEditNote}
                >
                  Отмена
                </button>
              </div>
            </form>
          </div>
        ) : (
          <>
            {notes.length > 0 && (
              <div className="notes">
                {notes.map((note, index) => {
                  return (
                    <div className="main__notes-item" key={index}>
                      <div className="card border-dark mb-3">
                        <div className="card-body text-dark">
                          <div className="card_number">{index + 1}</div>
                          <div
                            className="form-control"
                            id="exampleFormControlTextarea1"
                            rows="3"
                          >
                            {note.text}
                          </div>
                        </div>
                        <div
                          className="btn-group"
                          role="group"
                          aria-label="Basic example"
                        >
                          <button
                            type="button"
                            className="btn btn-outline-secondary"
                          >
                            <i
                              className="icon-pencil-1"
                              onClick={() => editNote(index)}
                            ></i>
                          </button>

                          <button
                            type="button"
                            className="btn btn-outline-secondary"
                          >
                            <i
                              className="icon-cancel-1"
                              onClick={() => removeNote(index)}
                            ></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Main;
