import React from 'react';
import NavBar from './NavBar';
import { GoogleMap, GoogleMapLoader, InfoWindow, Marker, SearchBox } from "react-google-maps";
import update from "react-addons-update";
import DirectionButton from './DirectionButton'

class BestOf extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [
        {
          position: {
            lat : 34.0187734,
            lng : -118.4916591
          },
          info: "Best Poke: Spinfish",
          showInfo: true,
          defaultAnimation: 2,
        },
        {
          position: {
            lat : 34.0188797,
            lng : -118.4959362
          },
          info: "Best Sandwich: Bay Cities",
          showInfo: true,
          defaultAnimation: 2,
        },
        {
          position: {
            lat : 34.0197516,
            lng : -118.4922921
          },
          info: "Best Wendy's: Wendy's",
          showInfo: true,
          defaultAnimation: 2,
        },
        {
          position: {
            lat : 34.0175996,
            lng : -118.4935474
          },
          info: "Best Burger: Umami Burger",
          showInfo: true,
          defaultAnimation: 2,
        },
        {
          position: {
            lat : 34.0179508,
            lng : -118.4935666
          },
          info: "Best Coffee: Philz Coffee",
          showInfo: true,
          defaultAnimation: 2,
        },
        {
          position: {
            lat : 34.0192343,
            lng : -118.4938359
          },
          info: "Best Upscale French-Asian Cuisine: Cassia",
          showInfo: true,
          defaultAnimation: 2,
        }
      ],
    };
    this.handleMapClick = this.handleMapClick.bind(this);
    this.handleMarkerRightclick = this.handleMarkerRightclick.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {

    }, 2000);
  }
  handleMarkerClick(marker) {
    marker.showInfo = true;
    this.setState(this.state);
  }

  handleMarkerClose(marker) {
    marker.showInfo = false;
    this.setState(this.state);
  }

  renderInfoWindow(ref, marker) {
    console.log('ref = ',this.state.markers[ref].info );
    return (
      //You can nest components inside of InfoWindow!
      <InfoWindow
        key={`${ref}_info_window`}
        onCloseclick={this.handleMarkerClose.bind(this, marker)} >

        <div>
          <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg"
            width="16" height="16" viewBox="0 0 16 16">
              <path d="M3.5 0c-1.7 0-3 1.6-3 3.5 0 1.7 1 3 2.3 3.4l-.5 8c0
            .6.4 1 1 1h.5c.5 0 1-.4 1-1L4 7C5.5 6.4 6.5 5 6.5
            3.4c0-2-1.3-3.5-3-3.5zm10 0l-.8 5h-.6l-.3-5h-.4L11
            5H10l-.8-5H9v6.5c0 .3.2.5.5.5h1.3l-.5 8c0 .6.4 1 1 1h.4c.6 0
            1-.4 1-1l-.5-8h1.3c.3 0 .5-.2.5-.5V0h-.4z"/>
          </svg>
           &nbsp; { this.state.markers[ref].info }
           <br />
          Votes: { Math.floor(Math.random() * (100 - 70)) + 80 }
        </div>

      </InfoWindow>

    );

  }
  /*
   * This is called when you click on the map.
   * Go and try click now.
   */
  handleMapClick(event) {
    // let { markers } = this.state;
    // markers = update(markers, {
    //   $push: [
    //     {
    //       position: event.latLng,
    //       defaultAnimation: 2,
    //       key: Date.now(), // Add a key property for: http://fb.me/react-warning-keys
    //     },
    //   ],
    // });
    console.log("clicked on map!");
    //this.setState({ markers });
  }

  handleMarkerRightclick(index, event) {
    /*
     * All you modify is data, and the view is driven by data.
     * This is so called data-driven-development. (And yes, it's now in
     * web front end and even with google maps API.)
     */
    let { markers } = this.state;
    markers = update(markers, {
      $splice: [
        [index, 1],
      ],
    });
    this.setState({ markers });
  }

  render() {
    return (
      <div>
      <NavBar navLink={"/vote"} navMessage={"Go Vote!"}/>
      <section id="map">
      <GoogleMapLoader
        containerElement={
          <div
            {...this.props.containerElementProps}
            style={{
              height: "100%",
            }}
          />
        }
        googleMapElement={
          <GoogleMap
            ref={(map) => console.log(map)}
            defaultZoom={17}
            defaultCenter={{
              lat : 34.0192691,
              lng : -118.4943443 }}
            onClick={this.handleMapClick.bind(this)}
          >

            {this.state.markers.map((marker, index) => {
              const ref = `${index}`;

              return ( <Marker
                key={index}
                ref={ref}
                position={marker.position}
                onClick={this.handleMarkerClick.bind(this, marker)} >

                {/*
                  Show info window only if the 'showInfo' key of the marker is true.
                  That is, when the Marker pin has been clicked and 'handleMarkerClick' has been
                  Successfully fired.
                */}
                {marker.showInfo ? this.renderInfoWindow(ref, marker) : null}

              </Marker>
              );
            })}

          </GoogleMap>
        }
      />
    </section>
      </div>
    )
  }
}

export default BestOf;
