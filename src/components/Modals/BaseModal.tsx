import Colors from "@/src/styling/Colors";
import { useState } from "react";
import { Modal, View, Text } from "react-native";


interface BaseModalProps {
    isVisible: boolean;
    onClose: () => void;
    children: React.ReactNode;
}


export default function BaseModal({isVisible, onClose, children}: BaseModalProps) {
  return (
    <Modal
      transparent
      animationType="fade"
      visible={isVisible}
      onRequestClose={onClose}
    >
        <View style={{ flex: 1, margin: 50, backgroundColor: Colors.dark.notification, borderRadius: 10, padding: 10  }}>
            <View style={{justifyContent: "center", alignItems: "center", height:100, borderWidth: 1 }}>
                <Text style={{ fontWeight: "bold", fontSize: 18 }}>Modal title</Text>
            </View>

            <View style={{ flex: 1, justifyContent: "flex-start", alignItems: "flex-start" }}>
                {children}
            </View>
        </View>

    </Modal>
  );
}