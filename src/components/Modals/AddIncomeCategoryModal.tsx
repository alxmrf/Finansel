import { useState } from "react";
import BaseModal from "./BaseModal";
import { Button, Switch, Text, TextInput } from "react-native";
import IncomeCategory from "@/src/entity/IncomeCategory";
import incomeCategoryRepository from "@/src/repository/incomeCategoriesRepository";

interface AddIncomeTypeModalProps {
    isVisible: boolean;
    onClose: () => void;
}

export default function AddIncomeCategoryModal({isVisible, onClose}: AddIncomeTypeModalProps) {

  const [name, setName] = useState<string>("");
  const [isInvestable, setIsInvestable] = useState<boolean>(false);

  const incomeCategory:IncomeCategory ={
    id: NaN,
    name,
    isInvestable
  }

  const createIncomeCategory = ()=> {
    incomeCategoryRepository.createIncomeCategory({ ...incomeCategory })
  };

  return (
    <BaseModal isVisible={isVisible} onClose={onClose}>
        <Text>Enter income category</Text>
        <TextInput placeholder="Enter income category" onChangeText={setName} value={name} />
        <Text>Is this category investable?</Text>
        <Switch value={isInvestable} onValueChange={setIsInvestable} />
        <Button title="Add Category" onPress={() => {
          try {
            createIncomeCategory();
            onClose();
            console.log("Income category created successfully");
          } catch (error) {
            console.error("Error creating income category:", error);
          }
        }} />
    </BaseModal>
  );
}
