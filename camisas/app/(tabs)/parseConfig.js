import Parse from 'parse/react-native.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

Parse.setAsyncStorage(AsyncStorage);

Parse.initialize("36LZQJzfToHFA0apgxCz7WevaegWZ5T7R3SV4uNl", "m7xTWDAc0BBD1CAh3iCc3EwZ4JypUUme4w5rPQHB");
Parse.serverURL = 'https://parseapi.back4app.com/';

export default Parse;