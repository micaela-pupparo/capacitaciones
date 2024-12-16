import { Component } from "react";
import unsplash from "../services/apiService";
import Pagination from "./common/pagination";
import { Row, Col, Badge, Stack } from "react-bootstrap";
import SearchBox from "./common/searchBox";
import ImageModal from "./modal";

class ImagesList extends Component {
  state = {
    images: [],
    image: undefined,
    currentPage: 1,
    searchQuery: "",
    displayModal: false,
    categories: [
      "animals",
      "beach",
      "celebrations",
      "colors",
      "constructions",
      "food",
      "mountains",
      "people",
      "plants",
      "popular",
    ],
  };

  async componentDidMount() {
    await this.loadImage();
  }

  loadImage = async (page = undefined) => {
    let numberPage;
    if (page) numberPage = page;
    else {
      numberPage = Math.ceil(Math.random() * 10);
    }

    const { response } = await unsplash.search.getPhotos({
      query: "random",
      page: numberPage,
      perPage: 24,
      orientation: "landscape",
    });

    this.setState({ images: response.results });
  };

  loadCategory = async (query, page = 1) => {
    const { response } = await unsplash.search.getPhotos({
      query,
      page,
      perPage: 24,
      orientation: "landscape",
    });

    this.setState({ images: response.results });
  };

  handlePageChange = async (page) => {
    if (this.state.searchQuery) {
      await this.loadCategory(this.state.searchQuery, page);
    } else {
      await this.loadImage(page);
    }

    this.setState({ currentPage: page });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, currentPage: 1 });
    this.loadCategory(query);
  };

  handleShowModal = (image) => {
    this.setState({ displayModal: true });

    if (image) this.setState({ image });
  };

  handleHideModal = () => {
    this.setState({ displayModal: false });
  };

  render() {
    return (
      <div className="container">
        <SearchBox value={this.state.searchQuery} onChange={this.handleSearch}>
          <Stack
            direction="horizontal"
            gap={2}
            style={{
              display: "flex",
              justifyContent: "center",
              cursor: "pointer",
              flexWrap: "wrap",
            }}
          >
            {this.state.categories.map((category) => (
              <Badge
                pill
                bg="primary"
                key={category}
                onClick={() => this.handleSearch(category)}
              >
                {category}
              </Badge>
            ))}
          </Stack>
        </SearchBox>
        <Row className="g-3" style={{ marginTop: 15 }}>
          {this.state.images.map((image) => (
            <Col key={image.id} xs={6} sm={4} md={3} lg={2}>
              <img
                src={image.urls.small}
                alt={image.alt_description || "Image"}
                className="img-fluid rounded shadow"
                onClick={() => this.handleShowModal(image)}
                style={{ cursor: "pointer" }}
              />
            </Col>
          ))}
        </Row>
        {this.state.image && (
          <ImageModal
            show={this.state.displayModal}
            onHide={this.handleHideModal}
            image={this.state.image}
          />
        )}
        <Pagination
          currentPage={this.state.currentPage}
          onPageChange={this.handlePageChange}
        />
      </div>
    );
  }
}

export default ImagesList;
