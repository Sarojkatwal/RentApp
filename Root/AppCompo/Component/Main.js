import React, { Component } from "react";
import { createStackNavigator } from '@react-navigation/stack'
import { withData } from '../../context'
import SelImages from './SelImages'
import FillDetails from './FillDetails'
import Details from './Details'
import Editdetails from './EditDetails'
import Mains from './Mains'
import Mmapp from './map'

const Stack1 = createStackNavigator()

class Main extends Component {
    render() {
        const { data } = this.props
        return (
            <Stack1.Navigator screenOptions={{
                headerShown: false,
            }} >
                {(data.gender == '') ?
                    <Stack1.Screen name='Filldetails' component={FillDetails} />
                    :
                    <>
                        <Stack1.Screen name="Mains" component={Mains} />
                        <Stack1.Screen name="SelImages" component={SelImages} />
                        <Stack1.Screen name="Details" component={Details} />
                        <Stack1.Screen name="Editdetails" component={Editdetails} />
                        <Stack1.Screen name="Mmapp" component={Mmapp} />
                    </>
                }
            </Stack1.Navigator>
        )
    }
}
export default withData(Main);

