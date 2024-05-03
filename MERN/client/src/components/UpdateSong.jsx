import React, { useEffect, useState } from 'react'
import '../bootstrap-4.0.0-dist/css/bootstrap.min.css';
import './style.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function AddSong() {
    const [song, setSong] = useState({
        songName: "",
        filmName: "",
        musicDirector: "",
        singer: "",
        actor: "",
        actress: "",
      });

      const {id} = useParams();
      const navigate = useNavigate();

      useEffect(() => {
        axios.get('http://localhost:3001/getSong/'+id)
            .then(res => {
                setSong(res.data);
            })
            .catch(err => console.error(err))
      },[]);

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
            .put("http://localhost:3001/editSong/"+id,song)
            .then((res) => {
              alert("Song Updated Successfully");
              navigate("/");
            })
            .catch((err) => alert("Error Occurred while updating song"));
        }
      };

  return (
    <div className='container'>
     <h1 className='mt-5'>Update Song</h1>
        <div className='row cust-align mt-5'>
        <form className="add-song-form" onSubmit={submit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="song name"
              value={song.songName}
              onChange={(e) => setSong({ ...song, songName: e.target.value })}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="film name"
              value={song.filmName}
              onChange={(e) => setSong({ ...song, filmName: e.target.value })}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="music director"
              value={song.musicDirector}
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
              value={song.singer}
              onChange={(e) => setSong({ ...song, singer: e.target.value })}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="actor"
              value={song.actor}
              onChange={(e) => setSong({ ...song, actor: e.target.value })}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="actress"
              value={song.actress}
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
  )
}
