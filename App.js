import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function App() {
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [IMC, setIMC] = useState(0);

  const formatDecimal = (value) => {
    const cleaned = value.replace(/[^0-9.,]/g, '');
    const standardized = cleaned.replace(',', '.');
    return standardized;
  };

  const classificateImc = (imc) => {
    if (imc < 18.5) return "Abaixo do peso";
    if (imc < 25) return "Peso normal";
    if (imc < 30) return "Sobrepeso";
    if (imc < 35) return "Obesidade grau I";
    if (imc < 40) return "Obesidade grau II";
    return "Obesidade grau III";
  };

  const handleCalculate = () => {
    if (!weight || !height) {
      Alert.alert('Erro', 'Preencha os campos corretamente.');
      return;
    }

    const calculatedImc = weight / (height * height);
    setIMC(calculatedImc);

    Alert.alert('Cálculo Realizado!', `Seu IMC foi ${calculatedImc.toFixed(1)}. Isso indica ${classificateImc(calculatedImc)}!`)

    setWeight(0);
    setHeight(0);
    setIMC(0);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calculadora de IMC</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Digite o peso (kg)..."
          value={weight}
          onChangeText={(text) => setWeight(formatDecimal(text))}
        />
        <TextInput
          style={styles.input}
          placeholder="Digite a altura (m)..."
          value={height}
          onChangeText={(text) => setHeight(formatDecimal(text))}
        />
        <TouchableOpacity
          style={styles.calculateButton}
          onPress={handleCalculate}
        >
          <Text style={styles.calculateButtonText}>Calcular</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.classificationBox}>
        <Text style={styles.title}>Classificação IMC</Text>

        <View style={styles.classificationRow}>
          <Text style={styles.classificationLabel}>Abaixo de 18,5</Text>
          <Text style={styles.classificationDescription}>Abaixo do peso</Text>
        </View>

        <View style={styles.classificationRow}>
          <Text style={styles.classificationLabel}>18,5 a 24,9</Text>
          <Text style={styles.classificationDescription}>Peso normal</Text>
        </View>

        <View style={styles.classificationRow}>
          <Text style={styles.classificationLabel}>25 a 29,9</Text>
          <Text style={styles.classificationDescription}>Sobrepeso</Text>
        </View>

        <View style={styles.classificationRow}>
          <Text style={styles.classificationLabel}>30 a 34,9</Text>
          <Text style={styles.classificationDescription}>Obesidade grau I</Text>
        </View>

        <View style={styles.classificationRow}>
          <Text style={styles.classificationLabel}>35 a 39,9</Text>
          <Text style={styles.classificationDescription}>Obesidade grau II</Text>
        </View>

        <View style={[styles.classificationRow, styles.lastRow]}>
          <Text style={styles.classificationLabel}>40 ou mais</Text>
          <Text style={styles.classificationDescription}>Obesidade grau III</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: "bold",
    fontSize: 24
  },
  form: {
    width: '100%',
    padding: 24,
  },
  input: {
    height: 50,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 14,
  },
  calculateButton: {
    height: 50,
    backgroundColor: '#015345',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  calculateButtonText: {
    fontSize: 14,
    color: '#fff',
  },
  classificationBox: {
    width: '90%',
    marginTop: 24,
    padding: 16,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  classificationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  classificationLabel: {
    fontWeight: '600',
    fontSize: 14,
    color: '#333',
  },
  classificationDescription: {
    fontSize: 14,
    color: '#666',
  },
  lastRow: {
    borderBottomWidth: 0,
  }
});
