import { Component } from "react";
import unsplash from "../services/apiService";
// import Pagination from "./common/pagination";
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
    const { currentPage } = this.state;

    await this.loadImage(currentPage);
  }

  loadImage = async () => {
    const randomPage = Math.ceil(Math.random() * 10);
    console.log(randomPage);
    const { response } = await unsplash.search.getPhotos({
      query: "random",
      page: randomPage,
      perPage: 24,
      orientation: "landscape",
    });

    this.setState({ images: response.results });
  };

  loadCategory = async (query) => {
    const { response } = await unsplash.search.getPhotos({
      query,
      page: 1,
      perPage: 24,
      orientation: "landscape",
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
      </div>
    );
  }
}

export default ImagesList;
