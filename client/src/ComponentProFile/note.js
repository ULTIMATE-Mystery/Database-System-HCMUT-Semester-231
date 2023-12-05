import './note.css'
import React, { Component } from 'react';
import Masonry from 'masonry-layout';
import { Button, Row, Col, Container } from 'reactstrap';
import { FaSearch } from 'react-icons/fa';
class Note extends React.Component {
  render() {
    var style = { backgroundColor: this.props.color };
    return (
      <div className="note" style={style}>
        <span className="delete-note" onClick={this.props.onDelete}> × </span>
        {this.props.children}
      </div>
    );
  }
};

class NoteEditor extends React.Component {
  constructor() {
    super();
    this.state = {
      text: '',
      color: '#FFA726'
    }
  }

  handleTextChange = (event) => {
    this.setState({ text: event.target.value });
  };

  handleNoteAdd = () => {
    var newNote = {
      text: this.state.text,
      color: this.state.color,
      id: Date.now()
    };

    this.props.onNoteAdd(newNote);
    this.setState({ text: '' });
  };

  handleColorChange = (event) => {
    this.setState({ color: event.target.value })
  };

  render() {
    return (
      <div className="note-editor">
        <textarea
          placeholder="Enter your note here..."
          rows={5}
          className="textarea"
          value={this.state.text}
          onChange={this.handleTextChange}
        />
        <div className="color-picker" onChange={this.handleColorChange}>
          <input type="radio" name="color-pick" value="#F06292" id="color1" />
          <label htmlFor="color1" style={{ backgroundColor: "#F06292" }}></label>
          <input type="radio" name="color-pick" value="#BA68C8" id="color2" />
          <label htmlFor="color2" style={{ backgroundColor: "#BA68C8" }}></label>
          <input type="radio" name="color-pick" value="#FFD54F" id="color3" />
          <label htmlFor="color3" style={{ backgroundColor: "#FFD54F" }}></label>
          <input type="radio" name="color-pick" value="#4FC3F7" id="color4" />
          <label htmlFor="color4" style={{ backgroundColor: "#4FC3F7" }}></label>
          <input type="radio" name="color-pick" value="#AED581" id="color5" />
          <label htmlFor="color5" style={{ backgroundColor: "#AED581" }}></label>
        </div>
        <button className="add-button" onClick={this.handleNoteAdd}>Add</button>
      </div>
    );
  }
};

class NotesGrid extends React.Component {
  componentDidMount() {
    var grid = this.refs.grid;
    this.msnry = new Masonry(grid, {
      itemSelector: '.note',
      columnWidth: 200,
      gutter: 10,
      isFitWidth: true
    });
  };

  componentDidUpdate(prevProps) {
    if (this.props.notes.length !== prevProps.notes.length) {
      this.msnry.reloadItems();
      this.msnry.layout();
    }
  };

  render() {
    var onNoteDelete = this.props.onNoteDelete;

    return (
      <div className="notes-grid" ref="grid">
        {
          this.props.notes.map(function (note) {
            return (
              <Note
                key={note.id}
                onDelete={onNoteDelete.bind(null, note)}
                color={note.color}>
                {note.text}
              </Note>
            );
          })
        }
      </div>
    );
  }
};

class NoteSearch extends React.Component {
  handleSearch = (event) => {
    this.props.onSearch(event.target.value.toLowerCase());
  };

  render() {
    return (
      <Container style={{ marginTop: '10px' }}>
        <Row style={{ textAlign: 'center' }}>
          <Col md="12">
            <input type="search"
              style={{
                marginTop: '0px',
                padding: '7px 20px',
                fontSize: '18px',
                lineHeight: '1',
                outline: 'none',
                border: '1px solid rgba(0,0,0,0.24)',
                height: '36px'
              }} placeholder="Search..."
              onChange={(event) => { this.handleSearch(event) }} />
            <Button style={{ backgroundColor: '#62AFFC', marginTop: '-6px', border: '0px' }} onClick={this.props.search}><FaSearch /></Button>
          </Col>

        </Row>
      </Container>
    );
  }
};

class NotesApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      searchValue: '',
      filteredNotes: [],
    }
  }
  componentDidMount() {
    var localNotes = JSON.parse(localStorage.getItem('notes'));
    if (localNotes) {
      this.setState({ notes: localNotes, filteredNotes: localNotes });
    }
  }

  componentDidUpdate() {
    this._updateLocalStorage();


  }

  handleNoteDelete = (note) => {
    var noteId = note.id;
    var newNotes = this.state.notes.filter(function (note) {
      return note.id !== noteId;
    });
    this.setState({ notes: newNotes });
  };

  handleNoteAdd = (newNote) => {
    var newNotes = this.state.notes.slice();
    newNotes.unshift(newNote);
    this.setState({ notes: newNotes });
  };

  handleSearch = (text) => {
    this.setState({ searchValue: text });
  };
  search = () => {
    if (this.state.searchValue !== '') {
      this.setState({
        filteredNotes: this.state.notes.filter(note => note.text.toLowerCase().indexOf(this.state.searchValue.toLowerCase()) !== -1)
      })
    }
    else {
      this.setState({
        filteredNotes: this.state.notes
      })
    }
  }
  render() {
    return (
      <div className="notes-app">
        <NoteSearch onSearch={(text) => this.handleSearch(text)} search={(e) => this.search()} />
        <NoteEditor onNoteAdd={this.handleNoteAdd} />
        <NotesGrid notes={this.state.filteredNotes} onNoteDelete={this.handleNoteDelete} />
      </div>
    );
  }

  _updateLocalStorage = () => {
    var notes = JSON.stringify(this.state.notes);
    localStorage.setItem('notes', notes);
  };
};
export default NotesApp;