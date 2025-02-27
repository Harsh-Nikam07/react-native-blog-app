import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import IndexScreen from "./src/screens/IndexScreen";
import ShowBlogScreen from "./src/screens/ShowBlogScreen";
import CreateBlogScreen from "./src/screens/CreateBlogScreen";
import { Provider } from "./src/context/BlogContext";
import EditBlogScreen from "./src/screens/EditBlogScreen";

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Index" component={IndexScreen} options={{title : 'Blogs'}} />
        <Stack.Screen name="ShowBlog" component={ShowBlogScreen} />
        <Stack.Screen name="CreateBlog" component={CreateBlogScreen} />
        <Stack.Screen name='EditBlog' component={EditBlogScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default () => (
  <Provider>
    <App />
  </Provider>
);
