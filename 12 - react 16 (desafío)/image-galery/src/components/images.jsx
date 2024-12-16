import { Component } from "react";
import unsplash from "../services/apiService";
// import Pagination from "./common/pagination";
import SearchBox from "./common/searchBox";
import ImageModal from "./modal";

class ImagesList extends Component {
  state = {
    images: [],
    currentPage: 1,
    searchQuery: "",
    displayModal: false,
  };

  async componentDidMount() {
    const { currentPage } = this.state;

    await this.loadImage(currentPage);
  }

  loadImage = async (page) => {
    const { response } = await unsplash.photos.list({
      page,
      perPage: 10,
    });

    this.setState({ images: response.results });
  };

  loadCategory = async (query) => {
    const { response } = await unsplash.search.getPhotos({
      query,
      page: 1,
      perPage: 10,
    });

    this.setState({ images: response.results });
  };

  handlePageChange = async (page) => {
    await this.loadImage(page);

    this.setState({ currentPage: page });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, currentPage: 1 });
    this.loadCategory(query);
  };

  handleShowModal = () => {
    this.setState({ displayModal: true });
  };

  handleHideModal = () => {
    this.setState({ displayModal: false });
  };

  render() {
    return (
      <div className="container">
        <SearchBox
          value={this.state.searchQuery}
          onChange={this.handleSearch}
        />
        {this.state.images.map((image) => (
          <img
            key={image.id}
            src={image.urls.thumb}
            className="img-fluid"
            onClick={this.handleShowModal}
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
          />
        ))}
        <ImageModal
          show={this.state.displayModal}
          onHide={this.handleHideModal}
        />
        {/* <Pagination
          currentPage={this.state.currentPage}
          onPageChange={this.handlePageChange}
        /> */}
      </div>
    );
  }
}

export default ImagesList;
