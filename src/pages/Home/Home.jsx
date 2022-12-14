import '../../style/global-style.css';
import { Component } from 'react';

import { loadPosts } from '../../utils/load-posts'

import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';

//Componentes de classes
export class Home extends Component {
    state = {
      posts: [],
      allPosts: [],
      page: 0,
      postsPerPage: 5,
      searchValue: ""
    };

  async componentDidMount() {
    await this.loadPosts();
  }

  loadPosts = async () => {
    const { page, postsPerPage } = this.state;

    const postsAndPhotos = await loadPosts();
    this.setState({ 
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos,
    });
  }

  loadMorePosts = () => {
    const {
      page,
      postsPerPage,
      allPosts,
      posts
    } = this.state;
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage)
    posts.push(...nextPosts);

    this.setState({posts, page: nextPage});
  }

  handleChange = (e) => {
    const {value} = e.target;
    this.setState({ searchValue: value });
  }

  render () {
    const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;

    const filterPosts = !!searchValue ? 
    allPosts.filter(post => {
      return post.title.toLowerCase().includes(searchValue.toLowerCase());
    }) 
    : posts;

    return (
      <section className='container'>

        <h1>Search Value: {searchValue}</h1>

        <TextInput searchValue={searchValue} handleChange={this.handleChange} />
        <br /><br />

        {filterPosts.length >= 0 && (
          <Posts posts={filterPosts} />
        )}

        {filterPosts.length === 0 && (
          <p>Não existem posts!</p>
        )}

        <Posts posts={filterPosts} />

        <div className='button-container'>
          {! searchValue && (
            <Button 
            text="Load more posts"
            onClick={this.loadMorePosts} 
            disable={noMorePosts}
            />
          )}
        </div>
      </section>
    );
  }
}


//Componentes de função
/*function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}*/

export default Home;
