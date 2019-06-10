import React, { Component } from 'react';
import { connect } from 'react-redux';
import './cards.css';
import SingleCard from './SingleCard';
class Cards extends Component {
  constructor() {
    super();
    this.state = {

      posts: [],
      onload: true,
      enableEdit: false,
    };
    this.renderCards = this.renderCards.bind(this);
    this.delete = this.delete.bind(this);
    this.edit = this.edit.bind(this);
  }

  componentDidMount() {
    const { onRequestPost } = this.props;
    if (!Object.prototype.hasOwnProperty.call(localStorage, 'posts')) {
      onRequestPost();
    } else {
      const list = new Map(JSON.parse(localStorage.getItem('posts')));


      this.setState((prevState) => (
        {
          ...prevState,
          posts: list,
        }
      ));
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      deleting, editing, posts, toBeDeleted, edited,
    } = nextProps;
    const { onload, posts: statePosts } = this.state;
    const temp = statePosts;
    const { posts: propsPosts } = this.props;
    if (deleting) {
      temp.delete(toBeDeleted);
      this.setState((prevState) => ({ ...prevState, posts: temp }));
      localStorage.setItem('posts', JSON.stringify([...temp]));

      this.setState((prevState) => ({ ...prevState, deleting: false, posts: temp }));
    } else if (editing) {
      const value = { userId: edited.userId, title: edited.title, body: edited };
      temp.set(edited.id, { ...value.body });
      localStorage.setItem('posts', JSON.stringify([...temp]));
      this.setState((prevState) => ({
        ...prevState,
        posts: temp,
      }));
    } else if (posts !== propsPosts && onload) {
      const posts_temp = new Map(posts.map((obj) => [obj.id, { userId: obj.userId, title: obj.title, body: obj.body }]));
      this.setState((prevState) => ({
        ...prevState,
        posts: posts_temp,
        onload: false,
      }));
      localStorage.setItem('posts', JSON.stringify([...posts_temp]));
    }
  }


    delete=(value, key) => {
      const { onDeletePost } = this.props;
      onDeletePost({ ...value, id: key });
    }

edit=(value) => {
  const { onEditPost } = this.props;
  onEditPost(value);
}

  renderCards = () => {
    const { posts } = this.state;
    const tempPost = [];
    if (posts) {
      posts.forEach((value, key) => {
        tempPost.push(
          <SingleCard key={key} id={key} value={value} delete={this.delete} edit={this.edit} />
        );
      });
    }
    return tempPost;
  }

  render() {
    const { fetching, error } = this.props;
    return (
      <div>
        <header className="sticky">
          <h2>
            {fetching ? (
              <p>Fetching...</p>
            ) : (
              <p>Posts Fetched</p>
            )}
          </h2>
        </header>
        <span className="error">
          {error && <p style={{ color: 'red' }}>Uh oh - something went wrong!</p>}
        </span>
        <div className="container">
          {this.renderCards()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  fetching: state.fetching,
  posts: state.data,
  error: state.error,
  deleting: state.deleting,
  editing: state.editing,
  toBeDeleted: state.toBeDeleted,
  edited: state.edited,
});

const mapDispatchToProps = (dispatch) => ({
  onRequestPost: () => dispatch({ type: 'FETCH_POSTS' }),
  onDeletePost: (post) => dispatch({ type: 'DELETE_POST', post }),
  onEditPost: (post) => dispatch({ type: 'EDIT_POST', post }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cards);
