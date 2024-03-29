import React, { useState, useEffect } from "react";
import domain from "../../util/domain";
import "../../style/forms.scss";
import Axios from "axios";
import ErrorMessage from "../misc/ErrorMessage";

function TutorialEditor({
  getTutorials,
  setNewTut,
  newTut,
  editTutorialData,
  clearEditTutorialForm,
}) {
  const [urlLink, setUrlLink] = useState("");
  const [imgLink, setImgLink] = useState("");
  const [tutName, setTutName] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (editTutorialData) {
      setUrlLink(editTutorialData.url ? editTutorialData.url : "");
      setImgLink(editTutorialData.img ? editTutorialData.img : "");
      setTutName(editTutorialData.title ? editTutorialData.title : "");
      setDescription(
        editTutorialData.description ? editTutorialData.description : ""
      );
    }
  }, [editTutorialData]);

  async function saveTutorial(e) {
    e.preventDefault();

    const tutorialData = {
      url: urlLink ? urlLink : undefined,
      img: imgLink ? imgLink : undefined,
      title: tutName ? tutName : undefined,
      description: description ? description : undefined,
    };

    try {
      if (!editTutorialData)
        // if you are not getting editData (not editing..) post as a new tut
        await Axios.post(`${domain}/tutorial/`, tutorialData);
      // if you are reciving editdata (you are editing), just update the data
      else
        await Axios.put(
          `${domain}/tutorial/${editTutorialData._id}`,
          tutorialData
        );
    } catch (err) {
      if (err.response) {
        if (err.response.data.errorMessage) {
          setErrorMessage(err.response.data.errorMessage);
        }
      }
      return;
    }
    clearEditTutorialForm();
    closeTutForm();
    getTutorials();
  }

  function closeTutForm() {
    if (newTut) {
      return setNewTut(false);
    }
    setUrlLink("");
    setImgLink("");
    setTutName("");
    setDescription("");
  }

  return (
    <section className="editForm">
      <main className="content">
        <div className="the-modal-form">
          {errorMessage && (
            <ErrorMessage
              message={errorMessage}
              clear={() => setErrorMessage(null)}
            />
          )}
          <form onSubmit={saveTutorial}>
            <label htmlFor="url-link">Tutorial Url</label>
            <input
              id="tutorial-link"
              type="text"
              value={urlLink}
              onChange={e => setUrlLink(e.target.value)}
            ></input>
            <label htmlFor="image-link">Image Url</label>
            <input
              id="image-link"
              type="text"
              value={imgLink}
              onChange={e => setImgLink(e.target.value)}
            ></input>
            <label htmlFor="tutorial-name">
              Title <span>(max 38 chars)</span>
            </label>
            <input
              maxLength="38"
              id="tutorial-name"
              type="text"
              value={tutName}
              onChange={e => setTutName(e.target.value)}
            ></input>
            <label htmlFor="description">
              Short Description <span>(max 50 chars)</span>
            </label>
            <textarea
              maxLength="50"
              id="description"
              value={description}
              rows="3"
              onChange={e => setDescription(e.target.value)}
            />
            <button type="submit">Save changes</button>
            <button
              className="red-btn"
              type="button"
              onClick={() => {
                closeTutForm();
                clearEditTutorialForm();
              }}
            >
              Cancel
            </button>
          </form>
        </div>
      </main>
    </section>
  );
}

export default TutorialEditor;
