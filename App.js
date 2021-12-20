import { StatusBar } from 'expo-status-bar';
import {useState} from 'react';
import { Platform, StyleSheet, Text, View, ViewBase, KeyboardAvoidingView, TextInput, TouchableOpacity} from 'react-native';
import Item from './components/Item.js';

export default function App() {

  const [item, setItem] = useState();
  const [itemList, setItemList] =useState([]);
  const [finishedItemList,setFinishedItemList]=useState([]);

  const moveItem=(inHandleliste, index)=>{
    if(inHandleliste){
      let newList=[...itemList];
      let moveItem=newList.splice(index,1);
      setItemList(newList);

      setFinishedItemList([...finishedItemList,moveItem]);
    }
    else{
      let newList=[...finishedItemList];
      let moveItem=newList.splice(index,1);
      setFinishedItemList(newList);

      setItemList([...itemList,moveItem]);
    }
  }

  const handleAddItem=()=>{
    setItemList([...itemList,item]);
    setItem(null);
  };

  const handleRemoveItem=(index)=>{
    let newList=[...itemList];
    newList.splice(index,1);
    setItemList(newList);
  }

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      handleAddItem();
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
      <Text style={styles.title}>Handlelista</Text>
        <View>
          {/* Dette er hvor alle handlelisteitems skal gå */}
          {
            itemList.map((item,index)=>
              <TouchableOpacity key={index} onPress={()=>moveItem(true, index)}>
                <Item text={item}/>
              </TouchableOpacity>
            )
          }

        </View>
      </View>

      <View style={styles.wrapper}>
      <Text style={styles.title}>Ferdig Handlet</Text>
        <View>
          {/* Dette er hvor ting som er handlet skal være */}
          {
            finishedItemList.map((item,index)=>
              <TouchableOpacity key={index} onPress={()=>moveItem(false, index)}>
                <Item text={item}/>
              </TouchableOpacity>
            )
          }

        </View>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS==='ios' ? 'padding' : 'height'}
        style={styles.inputWrapper}
      >
        <TextInput style={styles.input}
          placeholder='Legg til i handlelista' value={item}
          onChangeText={text => setItem (text)}
          onKeyPress={e => handleKeyPress(e)}
          />
        <TouchableOpacity onPress={()=>handleAddItem()}>
          <View style={styles.button}>
            <Text>+</Text>
          </View>
        </TouchableOpacity>
        
      </KeyboardAvoidingView>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  title:{
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 40,
    maxWidth: '80%',
  },

  wrapper:{
    paddingTop: 80,
    paddingHorizontal: 20,
  },

  inputWrapper:{
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,  
  },
  
  input:{
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 60,
    width: 250,
    borderWidth: 1,
    borderColor: 'black',
  },
  button:{
    height: 60,
    width: 60,
    borderRadius: 60,
    borderWidth: 1,
    fontSize:15,
    alignItems: 'center',
    justifyContent: 'center',

  },
});
