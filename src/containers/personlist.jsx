/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import {
    Card, Col, Row, Button, Form, FormGroup, Input, Label, Collapse
} from 'reactstrap';

import ReactLoading from "react-loading";

import NavbarSW from '../Layout/Navbar'

export default class PersonList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rawdata:[],
            persons: [],
            personname: "",
            personid: "",
            homeplanetcollapse: [],
            speciescollapse: [],
            filmscollapse: [],
            isloading: true
        }
        this.handleOnNameclick = this.handleOnNameclick.bind(this);
        this.handleOnIdclick = this.handleOnIdclick.bind(this);
        this.reset = this.reset.bind(this);
    }
    homePlanetToggle = (e) => {
        let num = parseInt(e.target.id);
        this.setState(prevState => {
            const homeplanetcollapse = prevState.homeplanetcollapse.map((item, i) => {
                if (i === num) {
                    return !item;
                } else {
                    return item;
                }
            });
            return {
                homeplanetcollapse,
            };
        });
    }

    speciesToggle = (e) => {
        let num = parseInt(e.target.id);
        this.setState(prevState => {
            const speciescollapse = prevState.speciescollapse.map((item, i) => {
                if (i === num) {
                    return !item;
                } else {
                    return item;
                }
            });
            return {
                speciescollapse,
            };
        });
    }

    filmsToggle = (e) => {
        let num = parseInt(e.target.id);
        this.setState(prevState => {
            const filmscollapse = prevState.filmscollapse.map((item, i) => {
                if (i === num) {
                    return !item;
                } else {
                    return item;
                }
            });
            return {
                filmscollapse,
            };
        });
    }


    async componentDidMount() {
        const response = await fetch('http://localhost:9000/api/people');
        const json = await response.json();
        let collapseNum = [];
        json.forEach((element,i) =>{
            element.id = i;
            collapseNum.push(false);
          });
        this.setState({ rawdata: json, persons: json, isloading:false, homeplanetcollapse: collapseNum, speciescollapse: collapseNum, filmscollapse: collapseNum });
    }

    handleChange = (stateName, e) => {
        this.setState({ [stateName]: e.target.value });
    }

    // handleOnNameclick = async () => {
    //     this.setState({isloading:true});
    //     const response = await fetch(`http://localhost:9000/api/people/${this.state.personname}`);
    //     const json = await response.json();
    //     let collapseNum = [];
    //     json.forEach((element,i) =>{
    //         element.id = i;
    //         collapseNum.push(false);
    //       });
    //     this.setState({ persons: json, isloading:false, homeplanetcollapse: collapseNum, speciescollapse: collapseNum, filmscollapse: collapseNum });
    // }

    handleOnNameclick = async () => {
        this.setState({isloading:true});
        let collapseNum = [];
        var person = this.state.rawdata.filter(elem => elem.name.toLowerCase().includes(this.state.personname.toLowerCase()));
          person.forEach((element,i) =>{
            element.id = i;
            collapseNum.push(false);
          });
        this.setState({ persons: person, isloading:false, homeplanetcollapse: collapseNum, speciescollapse: collapseNum, filmscollapse: collapseNum });
    }

    handleOnIdclick = () => {
        this.setState({isloading:true});
        let person =[]; let collapseNum = [];
        var p = this.state.rawdata.find((element)=> {
            return element.id ==this.state.personid;
          });
          person.push(p);
          person.forEach((element,i) =>{
            element.id = i;
            collapseNum.push(false);
          });
        this.setState({ persons: person, isloading:false, homeplanetcollapse: collapseNum, speciescollapse: collapseNum, filmscollapse: collapseNum });
    }

    reset = () =>{
        let data = this.state.rawdata;
        this.setState({persons:data})
    }

    render() {
        const persons = this.state.persons;
        return (
            <div>
                <NavbarSW />
                <div className="content">
                    <Form>
                        <FormGroup row>
                            <Label for="Character" sm={2}>Search for a character...</Label>
                            <Col sm={3}>
                                <Input
                                    type="text"
                                    name="name"
                                    onChange={this.handleChange.bind(this, 'personname')}
                                    value={this.state.personname}
                                    placeholder="Lookup by name" />
                            </Col>
                            <Button onClick={this.handleOnNameclick}>Get Characters</Button>
                            <Col sm={3}>
                                <Input
                                    type="text"
                                    name="name"
                                    onChange={this.handleChange.bind(this, 'personid')}
                                    value={this.state.personid}
                                    placeholder="Lookup by ID" />
                            </Col>
                            <Button onClick={this.handleOnIdclick}>Get Character</Button> &nbsp;
                            <Button onClick={this.reset}>Reset All</Button>
                        </FormGroup>
                    </Form>
                    {
                        this.state.isloading ? <div className="loading"><ReactLoading type="balls" /> </div>:
                            <div className="person-items__wrap">
                                <div className="person-items">
                                    {persons.map((person, i) => (
                                        <div className="person-item" key={i}>
                                            <Card style={{ textAlign: "center" }}>
                                                <h1 className="person-item__title">
                                                    {person.name}
                                                </h1>
                                                <div>
                                                    <Row className="person-item__title">
                                                        <Col sm={6} xl={6} style={{ color: "#0088ff" }}><h4>Height: </h4></Col><Col sm={6} xl={6} style={{ color: "#474342" }}>{person.height}</Col>
                                                    </Row>
                                                    <Row className="person-item__title">
                                                        <Col sm={6} xl={6} style={{ color: "#0088ff" }}><h4>Mass: </h4></Col><Col sm={6} xl={6} style={{ color: "#474342" }}>{person.mass}</Col>
                                                    </Row>
                                                    <Row className="person-item__title">
                                                        <Col sm={6} xl={6} style={{ color: "#0088ff" }}><h4>Hair color: </h4></Col><Col sm={6} xl={6} style={{ color: "#474342" }}>{person.hair_color}</Col>
                                                    </Row>
                                                    <Row className="person-item__title">
                                                        <Col sm={6} xl={6} style={{ color: "#0088ff" }}><h4>Skin color: </h4></Col><Col sm={6} xl={6} style={{ color: "#474342" }}>{person.skin_color}</Col>
                                                    </Row>
                                                    <Row className="person-item__title">
                                                        <Col sm={6} xl={6} style={{ color: "#0088ff" }}><h4>Gender: </h4></Col><Col sm={6} xl={6} style={{ color: "#474342" }}>{person.gender}</Col>
                                                    </Row>
                                                    <Row className="person-item__title">
                                                        <Col sm={6} xl={6} style={{ color: "#0088ff" }}><h4>Birth year: </h4></Col><Col sm={6} xl={6} style={{ color: "#474342" }}>{person.birth_year}</Col>
                                                    </Row>
                                                </div>
                                                <Button outline id={i} color="primary" onClick={this.homePlanetToggle} style={{ marginBottom: '1rem' }}>Home Planet{' '}<b>&#8964;</b></Button>
                                                <Collapse isOpen={this.state.homeplanetcollapse[i]}>
                                                    <div>
                                                        <Row className="person-item__title">
                                                            <Col sm={4} xl={4} style={{ color: "#0088ff" }}><h4>Title </h4></Col>
                                                            <Col sm={4} xl={4} style={{ color: "#0088ff" }}>Terrian</Col>
                                                            <Col sm={4} xl={4} style={{ color: "#0088ff" }}>Population</Col>
                                                        </Row>
                                                        <Row className="person-item__title">
                                                            <Col sm={4} xl={4} style={{ color: "#474342" }}>{person.homeworld.Title} </Col>
                                                            <Col sm={4} xl={4} style={{ color: "#474342" }}>{person.homeworld.terrain} </Col>
                                                            <Col sm={4} xl={4} style={{ color: "#474342" }}>{person.homeworld.population} </Col>
                                                        </Row>
                                                    </div>
                                                </Collapse>
                                                <Button outline id={i} color="primary" onClick={this.speciesToggle} style={{ marginBottom: '1rem' }}>Species{' '}<b>&#8964;</b></Button>
                                                <Collapse isOpen={this.state.speciescollapse[i]}>
                                                    <div>
                                                        <Row className="person-item__title">
                                                            <Col sm={3} xl={3} style={{ color: "#0088ff" }}><h4>Name </h4></Col>
                                                            <Col sm={3} xl={3} style={{ color: "#0088ff" }}>Avg Lifespan</Col>
                                                            <Col sm={3} xl={3} style={{ color: "#0088ff" }}>Classification</Col>
                                                            <Col sm={3} xl={3} style={{ color: "#0088ff" }}>Language</Col>
                                                        </Row>
                                                        {
                                                            person.species.map(species => {
                                                                return <Row className="person-item__title">
                                                                    <Col sm={3} xl={3} style={{ color: "#474342" }}>{species.name} </Col>
                                                                    <Col sm={3} xl={3} style={{ color: "#474342" }}>{species.average_lifespan}  </Col>
                                                                    <Col sm={3} xl={3} style={{ color: "#474342" }}>{species.classification} </Col>
                                                                    <Col sm={3} xl={3} style={{ color: "#474342" }}>{species.language} </Col>
                                                                </Row>
                                                            })
                                                        }
                                                    </div>
                                                </Collapse>
                                                <Button outline id={i} color="primary" onClick={this.filmsToggle} style={{ marginBottom: '1rem' }}>Films{' '}<b>&#8964;</b></Button>
                                                <Collapse isOpen={this.state.filmscollapse[i]}>
                                                    <div>
                                                        <Row className="person-item__title">
                                                            <Col sm={3} xl={3} style={{ color: "#0088ff" }}><h4>Title </h4></Col>
                                                            <Col sm={3} xl={3} style={{ color: "#0088ff" }}>Director</Col>
                                                            <Col sm={3} xl={3} style={{ color: "#0088ff" }}>Producer</Col>
                                                            <Col sm={3} xl={3} style={{ color: "#0088ff" }}>Release Date</Col>
                                                        </Row>
                                                        {
                                                            person.films.map(films => {
                                                                return <Row className="person-item__title">
                                                                    <Col sm={3} xl={3} style={{ color: "#474342" }}>{films.title} </Col>
                                                                    <Col sm={3} xl={3} style={{ color: "#474342" }}>{films.director}  </Col>
                                                                    <Col sm={3} xl={3} style={{ color: "#474342" }}>{films.producer} </Col>
                                                                    <Col sm={3} xl={3} style={{ color: "#474342" }}>{films.release_date} </Col>
                                                                </Row>
                                                            })
                                                        }
                                                    </div>
                                                </Collapse>
                                            </Card>
                                        </div>
                                    ))}
                                </div>
                            </div>
                    }
                </div>
            </div>
        );
    }
}
