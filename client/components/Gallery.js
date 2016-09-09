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
        console.log("response inside of get photos in gallery component: ", response.data.data);
      //  const gallery = response.data.map
      const gallerylinks = [];
      for (var image in response.data.data) {
        console.log("image: ", response.data.data[image]);
        gallerylinks.push(response.data.data[image].link);
       //<img src={image.link} />
      }
      console.log("gallerylinks:", gallerylinks);
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
    console.log('gallery inside render', this.state.gallery)

    if (this.state.gallery !== null) {
    return (
      <div>
        {this.state.gallery.map((img)=> { return <img src={img} />})}
      </div>
    );
    }
    else {
      return (<div>No photos in gallery</div>)
    }
  }
}

export default Gallery;
