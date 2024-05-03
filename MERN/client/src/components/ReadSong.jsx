import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function ReadSong() {
  const [songs, setSongs] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [filter, setFilter] = useState({
    songName: '',
    filmName: '',
    musicDirector: '',
    singer: '',
    actor: '',
    actress: '',
  });

  useEffect(() => {
    axios.get('http://localhost:3001/')
      .then(res => {
        setSongs(res.data);
        setFilteredSongs(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    const filtered = songs.filter(song => {
      // Check if all filter criteria are satisfied for the current song
      return Object.keys(filter).every(key => {
        // If filter value is empty, skip this key
        if (!filter[key]) return true;
        // Check if song property contains filter value (case insensitive)
        return song[key].toLowerCase().includes(filter[key].toLowerCase());
      });
    });
  
    setFilteredSongs(filtered);
  };
  
const handleDelete = (id) => {
  axios.delete('http://localhost:3001/deleteSong/' + id)
    .then(res => {
      console.log(res);
      // Remove the deleted song from the filteredSongs array
      setFilteredSongs(filteredSongs.filter(song => song._id !== id));
    })
    .catch(err => console.error(err));
}


  return (
    <div className="container">
      <div className="row">
        <form className="filter-form mt-5" onSubmit={handleFilterSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="song name"
              name="songName"
              value={filter.songName}
              onChange={handleFilterChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="film name"
              name="filmName"
              value={filter.filmName}
              onChange={handleFilterChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="music director"
              name="musicDirector"
              value={filter.musicDirector}
              onChange={handleFilterChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="singer"
              name="singer"
              value={filter.singer}
              onChange={handleFilterChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="actor"
              name="actor"
              value={filter.actor}
              onChange={handleFilterChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="actress"
              name="actress"
              value={filter.actress}
              onChange={handleFilterChange}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">Filter</button>
          </div>
        </form>
        <Link to="/add">
          <button className="btn btn-success mt-3 mb-3">Add +</button>
        </Link>
        <table className="table">
          <thead>
            <tr>
              <th>Song Name</th>
              <th>Film Name</th>
              <th>Music Director</th>
              <th>Singer</th>
              <th>Actor</th>
              <th>Actress</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredSongs.map((song, index) => (
              <tr key={index}>
                <td>{song.songName}</td>
                <td>{song.filmName}</td>
                <td>{song.musicDirector}</td>
                <td>{song.singer}</td>
                <td>{song.actor}</td>
                <td>{song.actress}</td>
                <td>
                  <Link to={`/update/${song._id}`}>
                    <button className="btn btn-primary mr-1">Edit</button>
                  </Link>

                  <button className="btn btn-danger" onClick={(e) => handleDelete(song._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
