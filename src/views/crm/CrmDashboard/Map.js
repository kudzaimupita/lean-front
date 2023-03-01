import React, { Component, createRef } from "react";
import PropTypes from "prop-types";

const H = window.H;

class Map extends Component {
  static propTypes = {
    center: PropTypes.object,
    app_id: PropTypes.string,
    app_code: PropTypes.string,
    zoom: PropTypes.number,
  };

  _mapRef = createRef();
  _map;
  _platform;
  _defaultLayers;

  componentDidMount() {
    const { app_id, app_code, center, zoom } = this.props;

    this._platform = new H.service.Platform({
      app_id,
      app_code,
      useHTTPS: true,
    });

    this._defaultLayers = this._platform.createDefaultLayers();

    this._map = new H.Map(
      this._mapRef.current,
      this._defaultLayers.normal.map,
      {
        zoom,
        center,
      }
    );
  }

  render() {
    return (
      <div
        id="map"
        style={{ width: "100vw", height: "100vh" }}
        ref={this._mapRef}
      ></div>
    );
  }
}

export default Map;
