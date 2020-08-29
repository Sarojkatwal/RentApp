import React from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import { Portal } from "react-native-paper";
import MyComponent from "./component/snackbar";
import SBar from "./component/sBar";
import Radio from "./component/radio";
import Dadrame from "./component/dadrame";
import Floatingabutton from "./component/floatingabutton";
import Chekbox from "./component/chekbox";
import Lista from "./component/lista";
import Datatable from "./component/datatable";
import Dialogue from "./component/dialogue";
import N1 from "./component/Networking/N1";
import Firebas from "./component/Networking/firebas";

export default class App extends React.Component {
  render() {
    return (
      <>
        <StatusBar translucent={false} />
        <Firebas />
      </>
    );
  }
}
