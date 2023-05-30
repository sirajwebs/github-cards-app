import axios from "axios";
import React from "react";
import "./App.css";

const testData = [
  {
    name: "Mukesh Ambani",
    id: "1",
    avatar_url: "https://avatars0.githubusercontent.com/u/8438?v=4",
    company: "Reliance",
    location: "Mumbai, India",
  },
  {
    name: "John Alpert",
    id: "2",
    avatar_url: "https://avatars2.githubusercontent.com/u/618224?v=4",
    company: "Google",
    location: "Texas, USA",
  },
  {
    name: "Tony Stark",
    id: "3",
    avatar_url: "https://avatars2.githubusercontent.com/u/6167?v=4",
    company: "Stark Industries",
    location: "New York, USA",
  },
];

const CardList = (props) => (
  <div>
    {props.profiles.map((profile) => (
      <Cards {...profile} key={profile.id | Math.random()} />
    ))}
  </div>
);

class Cards extends React.Component {
  render() {
    const profile = this.props;

    return (
      <div className="github-profile">
        <img src={profile.avatar_url} alt="profile-pic" style={{ width: "75px" }} />
        <div className="info">
          <div className="name">{profile.name}</div>
          <div className="company">@{profile.company}</div>
          <div className="location">{profile.location}</div>
        </div>
      </div>
    );
  }
}

class Form extends React.Component {
  state = {
    userInput: "",
  };
  handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios
      .get(`https://api.github.com/users/${this.state.userInput}`)
      .then((response) => {
        return response.data;
      })
      .catch(() => {
        return {};
      });
    this.props.onSubmitForm(response);
    this.setState({ userInput: "" });
  };

  handleChange = (event) => this.setState({ userInput: event.target.value });

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="add-form">
        <input type="text" placeholder="enter username" value={this.state.userInput} onChange={this.handleChange} required />
        <button>Add card</button>
      </form>
    );
  }
}

class App extends React.Component {
  state = {
    profiles: testData,
  };

  addNewUser = (data) => {
    if (data.length) {
      this.setState((prevState) => ({
        profiles: [...prevState.profiles, data],
      }));
    }
  };

  render() {
    return (
      <div className="app">
        <header className="app-header">GitHub Cards App</header>
        <Form onSubmitForm={this.addNewUser} />
        <CardList profiles={this.state.profiles} />
      </div>
    );
  }
}

export default App;
