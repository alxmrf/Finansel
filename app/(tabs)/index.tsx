import { Image } from 'expo-image';
import { Button, Modal, Platform, StyleSheet, View } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';

export default function HomeScreen() {

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  return (
  <>    

      <View style={{flex:1, justifyContent:'flex-start', alignItems:'center',marginTop: '30%'}}>
          <Modal animationType="slide" transparent={true} visible={isModalVisible} onRequestClose={() => setIsModalVisible(false)}>
              <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                  <ThemedView>
                      <ThemedText>Hello from the modal!</ThemedText>
                      <Button title='Close' onPress={() => setIsModalVisible(false)}/>
                  </ThemedView>
              </View>
          </Modal>

          <Button title='hello' onPress={() => setIsModalVisible(true)}/>
      </View>

    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
