import React, { Component } from "react";
import "./App.css";
import Messages from "./Components/Messages";
import Input from "./Components/Input";

class App extends Component {
  state = {
    messages: [],
    member: {
      username: randomName(),
      color: randomColor(),
    },
  };

  constructor() {
    super();
    this.drone = new window.Scaledrone("0SxSGOIK0AKPXDSB", {
      data: this.state.member,
    });
    this.drone.on("open", (error) => {
      if (error) {
        return console.error(error);
      }

      const member = { ...this.state.member };
      member.id = this.drone.clientId;
      this.setState({ member });
    });
    const room = this.drone.subscribe("observable-room");
    room.on("data", (data, member) => {
      const messages = this.state.messages;
      messages.push({ member, text: data });
      this.setState({ messages });
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>Maksimova chat aplikacija</h1>
        </div>
        <Messages
          messages={this.state.messages}
          currentMember={this.state.member}
        />
        <Input onSendMessage={this.onSendMessage} />
      </div>
    );
  }

  onSendMessage = (message) => {
    this.drone.publish({
      room: "observable-room",
      message,
    });
  };
}

function randomName() {
  const adjectives = [
    "Autumn",
    "Hidden",
    "Bitter",
    "Misty",
    "Silent",
    "Empty",
    "Dry",
    "Dark",
    "Summer",
    "Icy",
    "Delicate",
    "Quiet",
    "White",
    "Cool",
    "Spring",
    "Winter",
    "Patient",
    "Twilight",
    "Dawn",
    "Crimson",
    "Wispy",
    "Weathered",
    "Blue",
    "Billowing",
    "Broken",
    "Cold",
    "Damp",
    "Falling",
    "Frosty",
    "Green",
    "Long",
    "Late",
    "Lingering",
    "Bold",
    "Little",
    "Morning",
    "Muddy",
    "Old",
    "Red",
    "Rough",
    "Still",
    "Small",
    "Sparkling",
    "Throbbing",
    "Shy",
    "Wandering",
    "Withered",
    "Wild",
    "Black",
    "Young",
    "Holy",
    "Solitary",
    "Fragrant",
    "Aged",
    "Snowy",
    "Proud",
    "Floral",
    "Restless",
    "Divine",
    "Polished",
    "Ancient",
    "Purple",
    "Lively",
    "Nameless",
  ];
  const nouns = [
    "Waterfall",
    "River",
    "Breeze",
    "Moon",
    "Rain",
    "Wind",
    "Sea",
    "Morning",
    "Snow",
    "Lake",
    "Sunset",
    "Pine",
    "Shadow",
    "Leaf",
    "Dawn",
    "Glitter",
    "Forest",
    "Hill",
    "Cloud",
    "Meadow",
    "Sun",
    "Glade",
    "Bird",
    "Brook",
    "Butterfly",
    "Bush",
    "Dew",
    "Dust",
    "Field",
    "Fire",
    "Flower",
    "Firefly",
    "Feather",
    "Grass",
    "Haze",
    "Mountain",
    "Night",
    "Pond",
    "Darkness",
    "Snowflake",
    "Silence",
    "Sound",
    "Sky",
    "Shape",
    "Surf",
    "Thunder",
    "Violet",
    "Water",
    "Wildflower",
    "Wave",
    "Water",
    "Resonance",
    "Sun",
    "Wood",
    "Dream",
    "Cherry",
    "Tree",
    "Fog",
    "Frost",
    "Voice",
    "Paper",
    "Frog",
    "Smoke",
    "Star",
  ];
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  return adjective + noun;
}

function randomColor() {
  return "#" + Math.floor(Math.random() * 0xffffff).toString(16);
}

export default App;
