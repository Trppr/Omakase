import React from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import NavBar from './NavBar';
import VoteSurvey from './VoteSurvey';
import RestaurantResult from './RestaurantResult';
import { Button } from 'react-bootstrap';
import PhotoUpload from './PhotoUpload';

class VoteApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 'voteSurvey',
            navLink: '/',
            navMessage: 'Search for Food',
            foodType: null,
            location: null,
            restaurantQuery: null,
            restaurantResults: null,
            restaurant: null
        };

        this.handleFoodChoice = this.handleFoodChoice.bind(this);
        this.handleLocationChoice = this.handleLocationChoice.bind(this);
        this.handleRestaurantQuery = this.handleRestaurantQuery.bind(this);
        this.handleGoogleSearch = this.handleGoogleSearch.bind(this);
        this.handleRestaurantChoice = this.handleRestaurantChoice.bind(this);
        this.handleVote = this.handleVote.bind(this);
    }

    handleFoodChoice(choice) {
        this.setState({foodType: choice});
        this.setState({error: false});
    }

    handleLocationChoice(choice) {
        this.setState({location: choice});
        this.setState({error: false});
    }

    handleRestaurantQuery(choice) {
        this.setState({restaurantQuery: choice});
        this.setState({error: false});
    }

    handleGoogleSearch() {
        this.setState({page: 'spinner'});
        if (this.state.location && this.state.restaurantQuery) {
            var data = {
                "location": this.state.location.label,
                "restaurant": this.state.restaurantQuery
            }

            axios.post('/api/google/RestaurantSearchBar', data)
            .then((response) => {
                this.setState({restaurantResults: response.data.results});
                this.setState({page: 'confirmRestaurant'});
            })
            .catch((error) => {
                console.log(error);
            });

        } else {
            this.setState({error: true});
        }
    }

    handleRestaurantChoice(result) {
        this.setState({restaurant: result});
    }

    navigateToVoteSurvey() {
        this.setState({foodType: null});
        this.setState({location: null});
        this.setState({restaurantQuery: null});
        this.setState({page: 'voteSurvey'});
    }

    handleVote() {
        var addressComponents = this.state.restaurant.formatted_address.split(',');

        if (this.state.foodType && this.state.location && this.state.restaurant) {
            var data = {
                "Dish" : {
                    "dish_name" : this.state.foodType.label,
                    "voteCount": 1
                },
                "Location" : {
                    "location_name" : this.state.location.label
                },
                "Restaurant": {
                    "restaurant_name": this.state.restaurant.name,
                    "address" : addressComponents[0],
                    "zipcode" : addressComponents[2].slice(-5),
                    "imageUrl": this.state.foodType.value.image
               }
           }

            axios.post('api/dish/add', data)
            .then((response) => {
                this.setState({page: 'userProfile'});
            })
            .catch((error) => {
                console.log(error);
            });

        } else {
            this.setState({error: true});
        }
    }

    render() {
        if (this.state.page === 'voteSurvey') {
            return (
                <div className="container-fluid">
                    <NavBar navLink={this.state.navLink} navMessage={this.state.navMessage}/>
                    <div className="main-container">
                        <div className="vote-survey-content">
                            {this.state.error && <p className="error-message"> Please complete the voting form! </p>}
                            <VoteSurvey
                                handleFoodChoice={this.handleFoodChoice}
                                handleLocationChoice={this.handleLocationChoice}
                                handleRestaurantQuery={this.handleRestaurantQuery}
                                handleGoogleSearch={this.handleGoogleSearch}
                                handleVote={this.handleVote}
                            />
                              {/* <PhotoUpload foodType={this.state.foodType}/>  */}

                        </div>
                    </div>
                </div>
            );
        }
        if (this.state.page === 'spinner') {
            return (
                <div className="container-fluid">
                    <NavBar navLink={this.state.navLink} navMessage={this.state.navMessage}/>
                    <div className="main-container">
                        <div className="main-content">
                            <img className="spinner" src="../spinner.gif"/>
                        </div>
                    </div>
                </div>
            );
        }
        if (this.state.page === 'confirmRestaurant') {
            if (this.state.restaurantResults.length === 0) {
                return (
                    <div className="container-fluid">
                        <NavBar navLink={this.state.navLink} navMessage={this.state.navMessage}/>
                        <div className="main-container">
                            <div className="main-content restaurant-content">
                                <h1> Sorry, we did not find what you were looking for... </h1>
                                <Button bsSize="large" className="main-button" onClick={() => {this.navigateToVoteSurvey()}}> Try Again </Button>
                                <PhotoUpload foodType={this.state.foodType}/>
                            </div>
                        </div>

                    </div>
                );
            } else {
                return (
                    <div className="container-fluid">
                        <NavBar navLink={this.state.navLink} navMessage={this.state.navMessage}/>
                        <div className="main-container">
                            <div className="main-content restaurant-content">
                                <h1> Which restaurant did you mean? </h1>
                                <div className="restaurant-results">
                                    {this.state.restaurantResults.map((result, index) => (
                                        <RestaurantResult key={index} result={result} handleRestaurantChoice={this.handleRestaurantChoice}/>
                                    ))}
                                </div>
                                <div className="photoloader">
                                  <PhotoUpload foodType={this.state.foodType}/>
                                  <Button bsSize="large" className="main-button" onClick={() => {this.handleVote()}}> Vote! </Button>
                                </div>
                            </div>
                        </div>

                    </div>
                );

            }
        }
        if (this.state.page === 'userProfile') {
            return (
                <div className="container-fluid">
                    <NavBar navLink={this.state.navLink} navMessage={this.state.navMessage}/>
                    <div className="main-container">
                        <div className="main-content">
                            <h1 className="vote-confirm"> You voted that {this.state.restaurant.name} has the best {this.state.foodType.label.toLowerCase()} in {this.state.location.label}! </h1>
                            <Button bsSize="large" className="main-button" onClick={() => {this.navigateToVoteSurvey()}}> Vote For More </Button>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default VoteApp;
