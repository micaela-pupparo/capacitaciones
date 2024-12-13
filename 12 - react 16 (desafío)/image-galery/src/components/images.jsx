import { Component } from "react";
import unsplash from "../services/apiService";
// import Pagination from "./common/pagination";
import SearchBox from "./common/searchBox";
import Modal from "./modal";

class ImagesList extends Component {
  state = {
    images: [],
    currentPage: 1,
    searchQuery: "",
    displayModal: "none",
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

  handleImageClick = () => {
    this.setState({ displayModal: "block" });
  };

  handleModal = () => {
    this.setState({ displayModal: "none" });
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
            onClick={this.handleImageClick}
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
          />
        ))}
        <Modal
          displayModal={this.state.displayModal}
          onOpenModal={this.handleModal}
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
