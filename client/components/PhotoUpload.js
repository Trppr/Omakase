import React from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import {render} from 'react-dom';

class PhotoUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photo: '',
      photoPreviewUrl: '',
      foodType: props.foodType
    };
  }

  photoSubmit(e) {
    let that = this;
    e.preventDefault();

    axios.post('/api/photo/upload', {image: this.state.photoPreviewUrl.slice(23)})
      .then(function(response) {
        //console.log("Photo uploaded successfully", response);
        that.setState({
          photo: '',
          photoPreviewUrl: ''
        });
        render(<div>Photo successfully uploaded</div>, document.getElementById('loadsuccess'));
      })
      .catch(function(error) {
        console.log(error);
      });
  }


  photoChange(e) {
    e.preventDefault();

    let photoReader = new FileReader();
    let photoFile = e.target.files[0];

    photoReader.onloadend = () => {
      this.setState({
        photo: photoFile,
        photoPreviewUrl: photoReader.result
      });
    }
    console.log("foodType: ", this.state.foodType);
    photoReader.readAsDataURL(photoFile);

  }

  render() {
    let {photoPreviewUrl} = this.state;
    let previewPhoto = null;

    if (photoPreviewUrl) {
      previewPhoto = (<img src={photoPreviewUrl} />);
    }

    return (
     <div className="photoUploader">
      <form onChange={(e) => this.handleChange(e)}>
        <input
          type='file'
          className="fileInput"
          onChange={(e) => this.photoChange(e)}
        />
        <Button type='submit' onClick={(e)=>this.photoSubmit(e)}>
          Upload photo
        </Button>
     </form>
          <div id="photo">
            {previewPhoto}
          </div>
          <div id="loadsuccess"></div>
      </div>
    );
  }
}

export default PhotoUpload;
