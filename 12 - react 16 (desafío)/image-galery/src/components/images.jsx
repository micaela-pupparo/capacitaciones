import { Component } from "react";
import unsplash from "../services/apiService";
import Pagination from "./common/pagination";

class ImagesList extends Component {
  state = {
    images: [],
    currentPage: 1,
  };

  async componentDidMount() {
    const { currentPage: page } = this.state;

    const { response } = await unsplash.photos.list({
      page,
      perPage: 10,
    });

    this.setState({ images: response.results });
  }

  loadImage = async (page) => {
    const { response } = await unsplash.photos.list({
      page,
      perPage: 10,
    });

    this.setState({ images: response.results });
  };

  handlePageChange = async (page) => {
    await this.loadImage(page);

    this.setState({ currentPage: page });
  };

  render() {
    return (
      <div className="container">
        {this.state.images.map((image) => (
          <img key={image.id} src={image.urls.thumb} className="img-fluid" />
        ))}
        <Pagination
          currentPage={this.state.currentPage}
          onPageChange={this.handlePageChange}
        />
      </div>
    );
  }
}

export default ImagesList;
