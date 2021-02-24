import React, { Component } from "react";
import { TouchableOpacity, ScrollView, StyleSheet, Text, View } from 'react-native';
import StarRating from 'react-native-star-rating';
import {
    Card,
    Title,
    IconButton,
    Paragraph,
    Headline,
    Subheading,
    Caption,
    Button,
    Divider,
    Avatar,
    List,
    Provider,
    Portal,
    Modal
} from "react-native-paper";

class Stuffdetail extends Component {
    state = {
        a: 700,
        rated: false,
        rating: 0
    }
    handleclick = (x) => {
        x ? (this.state.a != 700 &&
            this.setState({
                a: this.state.a - 1
            })
        )
            :
            (this.state.a != 705 &&
                this.setState({
                    a: this.state.a + 1
                })
            )
    }
    render() {
        const { stuff } = this.props;
        return (
            <>
                < ScrollView >
                    <Card>
                        <TouchableOpacity onPress={() => this.props.navigation.push('ShowImage', { uri: "https://picsum.photos/" + this.state.a })}>
                            <Card.Cover source={{ uri: "https://picsum.photos/" + this.state.a }} style={styles.images} />
                        </TouchableOpacity>
                        <Card.Title
                            title="Some Photos"
                            subtitle={`PhotoNo ${this.state.a}`}
                            titleStyle={{
                                alignSelf: 'center'
                            }}
                            subtitleStyle={{
                                alignSelf: 'center'
                            }}
                            left={(props) =>
                                <IconButton {...props} size={40} color={this.state.a == 700 ? 'grey' : 'white'} icon="skip-previous-circle"
                                    style={{
                                        top: -60,
                                        left: -20,
                                    }
                                    }
                                    onPress={() => this.handleclick(true)}
                                />}
                            right={(props) =>
                                <IconButton {...props} size={40} color={this.state.a == 705 ? 'grey' : 'white'} icon="skip-next-circle"
                                    style={{
                                        top: -60,
                                        right: -5
                                    }
                                    }
                                    onPress={() => this.handleclick(false)}
                                />}
                        />
                        <Divider />
                        <Card.Content>

                            <View style={styles.a1}>
                                <View style={styles.a2}>
                                    <Title>Price:</Title>
                                    <Caption>Rs5000</Caption>
                                </View>
                            </View>
                            <View style={styles.a1}>
                                <View style={styles.a2}>
                                    <Title>Type:</Title>
                                    <Caption>Single</Caption>
                                </View>
                            </View>
                            <View style={styles.a1}>
                                <View style={styles.a2}>
                                    <Title>Negotiable:</Title>
                                    <Caption>Yes</Caption>
                                </View>
                            </View>
                            <View style={styles.a1}>
                                <View style={styles.a2}>
                                    <Title>Location:</Title>
                                    <Caption>Bashundhara,Kathmandu</Caption>
                                </View>
                            </View>
                            <View style={styles.a1}>
                                {!this.state.rated ?
                                    <View style={styles.a2}>
                                        <Title>Rate:</Title>
                                        <StarRating
                                            disabled={false}
                                            maxStars={5}
                                            rating={this.state.rating}
                                            selectedStar={(rating) => this.setState({
                                                rating: rating,
                                                rated: true
                                            })}
                                        />
                                    </View> :
                                    <View style={styles.a2}>
                                        <Title>Rating:</Title>
                                        <StarRating
                                            disabled={true}
                                            maxStars={5}
                                            rating={this.state.rating}
                                        />
                                    </View>}
                            </View>
                            <List.Accordion title="Description"
                                titleStyle={{
                                    fontSize: 20,
                                    left: -15,
                                    fontWeight: 'bold'
                                }}
                            >
                                <Text style={styles.textfordesc}>
                                    {stuff.description}
                                </Text>

                            </List.Accordion>
                            <View style={styles.a1}>
                                <View style={styles.a2}>
                                    <Button mode='contained'
                                    > Call</Button>
                                </View>
                            </View>
                        </Card.Content>
                    </Card>
                </ScrollView >
            </>
        );
    }
}

export default Stuffdetail;
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    images: {
        marginTop: 1,
        height: 273,
        width: '100%',
    },
    textfordesc: {
        margin: 12,
        fontSize: 16,
    },
    profile: {
        position: 'absolute',
        zIndex: 1,
        right: 0,
        bottom: 0,
        margin: 10,
        backgroundColor: 'transparent',
        borderColor: 'grey',
        borderWidth: 1
    },
    description: {
        margin: 10,
    },
    a1: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-end",
    },
    a2: {
        flexDirection: "row",
        justifyContent: "space-between",
    }
});
