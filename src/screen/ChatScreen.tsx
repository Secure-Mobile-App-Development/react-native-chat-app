import { View, Text, FlatList } from 'react-native'
import React from 'react'
import Chats from "../../assets/dummy-data/chat-data.json"
import ChatFace from '../components/ChatFace'

export default function ChatScreen() {
  return (
      <FlatList
       data={Chats}
       renderItem={({item}) => <ChatFace data={item} />}
       keyExtractor={ item => item.id}
       style={{width: "100%"}}
      />
  )
}