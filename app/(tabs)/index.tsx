import { Button, StyleSheet, Text, View } from 'react-native';

import AddIncomeCategoryModal from '@/src/components/Modals/AddIncomeCategoryModal';
import IncomeCategory from '@/src/entity/IncomeCategory';
import incomeCategoryRepository from '@/src/repository/incomeCategoriesRepository';
import { useEffect, useState } from 'react';

export default function HomeScreen() {

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const [incomeCategory, setIncomeCategory] = useState<IncomeCategory>();
  const [incomeCategories, setIncomeCategories] = useState<IncomeCategory[]>([]);

  useEffect(() => {
    const fetchIncomeCategories = async () => {
      const categories = await incomeCategoryRepository.findAllIncomeCategories();
      setIncomeCategories(categories);
    };
    fetchIncomeCategories();
  }, []);

  return (
  <>    

      <View style={{flex:1, justifyContent:'flex-start', alignItems:'center',marginTop: '30%'}}>
          <AddIncomeCategoryModal isVisible={isModalVisible} onClose={() => setIsModalVisible(false)}/>
          {incomeCategories.map((category) => (
            <Text key={category.id}>{category.name}, {category.isInvestable ? "Investable" : "Not Investable"}</Text>
          ))}
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
