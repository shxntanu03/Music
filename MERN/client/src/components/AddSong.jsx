import React, { useState } from "react";
import "../bootstrap-4.0.0-dist/css/bootstrap.min.css";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function AddSong() {
  const [song, setSong] = useState({
    songName: "",
    filmName: "",
    musicDirector: "",
    singer: "",
    actor: "",
    actress: "",
  });

  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    console.log(song);
    if (
      song.songName.trim() === "" ||
      song.filmName.trim() === "" ||
      song.musicDirector.trim() === "" ||
      song.singer.trim() === "" ||
      song.actor.trim() === "" ||
      song.actress.trim() === ""
    ) {
      alert("Please fill all the fields");
    } else {
      axios
        .post("http://localhost:3001/addSong", song)
        .then((res) => {
          alert("Song Added Successfully");
          navigate("/");
        })
        .catch((err) => alert("Error Occurred while adding song"));
    }
  };

  return (
    <div className="container">
      <h1 className="mt-5">Add Song</h1>
      <div className="row cust-align mt-5">
        <form className="add-song-form" onSubmit={submit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="song name"
              onChange={(e) => setSong({ ...song, songName: e.target.value })}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="film name"
              onChange={(e) => setSong({ ...song, filmName: e.target.value })}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="music director"
              onChange={(e) =>
                setSong({ ...song, musicDirector: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="singer"
              onChange={(e) => setSong({ ...song, singer: e.target.value })}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="actor"
              onChange={(e) => setSong({ ...song, actor: e.target.value })}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="actress"
              onChange={(e) => setSong({ ...song, actress: e.target.value })}
            />
          </div>
          <div className="form-group">
            <Link to="/">
              <input
                type="button"
                className="btn btn-primary mr-4"
                value="Go Back"
              />
            </Link>
            <input
              type="submit"
              className="btn btn-success ml-4"
              value="Submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
