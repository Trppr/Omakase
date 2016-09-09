import React from 'react';
import axios from 'axios';
import {render} from 'react-dom';
import NavBar from './NavBar.js';

class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gallery: null,
    };
  }

  getPhotos() {
    let that = this;

    axios.get('/api/gallery/getPhotos')
      .then(function(response) {
        const gallerylinks = [];
        for (var image in response.data.data) {
        //console.log("image: ", response.data.data[image]);
        gallerylinks.push(response.data.data[image].link);
      }
        that.setState({
          gallery: gallerylinks
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  componentWillMount() {
    this.getPhotos();
  }

  render() {
    if (this.state.gallery !== null) {
    return (
      <div>
      <NavBar navLink={"/vote"} navMessage={"Go Vote!"}/>
        <div>
          {this.state.gallery.map((img)=> { return <img src={img} />})}
        </div>
      </div>

    );
    }
    else {
      return (
        <div>
          <NavBar navLink={"/vote"} navMessage={"Go Vote!"}/>
            <div>No photos in gallery</div>
        </div>
      )
    }
  }
}

export default Gallery;
