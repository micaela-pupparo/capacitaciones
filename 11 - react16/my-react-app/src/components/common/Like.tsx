import * as React from "react";

// input -> liked: boolean
// output -> queremos elevar el evento onclick

interface LikeProps {
  liked: boolean | undefined;
  onClick: () => void;
}

// interface LikeState {}

class Like extends React.Component<LikeProps, object> {
  render() {
    let classes = "fa fa-heart";
    if (!this.props.liked) classes += "-o";

    return (
      <i
        className={classes}
        aria-hidden="true"
        onClick={() => this.props.onClick()}
        style={{ cursor: "pointer" }}
      ></i>
    );
  }
}

export default Like;
