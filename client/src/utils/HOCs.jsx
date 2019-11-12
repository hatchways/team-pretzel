import React from "react";

export const withAnchorState = ComponentToEnrich =>
  class Enrich extends React.Component {
    state = {
      anchorEl: null
    };

    handleClick = event => this.setState({ anchorEl: event.currentTarget });

    handleClose = () => this.setState({ anchorEl: null });

    render = () => (
      <ComponentToEnrich
        anchorEl={this.state.anchorEl}
        handleClick={this.handleClick}
        handleClose={this.handleClose}
        history={this.props.history}
      />
    );
  };
