import { Component } from "react";
import http from "../services/httpService";

class ImagesList extends Component {
  state = {
    images: [],
  };

  async componentDidMount() {
    const { data: images } = await http.get(
      "https://api.unsplash.com/photos/?client_id=rikz8-JlCCNwLuK8DVuhf6dszY0dWXWop7Xm9TAxMlY"
    );
    this.setState({ images });
  }

  render() {
    return (
      <div>
        imagenesss
        {this.state.images.map((image) => (
          <img key={image.id} src={image.urls.raw} />
        ))}
      </div>
    );
  }
}

export default ImagesList;
