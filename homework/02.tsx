import * as React from 'react';
import { Button, View, Text, TextInput, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function HomeScreen({ navigation }) {
    const [userName, setUserName] = React.useState('');
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>当前用户名：{userName}</Text>
            <Button
                title="修改用户名"
                onPress={() => {
                    navigation.navigate('UserName', {
                        userName, setUserName
                    });
                }}
            />
        </View>
    );
}

function UserNameScreen({ route, navigation }) {
    /* 2. Get the param */
    const { userName, setUserName } = route.params;
    const [currentUserName, setCurrentUserName] = React.useState(userName);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <TextInput value={currentUserName} onChangeText={setCurrentUserName} placeholder="请输入用户名" />
            <Button
                title="确定"
                onPress={() => {
                    setUserName(currentUserName)
                    navigation.goBack()
                }
                }
            />
        </View>
    );
}

const Stack = createStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home" >
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="UserName" component={UserNameScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
