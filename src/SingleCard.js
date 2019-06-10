import React, { Component } from 'react';
import './cards.css';
class SingleCard extends Component {
  constructor() {
    super();
    this.state = {
      enableEdit: false,
      changed: {},
    };
    this.handleChange = this.handleChange.bind(this);
  }


    toggleEdit= (userId, id) => {
      const { edit } = this.props;
      const { enableEdit } = this.state;
      const { changed } = this.state;
      if (enableEdit) {
        edit({ ...changed, userId, id });
      }
      this.setState((prevState) => ({
        ...prevState,
        enableEdit: !prevState.enableEdit,
      }));
    }

    handleChange(event) {
      const { target } = event;
      const { value, name } = target;

      this.setState((prevState) => ({
        changed: {
          ...prevState.changed,
          [name]: value,
        },
      }));
    }

    render() {
      const { value, id } = this.props;
      const { enableEdit } = this.state;
      return (
        <div className="card">
          {!enableEdit ? (
            <div>
              <div className="title input">
                <h5>{value.title}</h5>

              </div>
              <div className="circle">{value.userId}</div>
              <div className="content input">
                <p>{value.body}</p>
              </div>
            </div>
          )

            : (
              <div className="wrapper">
                <div className="group">
                  {' '}
                  <input className="input" type="text" name="title" defaultValue={value.title} onChange={this.handleChange}></input>
                  {' '}
                  <span className="highlight"></span>
                  <span className="bar"></span>
                  <label>Title</label>
                  {' '}
                </div>
                <div className="group">
                  {' '}
                  <textarea className="input" type="text" name="body" defaultValue={value.body} onChange={this.handleChange}></textarea>
                  {' '}
                  <span className="highlight"></span>
                  <span className="bar"></span>
                  <label>Body</label>
                  {' '}
                </div>
              </div>
            )


          }
          <div className="icon">
            <button className="actionButton" onClick={() => { this.toggleEdit(value.userId, id); }}>
              {enableEdit ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
                </svg>
              )
                : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                    <path d="M0 0h24v24H0z" fill="none" />
                  </svg>
                )
              }
            </button>
            <button
              type="reset"
              className="actionButton"
              onClick={() => {
                this.props.delete(value, id);
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                <path d="M0 0h24v24H0z" fill="none" />
              </svg>
            </button>
          </div>
        </div>

      );
    }
}
export default SingleCard;
